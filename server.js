const { ShardingManager } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');  

const manager = new ShardingManager('./client.js', { token: process.env.TOKEN, autoSpawn: true });
manager.spawn(1);

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a') + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
