let timer;
function ready(gameStates, socket, callback, io) {
  const playerName = socket.data.playerName;

  const roomNumber = socket.data.roomNumber;
  let gameState = gameStates[roomNumber];
  if (gameState) {
    gameState.players[playerName].readyState = true;
    let ready = true;
    Object.keys(gameState.players).forEach(playerName => {
      if (gameState.players[playerName].readyState == false) {
        ready = false;
      }
    });
    if (ready && Object.keys(gameState.players).length >= 2) {
      gameState.waiting = false;
      gameStates[roomNumber] = gameState;
    }
    if (
      gameState.waiting == false &&
      Object.keys(gameState.players).length >= 2
    ) {
      let countdown = 5;
      timer = setInterval(() => {
        //io socket
        io.in(socket.data.roomNumber.toString()).emit('timer', true);
        io.in(socket.data.roomNumber.toString()).emit('countdown', countdown);
        countdown -= 1;
        console.log(`Time remaining: ${countdown} seconds`);
        if (countdown === -1) {
          //send a emit to client notify that game can be started
          socket.emit('wait', true);
          callback({success: true});
          clearInterval(timer);
        }
      }, 1000);
    } else {
      socket.emit('wait', false);
      callback({success: false});
    }
  }
}

function unready(gameStates, socket, io) {
  const playerName = socket.data.playerName;
  //console.log(playerName);
  const roomNumber = socket.data.roomNumber;
  let gameState = gameStates[roomNumber];
  if (gameState) {
    gameState.players[playerName].readyState = false;
    gameState.waiting = true;
    gameStates[roomNumber] = gameState;
    //console.log(gameState);
    io.in(socket.data.roomNumber.toString()).emit('timer', false);
    // Clear the timer when a player presses the "unready" button
    clearTimeout(timer);
  }
}
function disconnect(gameStates, socket, io) {
  if (socket.data.roomNumber) {
    console.log(socket.data.playerName + ' is disconnected');
    const gameState = gameStates[socket.data.roomNumber];
    if (gameState) {
      gameState.waiting = true;
      io.in(socket.data.roomNumber.toString()).emit('timer', false);
      // Clear the timer when a player presses the "unready" button
      clearTimeout(timer);
      gameStates[socket.data.roomNumber] = gameState;
      if (gameState.players) {
        // Check if the player with the specified id exists in the object
        if (gameState.players[socket.data.playerName]) {
          // If so, delete the player from the object
          delete gameState.players[socket.data.playerName];

          // Check if there are any players left in the game
          if (Object.keys(gameState.players).length === 0) {
            // If not, delete the game state
            delete gameStates[socket.data.roomNumber];
          }
        }
      }
    }
  }
}
module.exports = {ready, unready, disconnect};
