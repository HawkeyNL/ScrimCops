const Discord = require("./structures/Client.js");

const client = new Discord({
  prefix: 's.',
  owner: '258526488138088449',
  commandsDir: 'commands',
  eventsDir: 'events',
  version: '0.0.1-f1',
  beta: '0.0.1-f10',
  shardID: process.argv[1],
  shardCount: process.argv[2],
  fetchAllMembers: true
});

client.login(process.env.TOKEN).catch(() => {
    console.log("Incorrect Bot Token.");
});

// Add the code below to let it host 24/7
// const http = require('http');
// const express = require('express');
// const app = express();
// app.get("/", (request, response) => {
//     response.sendStatus(200);
// });
// app.listen(process.env.PORT);
// setInterval(() => {
//     http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
// }, 280000);

