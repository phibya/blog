---
title: More than 40% of job postings on LinkedIn are fake
slug: 40-percent-of-job-postings-on-linkedin-are-fake
excerpt: A quick analysis of job postings on LinkedIn to determine the percentage of fake job postings.
publishDate: 'May 24, 2025'
tags:
- SQL
- dplyr
- pandas
- linkedin
- polars
- jobs
---

I collected more than 34 million job postings from LinkedIn, assuming that the chance that I collect a real job posting and a fake job posting is the same. I defined a posting as fake if the company keeps posting the same job over and over again.

See the figure below for the distribution of job postings weekly from May 2024 to May 2025.

![fake-jobs.png](/fake-jobs.png)

The code for the analysis is available here: https://github.com/phibya/job-postings.
Data used in this analysis is available upon request.