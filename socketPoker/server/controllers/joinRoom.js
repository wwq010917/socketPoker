const {Room} = require('../class/Room.js');
const {playerStatus} = require('../class/playerStatus.js');
function joinRoom(gameStates, playerName, roomNumber, socket, callback) {
  console.log(playerName + ' trying to room ' + roomNumber + '\n');
  let gameState = gameStates[roomNumber];
  if (gameState) {
    //check if there is still space for players to join
    if (Object.keys(gameState.players).length <= 8) {
      if (gameState.players[playerName]) {
        callback({
          success: false,
          message: 'There is already ' + playerName + 'exist in the room',
        });
        return;
      }
      console.log(playerName + ' has joined the room ' + roomNumber + '\n');
      gameState.players[playerName] = new playerStatus(playerName, socket.id);
      socket.join(roomNumber);
      socket.data.playerName = playerName;
      socket.data.roomNumber = roomNumber;
      gameStates[roomNumber] = gameState;
      // Send a response to the client indicating that the join event was successful
      callback({success: true});
    } else {
      //room is full send a callback to client
      callback({
        success: false,
        message: 'The room ' + roomNumber + 'is fulled',
      });
    }
  } else {
    // Send a response to the client indicating that the join event was not successful
    callback({
      success: false,
      message: 'The room ' + roomNumber + ' does not exist.',
    });
  }
}
module.exports = {joinRoom};
