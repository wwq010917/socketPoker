const {Room} = require('../class/Room');
const {playerStatus} = require('../class/playerStatus.js');
function createRoom(gameStates, socket, playerName) {
  var roomNumber = Math.floor(Math.random() * 10000);
  while (roomNumber < 1000) {
    roomNumber = Math.floor(Math.random() * 10000);
  }
  //if room exist generate a new roomNumber
  while (gameStates[roomNumber]) {
    roomNumber = Math.floor(Math.random() * 10000);
    while (roomNumber < 1000) {
      roomNumber = Math.floor(Math.random() * 10000);
    }
  }
  console.log(playerName + ' has created the room ' + roomNumber + '\n');
  let gameState = gameStates[roomNumber];
  // If there is no game state for the room, create a new one
  gameState = new Room(roomNumber);
  gameState.players[playerName] = new playerStatus(playerName, socket.id);
  socket.join(roomNumber.toString());
  socket.data.playerName = playerName;
  socket.data.roomNumber = roomNumber;
  gameStates[roomNumber] = gameState;
}
module.exports = {createRoom};
