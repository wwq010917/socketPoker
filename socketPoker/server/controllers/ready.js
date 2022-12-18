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
        io.in(socket.data.roomNumber.toString()).emit('timer', true);
        io.in(socket.data.roomNumber.toString()).emit('countdown', countdown);
        countdown -= 1;
        console.log(`Time remaining: ${countdown} seconds`);
        if (countdown === -1) {
          console.log('All players are ready');
          //send a emit to client notify that game can be started
          socket.emit('wait', true);
          callback({success: true});
          clearInterval(timer);
        }
      }, 1000);
    } else {
      console.log('Not all players are ready');
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

module.exports = {ready, unready};
