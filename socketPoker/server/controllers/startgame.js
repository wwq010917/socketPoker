const {getFlop} = require('./getFlop');
function startGame(gameStates, socket, io) {
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
      result.largestBet = 10;
      result.gameTurn = 'Preflop';
      io.emit('getTurn', result.gameTurn);
      io.emit('getBetData', {
        largestBet: result.largestBet,
        largestRaise: result.largestRaise,
        pot: result.pot,
      });
      io.emit('checkCurrentPlayer', result.currentPlayer.name);
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
      result.largestBet = 10;
      result.gameTurn = 'Preflop';
      io.emit('getTurn', result.gameTurn);
      io.emit('getBetData', {
        largestBet: result.largestBet,
        largestRaise: result.largestRaise,
        pot: result.pot,
      });
      io.emit('checkCurrentPlayer', result.currentPlayer.name);
    }
    result.setPositions = true;

    result.winner = null;
    result = getFlop(result);
    io.emit('checkStart', true);

    console.log(result);
    var players = new Map(Object.entries(result.players));
    players = Array.from(players.values());
    const cardMap = new Map();
    var cardIndex = 0;
    for (var i = 0; i < players.length; i++) {
      if (cardIndex > result.playerCards.length) {
        break;
      }
      const cardArray = new Array();
      for (var k = 0; k < 2; k++) {
        cardArray.push(result.playerCards[cardIndex]);
        cardIndex++;
      }
      console.log(players[i].id);
      console.log(cardArray);
      io.to(players[i].id.toString()).emit('privateCard', cardArray);
    }
    result.playerCards = cardMap;
    gameStates[socket.data.roomNumber] = result;
    for (var i = 0; i < players.length; i++) {
      io.to(players[i].id.toString()).emit('getTotal', players[i].total);
      io.to(players[i].id.toString()).emit('getCurrent', players[i].current);
      console.log(players[i].total);
    }
  }
}
module.exports = {startGame};
