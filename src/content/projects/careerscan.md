---
title: CareerScan
slug: careerscan
description: A simple web app to help you find your next job without overwhelming by advertisements.
publishDate: 'March 12, 2023'
tags:
  - jobs
---

Give it a try at [https://careerscan.io](https://careerscan.io).

When I was about to graduate my PhD program in 2023 and started looking for jobs,
I was overly distracted and disappointed by the job search functionality of LinkedIn and other job boards.
They were filled with advertisements and irrelevant job postings.
For example, I was searching for the term "bioinformatics" and the search results many times didn't even include the word "bioinformatics" in the job description.

I decided to build my own job search engine that shows exactly what I want.
I called it CareerScan.
I used ElasticSearch to index job postings from LinkedIn so I can search using complex queries, such as:
"bioinformatics" AND "python" AND NOT "intern".

Many job postings these days are also "fake" or "spam" jobs, which are just there to collect resumes.
I don't delete old jobs so you can see the history of job postings of the companies and judge for yourself if they are real or not.

Tech stack: 
- Frontend: React, TypeScript
- Backend: Node.js, Meteor.js, MongoDB
- Search: ElasticSearch
- Deployment: Docker, Nginx, VPS

Update (May 23, 2025): The website currently has 30 million job postings indexed (English only).
The job postings are stored as OpenSchema.
Feel free to contact me if you want to get the data.
