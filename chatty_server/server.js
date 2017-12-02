//server.js
const uuid = require('uuid');
const express = require('express');
const SocketServer = require('ws').Server;
const querystring = require('querystring');
const fetch = require('node-fetch');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = (data) => {
  console.log('broadcast!');
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(data));
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

 assignColor(ws);



  // broadcast for username and color

  wss.broadcast({
    type: 'userCount',
    usersOnline: wss.clients.size,

  });

  ws.on('message', (message) => {

    // Grabbing the incoming message

    let incomingMessage = JSON.parse(message);
    incomingMessage.id = uuid(); // assigning id to random digits

    // checking the type property of the incoming message

    if(incomingMessage.type === 'postMessage'){
      incomingMessage.type = 'incomingMessage';
    } else if(incomingMessage.type === 'postNotification'){
      incomingMessage.type = 'incomingNotification';
    }

    if (matches = incomingMessage.content.match(/^\/giphy (.+)$/)) {
      let qs = querystring.stringify({
        api_key: 'SqWpClGpSVwVskro0hCTobNZWY0Wr6G0',
        tag: matches[1]
      });

      fetch(`https://api.giphy.com/v1/gifs/random?${qs}`)
        .then( resp => {return resp.json() } )
        .then( json => {
          incomingMessage.content = `<img src="${json.data.image_url}" alt=""/>`
          wss.broadcast(incomingMessage);
      })
    } else {
      // broadcasting the message
       wss.broadcast(incomingMessage);
    }

  });

  ws.on('close', () => {
    console.log('Client disconnected')

    wss.broadcast({
      type: 'userCount',
      usersOnline: wss.clients.size
    });
  });
});

// To get random colors

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function assignColor(client) {
  const userColor = getRandomColor();
  const assignUserColor = {
    type: "colorNotification",
    userColor: userColor
  };
  client.send(JSON.stringify(assignUserColor));
}

