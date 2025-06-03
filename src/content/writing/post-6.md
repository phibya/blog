---
title: Recovering MongoDB data when WiredTiger.wt is corrupted
slug: mongodb-data-recovery-when-wiredtiger-wt-is-corrupted
excerpt: How to recover MongoDB data when the WiredTiger.wt file is corrupted
publishDate: 'June 6, 2025'
tags:
- mongodb
- data-recovery
---

Recently, one of my collaborators/clients had a corrupted MongoDB database caused by a power outage.
Well, they have a backup, but it is from a few months ago, and their data scientists had been adding a lot of new data since then.
It's very unfortunate because they were waiting for all the analyses to finish before backing up the database.

## The problem

It is not surprising that they could not recover the database using materials and documents from the internet.
Most of the solutions are for recovering data when the collections are corrupted, not the WiredTiger.wt file.
Essentially, the WiredTiger.wt file stores metadata, indexes, checkpoints, and other information about the database.
If this file is corrupted, you basically lose the information about the database, but not the data itself.

You might attem to use the `mongod --repair` command, but it does not work when the WiredTiger.wt file is corrupted.
That was also the first thing that they and I tried.

## The solution

Your database folder is normally `/data/db`, the folder should have the following files:

```
collection-*.wt
index-*.wt
diagnostic.data
WiredTiger
WiredTiger.wt
WiredTiger.lock
mongod.lock
journal
...
```
In this folder `collection-*.wt` and `index-*.wt` files contain the actual data and indexes of your collections.
Whenever you create a new database or collection, MongoDB creates the same structure as above.

Here what we are going to do is to create a new database and copy the `collection-*.wt` files from the corrupted database to the new database and use `mongod --repair` to recover the data.

1. Create a new database folder
```
mkdir /data/db_new
```

2. Run a new mongo instance with the new database folder
```
mongod --dbpath /data/db_new
```

3. List all the collections in the new database
```
ls /data/db | grep 'collection'
```

You will have output like this:
```
collection-0--7112067150623491981.wt
collection-101--7112067150623491981.wt
collection-103--7112067150623491981.wt
collection-105--7112067150623491981.wt
collection-107--7112067150623491981.wt
...
```
These are the collection files we need to copy to the new database folder, but we need to change their name.

3. Create new collections in the new database

```{JavaScript}
use db_new
db.createCollection("recovery_1")
db.createCollection("recovery_2")
db.createCollection("recovery_3")
db.createCollection("recovery_4")
db.createCollection("recovery_5")
...
```
We will create as many collections as we have `collection-*.wt` files in the corrupted database.
You can also use a for loop to create the collections in a script.

```{JavaScript}
use db_new
number_of_collection = 5
for (let i = 1; i <= number_of_collection; i++) {
    db.createCollection(`recovery_${i}`);
}
```

4. Now we need to figure out which `collection-*.wt` file corresponds to which collection we just created.

```{JavaScript}
files = []
for (let i = 1; i <= number_of_collection; i++) {
    let stats = db.getCollection(`recovery_${i}`).stats();
    files.push(stats.wiredTiger.uri.split(':').slice(-1)[0]);
}
files.forEach(f => print(f))
```

The output will be something like this:
```
collection-7--7112067150623491981
collection-71--7112067150623491981
collection-73--7112067150623491981
collection-75--7112067150623491981
collection-77--7112067150623491981
...
```
5. Now we can copy the `collection-*.wt` files from the corrupted database to the new database folder and rename them to match the collections we just created.

Important: Make sure to stop the MongoDB instance before copying the files.

```bash
cp /data/db/collection-0--7112067150623491981.wt   /data/db_new/collection-7--7112067150623491981.wt
cp /data/db/collection-101--7112067150623491981.wt /data/db_new/collection-71--7112067150623491981.wt
cp /data/db/collection-103--7112067150623491981.wt /data/db_new/collection-73--7112067150623491981.wt
cp /data/db/collection-105--7112067150623491981.wt /data/db_new/collection-75--7112067150623491981.wt
cp /data/db/collection-107--7112067150623491981.wt /data/db_new/collection-77--7112067150623491981.wt
...
```

6. Now we can run the `mongod --repair` command on the new database folder to recover the data.

```bash
mongod --dbpath /data/db_new --repair
```

This command will repair the new database folder and recover the data from the `collection-*.wt` files we copied.

7. After the repair is done, you can start the MongoDB instance with the new database folder and we can inspect the data.

```bash
mongod --dbpath /data/db_new
```
You can now connect to the new database and check the collections.

```{JavaScript}
use db_new

number_of_collection = 5
cols = []

for (let i = 1; i <= number_of_collection; i++) {
    let first = db.getCollection(`recovery_${i}`).findOne() || {};
    let count = db.getCollection(`recovery_${i}`).count();
    cols.push({
        collection: `recovery_${i}`,
        count: Number(count),
        fields: Object.keys(first)
    });
}
printjson(x);
```

This will give you an array of objects with the collection name, count of documents, and keys fields the first document of each collection. Now you can manually check the fields in each collection to match them with the original collections in the corrupted database.

8. Rename the collections in the new database to match the original collections in the corrupted database.

```{JavaScript}
db.getCollection("recovery_1").renameCollection("original_collection_1");
db.getCollection("recovery_2").renameCollection("original_collection_2");
...
```

9. Add indexes to the collections if needed.

You will still need to manually add the indexes to the collections after changing the collection names.

## Final words

Using this method, I was able to recover 70GB+ of data from the corrupted MongoDB database.
While I understand that this is not a perfect solution, it still saves a lot of time for many scientists to redo their analyses.
Unfortunately, while backing up your data regularly is always important but sometimes it is not always possible, especially in academic research where many labs have limited resources and funding.


