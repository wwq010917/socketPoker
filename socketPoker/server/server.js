const io = require('socket.io')(3000);
const {Room} = require('./class/Room.js');
const {playerStatus} = require('./class/playerStatus.js');
const {createRoom} = require('./controllers/createRoom');
const {joinRoom} = require('./controllers/joinRoom');
const {startGame} = require('./controllers/startgame');
const {ready, unready} = require('./controllers/ready');
const {disconnect} = require('./controllers/disconnect');

// Keep track of the game state for each room
const gameStates = {};
let timer;
io.on('connection', socket => {
  // When a new player wants to create a room
  socket.on('create', playerName => {
    createRoom(gameStates, socket, playerName);
  });
  // When a new player wants to join the room
  socket.on('join', (playerName, roomNumber, callback) => {
    joinRoom(gameStates, playerName, roomNumber, socket, callback);
  });
  //listen emit from client and send players array
  socket.on('getRoomNumber', callback => {
    //console.log(socket.data.roomNumber);
    callback({roomNumber: socket.data.roomNumber});
  });
  socket.on('getPlayers', callback => {
    let gameState = gameStates[socket.data.roomNumber];
    if (gameState) {
      let players = gameState.players;
      players = new Map(Object.entries(players));
      players = Array.from(players.values());
      callback({success: true, players: players});
    } else {
      callback({success: false, message: 'The room does not exist.'});
    }
  });
  socket.on('getready', callback => {
    let gameState = gameStates[socket.data.roomNumber];
    if (gameState) {
      const playerName = socket.data.playerName;
      callback({ready: gameState.players[playerName].readyState});
    }
  });
  socket.on('ready', callback => {
    ready(gameStates, socket, callback, io);
  });
  socket.on('unready', () => {
    unready(gameStates, socket, io);
  });
  socket.on('checkWaiting', callback => {
    //console.log(gameStates[socket.data.playerName]);
    callback({waiting: gameStates[socket.data.roomNumber].waiting});
  });

  socket.on('start', () => {
    startGame(gameStates, socket, io);
    //console.log(gameStates[socket.data.roomNumber]);
  });
  //disconnect handles termination due to the reason of quit the game or loss internet etc.(socket is closed)
  socket.on('disconnect', () => {
    disconnect(gameStates, socket);
  });
  //disconnected handles when user press the back arrow and go back to their home page(does not close the socket)
  socket.on('disconnected', () => {
    disconnect(gameStates, socket);
  });
});

// Send the game state for each room to all connected clients every second
setInterval(() => {
  Object.keys(gameStates).forEach(roomNumber => {
    //console.log(gameStates[roomNumber]);
    io.sockets.in(roomNumber.toString()).emit('state', gameStates[roomNumber]);
  });
}, 5000);
