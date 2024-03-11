"use strict";
const app = require("./app");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();
const port = 3977;
try {
  console.log("connection successfully !");
  app.use(bodyParser.json());
  // Enable CORS policy
  app.use(cors());
  app.options("*", cors());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  // eslint-disable-next-line no-undef, max-len
  http.createServer(app).listen(process.env.PORT || { port }, console.log(`Server is running on the port no: ${port} `));
} catch (err) {
  console.log("err", err);
}