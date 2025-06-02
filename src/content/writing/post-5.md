---
title: Feature engineering for time series forecasting
slug: feature-engineering-for-time-series-forecasting
excerpt: A simple guide to feature engineering techniques for time series forecasting using XGBoost and Polars
publishDate: 'June 1, 2025'
tags:
- xgboost
- predictive-modeling
- linkedin
- polars
- timeseries
---

Recently, one of the students in our lab has been working on forecasting Alfalfa yield in the US.
Agricultural yield forecasting is a challenging task due to the complex interactions between weather, soil, and other factors.
If we can accurately predict the yield, it can help farmers make better decisions about planting, irrigation, and harvesting.
Alfalfa is an important crop in the US, used primarily for animal feed, and its yield forecasting can have significant economic implications.

The first thing that came to mind was to use ARIMA (AutoRegressive Integrated Moving Average) model. 
Libraries like `statsmodels` in Python make it easy to implement ARIMA models, but ARIMA does not support for building a single model for multiple time series, as well as learning the interactions between different time series.
Also, for someone just starting with time series forecasting, understanding how to encode features and how different encoding techniques affect the model performance can be quite challenging.

One mistake I often see when it comes to model development is that people focus too much on the model itself, rather than the features. Many times, especially in research, I saw people employ complex models like ensemble methods, just to solve a simple problem and squeeze out a few percentage points of accuracy. I believe that if we can use simple models to get an acceptable performance, we should stick with them. It will be much easier to interpret the results and understand the model's behavior.

Kaggle has a great dataset for time series forecasting, the [Store Sales - Time Series Forecasting](https://www.kaggle.com/competitions/store-sales-time-series-forecasting) competition. Briefly, the goal is to predict the sales of a store for the next 15 days based on historical sales data and other features like promotions, holidays, and store information. The dataset contains sales data for multiple stores and multiple product families, which makes it a good candidate for testing different feature engineering techniques.

Here I build a basic model using XGBoost to predict the sales using only the historical sales data to mainly focus on the predictive of features. The model achieves a RSMLE (Root Scaled Mean Logarithmic Error) of 0.43, which is a good starting point. You can check out the latest leaderboard for the competition to see how it compares to other models.

Check out the Notebook here: https://github.com/phibya/kaggle/blob/main/store-sales-time-series-forecasting.ipynb