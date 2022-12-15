const io = require('socket.io')(3000);

// Keep track of the game state for each room
const gameStates = {};

io.on('connection', socket => {
  // When a new player connects, add them to the game
  socket.on('create', (playerName, roomName) => {
    console.log(playerName + ' has created the room ' + roomName + '\n');
    let gameState = gameStates[roomName];
    if (!gameState) {
      // If there is no game state for the room, create a new one
      gameState = {
        players: [],
        deck: [],
        communityCards: [],
        pot: 0,
      };
      gameStates[roomName] = gameState;
    }
  });
  socket.on('join', (playerName, roomName) => {
    console.log(playerName + ' has joined the room ' + roomName + '\n');
    let gameState = gameStates[roomName];
    if (gameState) {
      gameState.players.push({
        id: socket.id,
        name: playerName,
        hand: [],
        chips: 1000,
      });
      socket.join(roomName);
    } else {
      socket.emit('message', 'The room ' + roomName + ' does not exist.');
    }
  });

  // When a player makes an action  update the game state accordingly
  socket.on('action', (action, roomName) => {
    // Get the game state for the specified room
    const gameState = gameStates[roomName];
  });

  socket.on('disconnected', roomName => {
    console.log(roomName + ' is disconnected');
    const gameState = gameStates[roomName];
    if (gameState) {
      gameState.players = gameState.players.filter(p => p.id !== socket.id);
      if (gameState.players.length === 0) {
        delete gameStates[roomName];
      }
    }
  });
});

// Send the game state for each room to all connected clients every second
setInterval(() => {
  Object.keys(gameStates).forEach(roomName => {
    console.log(gameStates[roomName]);
    io.sockets.in(roomName.toString()).emit('state', gameStates[roomName]);
  });
}, 5000);
