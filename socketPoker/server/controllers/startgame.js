const {getFlop} = require('./getFlop');
function startGame(gameStates, socket) {
  var result = gameStates[socket.data.roomNumber];
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
    // console.log(result);
    gameStates[socket.data.roomNumber] = result;
  }
}
module.exports = {startGame};
