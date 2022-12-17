const io = require('socket.io')(3000);
const {Room} = require('./class/Room.js');
const {playerStatus} = require('./class/playerStatus.js');
class card {
  constructor(number, suit) {
    this.number = number;
    this.suit = suit;
  }
}
// Keep track of the game state for each room
const gameStates = {};
io.on('connection', socket => {
  // When a new player wants to create a room
  socket.on('create', playerName => {
    var roomNumber = Math.floor(Math.random() * 10000);
    console.log(playerName + ' has created the room ' + roomNumber + '\n');
    //if room exist generate a new roomNumber
    while (gameStates[roomNumber]) {
      roomNumber = Math.floor(Math.random() * 10000);
    }
    let gameState = gameStates[roomNumber];
    // If there is no game state for the room, create a new one
    gameState = new Room(roomNumber);
    gameState.players.push(new playerStatus(playerName, socket.id));
    socket.join(roomNumber);
    socket.data.playerName = playerName;
    socket.data.roomNumber = roomNumber;
    gameStates[roomNumber] = gameState;
  });
  // When a new player wants to join the room
  socket.on('join', (playerName, roomNumber, callback) => {
    console.log(playerName + ' trying to room ' + roomNumber + '\n');
    let gameState = gameStates[roomNumber];
    if (gameState) {
      console.log(playerName + ' has joined the room ' + roomNumber + '\n');
      gameState.players.push(new playerStatus(playerName, socket.id));
      socket.join(roomNumber);
      socket.data.playerName = playerName;
      socket.data.roomNumber = roomNumber;
      // Send a response to the client indicating that the join event was successful
      callback({success: true});
    } else {
      // Send a response to the client indicating that the join event was not successful
      callback({
        success: false,
        message: 'The room ' + roomNumber + ' does not exist.',
      });
    }
  });
  socket.on('getPlayers', callback => {
    let gameState = gameStates[socket.data.roomNumber];
    if (gameState) {
      callback({success: true, players: gameState.players});
    } else {
      callback({success: false, message: 'The room does not exist.'});
    }
  });
  // When a player makes an action  update the game state accordingly
  socket.on('action', (action, roomNumber) => {
    // Get the game state for the specified room
    const gameState = gameStates[roomNumber];
  });
  //disconnect handles termination due to the reason of quit the game or loss internet etc.(socket is closed)
  socket.on('disconnect', () => {
    if (socket.data.roomNumber) {
      console.log(socket.data.playerName + ' is disconnected');
      const gameState = gameStates[socket.data.roomNumber];
      if (gameState) {
        gameState.players = gameState.players.filter(p => p.id !== socket.id);
        if (gameState.players.length === 0) {
          delete gameStates[socket.data.roomNumber];
        }
      }
    }
  });
  //disconnected handles when user press the back arrow and go back to their home page(does not close the socket)
  socket.on('disconnected', () => {
    if (socket.data.roomNumber) {
      console.log(socket.data.playerName + ' is disconnected');
      const gameState = gameStates[socket.data.roomNumber];
      if (gameState) {
        gameState.players = gameState.players.filter(p => p.id !== socket.id);
        if (gameState.players.length === 0) {
          delete gameStates[socket.data.roomNumber];
        }
      }
    }
  });
});

// Send the game state for each room to all connected clients every second
setInterval(() => {
  Object.keys(gameStates).forEach(roomNumber => {
    console.log(gameStates[roomNumber]);
    io.sockets.in(roomNumber.toString()).emit('state', gameStates[roomNumber]);
  });
}, 5000);
