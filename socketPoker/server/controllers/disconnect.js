function disconnect(gameStates, socket) {
  if (socket.data.roomNumber) {
    console.log(socket.data.playerName + ' is disconnected');
    const gameState = gameStates[socket.data.roomNumber];
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
module.exports = {disconnect};
