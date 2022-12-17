const io = require('socket.io')(3000);
const {Room} = require('./class/Room.js');
const {playerStatus} = require('./class/playerStatus.js');
const {createRoom} = require('./controllers/createRoom');
const {joinRoom} = require('./controllers/joinRoom');
const {getFlop} = require('./controllers/getFlop');
const {ready, unready} = require('./controllers/ready');
const {disconnect} = require('./controllers/disconnect');
class card {
  constructor(number, suit) {
    this.number = number;
    this.suit = suit;
  }
}
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
    const playerName = socket.data.playerName;
    console.log(playerName);
    const roomNumber = socket.data.roomNumber;
    let gameState = gameStates[roomNumber];
    callback({ready: gameState.players[playerName].readyState});
  });
  socket.on('ready', callback => {
    ready(gameStates, socket, callback);
  });
  socket.on('unready', () => {
    unready(gameStates, socket);
  });
  socket.on('start', () => {
    const result = gameStates[socket.data.roomNumber];
    console.log('start Game');
    // generate a button
    if (!result.setPositions) {
      // Get an array of player keys
      const playerKeys = Object.keys(result.players);
      // Randomly select a button
      const btn = Math.floor(Math.random() * playerKeys.length);
      // Set the button player's position
      result.players[playerKeys[btn]].pos = 'BTN';
      if (playerKeys.length == 2) {
        // Set the small blind player's position
        const sb = (btn + 1) % playerKeys.length;
        result.players[playerKeys[sb]].pos = 'SB';
        result.players[playerKeys[sb]].current = 5;
        result.players[playerKeys[sb]].total = 1000 - 5;
        result.pot += 5;
        result.players[playerKeys[btn]].current = 10;
        result.players[playerKeys[btn]].total = 1000 - 10;
        result.largestRaise = 10;
        result.pot += 10;
        result.currentPlayer = result.players[playerKeys[sb]];
      } else {
        // Set the small blind and big blind player's positions
        const sb = (btn + 1) % playerKeys.length;
        const bb = (btn + 2) % playerKeys.length;
        result.players[playerKeys[sb]].pos = 'SB';
        result.players[playerKeys[sb]].current = 5;
        result.players[playerKeys[sb]].total = 1000 - 5;
        result.pot += 5;
        result.players[playerKeys[bb]].pos = 'BB';
        result.players[playerKeys[bb]].current = 10;
        result.players[playerKeys[bb]].total = 1000 - 10;
        result.largestRaise = 10;
        result.pot += 10;
        // Set the current player as the player after the big blind
        const cur = (bb + 1) % playerKeys.length;
        result.currentPlayer = result.players[playerKeys[cur]];
      }
      result.setPositions = true;
      result.largestBet = 10;
      result.gameStage = 'Preflop';
      result.winner = null;
      result = getFlop(result);
      console.log(result);
    }
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
