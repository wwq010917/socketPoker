let timer;

function ready(gameStates, socket, callback) {
  const playerName = socket.data.playerName;
  console.log(playerName);
  const roomNumber = socket.data.roomNumber;
  let gameState = gameStates[roomNumber];
  gameState.players[playerName].readyState = true;
  let ready = true;
  Object.keys(gameState.players).forEach(playerName => {
    if (gameState.players[playerName].readyState == false) {
      ready = false;
    }
  });
  if (ready) {
    gameState.waiting = false;
    gameStates[roomNumber] = gameState;
  }
  if (
    gameState.waiting == false &&
    Object.keys(gameState.players).length >= 2
  ) {
    timer = setTimeout(() => {
      callback({success: true});
      console.log('All players are ready');
      //send a emit to client notify that game can be started
      socket.emit('wait', true);
    }, 5000);
  } else {
    console.log('Not all players are ready');
    callback({success: false});
  }
}

function unready(gameStates, socket) {
  const playerName = socket.data.playerName;
  console.log(playerName);
  const roomNumber = socket.data.roomNumber;
  let gameState = gameStates[roomNumber];
  gameState.players[playerName].readyState = false;
  gameState.waiting = true;
  gameStates[roomNumber] = gameState;
  // Clear the timer when a player presses the "unready" button
  clearTimeout(timer);
}

module.exports = {ready, unready};
