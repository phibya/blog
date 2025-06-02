---
title: R Packages
slug: r-packages
description: R packages I have developed for various purposes.
publishDate: 'June 12, 2025'
tags:
  - r
  - packages
---

Here are some R packages I have developed and maintained:

- PINSPlus ([CRAN](https://cran.r-project.org/package=PINSPlus)): 
  - Provides a robust approach for omics data integration and disease subtyping. PINSPlus is fast and supports the analysis of large datasets with hundreds of thousands of samples and features. The software automatically determines the optimal number of clusters and then partitions the samples in a way such that the results are robust against noise and data perturbation.
  - Peer-reviewed publication: https://doi.org/10.1093/bioinformatics/bty1049


- DeconBenchmark ([GitHub](https://github.com/phibya/DeconBenchmark)):
  - This package provides a common interface to run 45+ cellular deconvolution methods.
  - Peer-reviewed publication: https://doi.org/10.1093/nar/gkae267


- RCPA ([CRAN](https://cran.r-project.org/package=RCPA), [GitHub](https://github.com/phibya/RCPA)): 
  - The R package for Consensus Pathway Analysis (RCPA) implements a complete analysis pipeline including: i) download and process data from NCBI Gene Expression Omnibus, ii) perform differential analysis using techniques developed for both microarray and sequencing data, iii) perform systems-level analysis using different methods for enrichment analysis and topology-based (TB) analysis, iv) perform meta-analysis and consensus analysis, and v) visualize analysis results and explore significantly impacted pathways across multiple analyses. The package supports the analysis of more than 1,000 species, two pathway databases, three differential analysis techniques, eight pathway analysis tools, six meta-analysis methods, and two consensus analysis techniques.
  - Peer-reviewed publication: https://doi.org/10.1002/cpz1.1036


- PGSA ([GitHub]((https://github.com/phibya/PGSA))): 
  - The package implements the PGSA (Perturbation-based Gene Set Analysis) algorithm which accounts for pathway co-regulation and provides conservative statistical inference through iterative data perturbation, K-means clustering, and regression-based p-value calibration. 
  - Publication: In preparation.
