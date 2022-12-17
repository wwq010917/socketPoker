const io = require('socket.io-client');

const socket = io('http://localhost:3000');

let roomNumber; // Store the room name in a variable so we can access it in the 'disconnect' event handler

socket.on('connect', () => {
  console.log('trying');
  // When the client connects, send a 'join' event with the player's name and the room name
  playerName = 'player1';
  roomNumber = 'room1';
  socket.emit('join', playerName, roomNumber, response => {
    console.log(response.success);
  });
  //socket.emit('disconnected', roomNumber);
});

socket.on('state', (gameState, room) => {
  // When the server sends a 'state' event, update the game state
  // TODO: Update the game state for the specified room based on the data in the event
});

socket.on('action', (action, room) => {
  // When the server sends an 'action' event, handle the action
  // TODO: Handle the action for the specified room based on the data in the event
});

socket.on('disconnect', () => {
  //console.log(roomNumber);
  console.log('Disconnected from the server');
});
