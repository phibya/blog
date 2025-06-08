---
title: Build job alert system using LLM 
slug: llm-job-matching-system
excerpt: Build a job alert system using LLM to match job postings with resumes
publishDate: 'June 8, 2025'
tags:
- llm
- jobs
- python
- alert
- job-matching
- job-alert
- job-search
---

Job alerts suck. You search for "Data Scientist" and get 200 notifications about junior positions and random jobs that mention your keywords once.

I've been scraping LinkedIn jobs for 2 years and collecting 40 million postings. 
I've built a job search engine here: [CareerScan](https://careerscan.io), 
and I've wanted to build a job alert system for a while now.
However, maintaining a job alert system that sends you emails or notifications is resource-intensive, and I don't have the resources to do it.

Here, I built an AI script that actually reads your resume and matches it with jobs that make sense.
It runs locally, so your resume stays private and secure.

## How It Works

Have your PDF resume ready and the AI will extract your skills (including soft skills - if you taught classes, it knows you can communicate). Then for each new job posting, it creates a profile of the ideal candidate and compares it to you.

Instead of keyword matching, it understands relationships. It knows React implies JavaScript. It knows team leadership relates to project management, etc.

## What You Get

Instead of 200 terrible alerts, you get 5-10 actually relevant ones with match scores:

- ✅ 87% match: Senior Python Developer (this actually fits your background)
- ✅ 82% match: Full Stack Engineer (great skill overlap)  
- ❌ 65% match: Software Engineer (below your threshold, filtered out)

## Try It Now

The whole thing is open source: https://github.com/phibya/jobs-alert

Download it, point it at your resume, set your notification preferences, and start getting better job matches.

Finally, job alerts that don't waste your time.
