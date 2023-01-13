# TwitterTrendingNews

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Setup Prereqs](#setup-prereqs)

## General info
A RESTful API that reports on, and documents the latest trends using OpenAI's Devinci text-model 3 and Twitters Developer API.

Feeling like you are living under a rock? This project leverages the concept of a collective mentality through the latest tweets from trending hashtags and creates a summary report with sentiment to inform people about the latest trends. I used Node.js and Express.js to serve the REST API, with MongoDB to save the trend reports, while using OpenAI API and Twitter's Developer API for the business logic to generate the project.
	
## Technologies
Project is created with:
* Node.js version: 16.13.2
* Express.js version: 4.18.2
* MongoDB version: 4.13.0
* OpenAI version: 3.1.0
* twitter-api-client version: 1.6.1

## Setup Prereqs: 
To use this application, you must first obtain a Twitter Developer elevated account, OpenAI Developer account, and a MongoDB Atlas account. Once done, create a `.env` file in the root of the repository and put in the following keys:

```
    TWITTER_API_KEY='<Insert Twitter API Key Here>'
    TWITTER_API_SECRET='<Insert Twitter API Secret Here>'
    TWITTER_ACCESS_TOKEN='<Insert Twitter Access Token Here>'
    TWITTER_ACCESS_TOKEN_SECRET='<Insert Twitter Access Token Secret Here>'
    TWITTER_BEARER_TOKEN='<Insert Twitter Bearer Token Here>'
    OPENAI_API_KEY='<Insert Open AI API Key Here>'
    MONGODB_CONNECT='<Insert MongoDB Database address Here>'
 ```

## Setup
To run this project, install it locally using npm:

```
$ cd ../TwitterTrendingNews
$ npm install
$ npm start
```
once started, you can now access the API endpoints through one of the two routes:
* `localhost:8080/report/get-latest-report`. to generate the latest reports on trending topics. Note that this route must be called atleast once when first running this server-side application.
* `localhost:8080/report/get-report`. to gather previously generated reports.
