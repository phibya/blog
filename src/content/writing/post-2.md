---
title: Methods to get unique values from arrays in JavaScript and their performance
slug: methods-to-get-unique-values-from-arrays-in-javascript-and-their-performance
excerpt: A quick overview of methods to get unique values from arrays in JavaScript, including performance comparisons.
publishDate: 'Oct 2, 2021'
tags:
  - javascript
  - performance
---

I saw many posts about this topic so I thought I would share my own solution.

Without further intro, let's just dive into the solutions: use `Array.prototype.reduce` AND (`Set` for primitive values OR `Map` for objects).

Here are the code:
For an array of primitive values
```javascript
const uniqueArray = (array) => {
    return Array.from(
        array.reduce((set, e) => set.add(e), new Set())
    )
}

console.log(uniqueArray([1,2,2,3,3,3])) // [1, 2, 3]

//OR simply
const uniqueArray = (array) => Array.from(new Set(array))
```


For an array of objects 
```javascript
const uniqueArray = (objects, uniqueBy, keepFirst = true) => {
    return Array.from(
        objects.reduce((map, e) => {
            let key = uniqueBy.map(key => [e[key], typeof e[key]]).flat().join('-')
            if (keepFirst && map.has(key)) return map
            return map.set(key, e)
        }, new Map()).values()
    )
}

let array = [
    {a: 1, b: 2, c: 1},
    {a: 1, b: 2, c: 2},
    {a: 1, b: 3, c: 3}
]

console.log(uniqueArray(array, ["a"], true)) // [ { a: 1, b: 2, c: 1 } ]
console.log(uniqueArray(array, ["a"], false)) // [ { a: 1, b: 3, c: 3 } ]
console.log(uniqueArray(array, ["a", "b"], true)) // [ { a: 1, b: 2, c: 1 }, { a: 1, b: 3, c: 3 } ]
console.log(uniqueArray(array, ["a", "b"], false)) // [ { a: 1, b: 2, c: 2 }, { a: 1, b: 3, c: 3 } ]
```

The reason we need to use `Set` and `Map` is because of the performance. You may have come across many implementations of getting unique values from an array in Javascript. Many of them will look like this:

- Create a new array, check if the element is not in the new array then push it to the new array, or
```javascript
let array = [1,2,2,3,3,3]
let uniqueArray = []

array.forEach(e => {
   if (!uniqueArray.includes(e)) uniqueArray.push(e)
})

console.log(uniqueArray) // [1, 2, 3]
```
- Use filter, check if the element appear the first time in the array then keep it, or
```javascript
let array = [1,2,2,3,3,3]
let uniqueArray = array.filter((e, index) => array.indexOf(e) === index)

console.log(uniqueArray) // [1, 2, 3]
```

- Use reduce, check if the element is not in the new array then use array destruction with the new element
```javascript
let array = [1,2,2,3,3,3]
let uniqueArray = array.reduce((newArray, e) => {
    if (newArray.includes(e)) return newArray;
    return [...newArray, e]
}, [])

console.log(uniqueArray) // [1, 2, 3]
```

The problem is: they are slow. Let's do a quick benchmark. The benchmark below creates 5 arrays with 100,000 elements each. The first array contains all unique elements. The second array has each element appears 2 times. The third array has each element appears 3 times, and so on. All arrays are shuffled before getting unique values. We will use different methods to get the unique values in the array.

```javascript
const usePush = (array) => {
    let uniqueArray = []
    array.forEach(e => {
        if (!uniqueArray.includes(e)){
            uniqueArray.push(e)
        }
    })
    return uniqueArray
}

const useFilter = (array) => {
    return array.filter((e, index) => array.indexOf(e) === index)
}

const useReduceDestruct = (array) => {
    return array.reduce((pre, cur) => {
        if (pre.includes(cur)) return pre;
        return [...pre, cur]
    }, [])
}

const useReduceSet = (array) => {
    return Array.from(
        array.reduce((set, e) => set.add(e), new Set())
    )
}

//Create 5 big arrays with different number of duplicates for each element
let bigArrays = [1,2,3,4,5].map(duplicates => {
    //duplicates = 1 means the array is unique
    //duplicates = 2 means each element appears 2 times, and so on
    return new Array(100000).fill(0)
        .map((_, i) => ({
            rand : Math.random(),
            value : i - i % duplicates
        }))
        .sort((a,b) => a.rand - b.rand)//the array is random shuffled
        .map(e => e.value)
})

bigArrays.forEach((array, index) =>{
    console.log(`${index + 1} duplicate(s):`);

    [usePush, useFilter, useReduceDestruct, useReduceSet].forEach(fn =>{
        let startTime = Date.now()
        fn(array)
        console.log(`${fn.name}${' '.repeat(20 - fn.name.length)} finished in ${((Date.now() - startTime)/1000).toFixed(3)} seconds`)
    })
})
```
Output: 
```
1 duplicate(s):
usePush              finished in 5.395 seconds
useFilter            finished in 5.365 seconds
useReduceDestruct    finished in 72.743 seconds
useReduceSet         finished in 0.013 seconds

2 duplicate(s):
usePush              finished in 2.694 seconds
useFilter            finished in 3.555 seconds
useReduceDestruct    finished in 19.220 seconds
useReduceSet         finished in 0.008 seconds

3 duplicate(s):
usePush              finished in 1.818 seconds
useFilter            finished in 2.678 seconds
useReduceDestruct    finished in 8.659 seconds
useReduceSet         finished in 0.008 seconds

4 duplicate(s):
usePush              finished in 1.339 seconds
useFilter            finished in 2.155 seconds
useReduceDestruct    finished in 4.933 seconds
useReduceSet         finished in 0.006 seconds

5 duplicate(s):
usePush              finished in 1.123 seconds
useFilter            finished in 1.787 seconds
useReduceDestruct    finished in 2.970 seconds
useReduceSet         finished in 0.009 seconds

```
It is clear that the more duplication we have in the array, the faster the code runs. It is also obvious that using `Array.prototype.reduce` and `Set` is the fastest among all.

Bonus: Getting unique values from an array of objects using multiple-level object keys (nested properties):

```javascript
const uniqueArray = (objects, uniqueBy, keepFirst = true) => {

    const orderedObject = (value) => {
        if (typeof value !== "object") return value;
        return Object.keys(value).sort().reduce((pre, key) => {
            pre[key] = orderedObject(value[key])
            return pre
        }, {})
    }

    return Array.from(
        objects.reduce((map, e) => {
            let key = uniqueBy.map(prop => {
                let value = prop.split(".").reduce((object, cur) => object?.[cur], e)
                return [JSON.stringify(orderedObject(value)), typeof value]
            }).flat().join('-')

            if (keepFirst && map.has(key)) return map
            return map.set(key, e)
        }, new Map()).values()
    )
}

let array = [
    {a: [{x: 1},       1], b: 2},
    {a: [{x: 1},       1], b: 2},
    {a: [{x: 1, y: 2}, 2], b: 2}
]

console.log(
    JSON.stringify(uniqueArray(array, ["a.0", "b"])) //Unique by `object["a"][0]` and `object["b"]`
) // [{"a":[{"x":1},1],"b":2},{"a":[{"x":1,"y":2},2],"b":2}]

console.log(
    JSON.stringify(uniqueArray(array, ["a.0.x", "b"])) //Unique by `object["a"][0]["x"]` and `object["b"]`
) // [{"a":[{"x":1},1],"b":2}]
```