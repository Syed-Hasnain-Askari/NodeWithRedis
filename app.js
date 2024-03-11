/* eslint-disable max-len */
"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan")
const app = express();
const axios = require('axios');
const RedisWrapper = require('./redis/redis')


// Middleware setup
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("tiny"));

// Custom middleware to set CORS headers
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.get("/get-post/", async (req, res) => {
    try {
        const get_post = await RedisWrapper.getPosts();
        if(get_post){
            return res.send({
                "status": 200,
                "response": JSON.parse(get_post)
            });
        }
        else{
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts'); 
            await RedisWrapper.addPost("post",response.data)
            RedisWrapper.setExpiry("post",3600); // Expires after 1 hour (3600 seconds)
            return res.send({
                "status": 200,
                "response": response.data
            });
        }
    } catch (error) {
        console.error('Error fetching or setting data:', error);
        return res.status(500).send({
            "status": 500,
            "error": "Internal Server Error"
        });
    }
});

module.exports = app;