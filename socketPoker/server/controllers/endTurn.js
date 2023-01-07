function endTurn(gameStates, socket, io, currentPlay, currentRaise) {
  const userName = socket.data.playerName;

  console.log('initiating endturn ' + userName);
  var result = gameStates[socket.data.roomNumber];
  console.log(result);
  if (result) {
    var players = new Map(Object.entries(result.players));
    players = Array.from(players.values());
    var player;
    // console.log(players);
    //set player as the current player
    for (var i = 0; i < players.length; i++) {
      if (players[i].name == userName) {
        player = players[i];
        playerIndex = i;
        console.log('this is player');
        console.log(player);
      }
    }
    //update info on this turn
    console.log(player.total);
    console.log(currentRaise);
    player.total -= Math.abs(currentRaise - player.current);
    result.pot += Math.abs(currentRaise - player.current);
    console.log('total money ' + player.total);
    player.currentPlay = currentPlay;
    player.current = currentRaise;
    result.largestBet = Math.max(result.largestBet, currentRaise);
    console.log('the current largest bet is ' + result.largestBet);
    result.largestRaise = Math.max(
      result.largestRaise,
      currentRaise - result.largestBet,
    );
    console.log('the current largest raise is ' + result.largestRaise);

    //check if game needs to end
    if (checkEndGame(result)) {
      endGame(result);
      gameStates[socket.data.roomNumber] = result;
      return true;
    }

    console.log('checking if round ending');
    //if yes then end round

    checkEndRound = true;
    console.log('Player Index is ' + playerIndex);
    //genereate a array containing a round of players after the current player
    rotateIndex = players.length - playerIndex;
    console.log('rotate index is ' + rotateIndex);
    nextPlayers = [...Array(players.length).keys()];
    console.log('generated list: ' + nextPlayers);
    rotate(nextPlayers, rotateIndex);
    console.log('rotated list ' + nextPlayers);
    nextPlayers.shift();
    console.log(players);
    console.log(nextPlayers);
    console.log('The largest bet is ' + result.largestBet);
    for (var i of nextPlayers) {
      //if player i can make a turn, i.e. if they have not lost and they still need to call
      if (
        !players[i].loss &&
        players[i].currentPlay != 'Fold' &&
        players[i].currentPlay != 'Allin' &&
        (!players[i].currentPlay ||
          (players[i].currentPlay == 'Call' &&
            players[i].current < result.largestBet) ||
          (players[i].currentPlay == 'Check' &&
            players[i].current < result.largestBet))
      ) {
        checkEndRound = false;
        console.log('setting current player to ' + players[i].name);
        result.currentPlayer = players[i];
        break;
      }
    }
    if (checkEndRound) {
      console.log('The round is ending');
      switch (result.gameTurn) {
        case 'Preflop':
          console.log('starting flop');
          result.gameTurn = 'Flop';
          io.emit('stage', result.gameTurn);
          break;
        case 'Flop':
          console.log('starting turn');
          result.gameTurn = 'Turn';
          io.emit('stage', result.gameTurn);
          break;
        case 'Turn':
          console.log('starting river');
          result.gameTurn = 'River';
          io.emit('stage', result.gameTurn);
          break;
        case 'River':
          endGame(result);
          break;
        default:
      }

      //restart round
      var nextPlayerIndex;
      //select the next player, this is SB by default but if SB is out then get the next player
      for (var i = 0; i < players.length; i++) {
        players[i].current = 0;
        players[i].currentPlay = false;
        players[i].currentRaise = 0;
        if (players[i].pos == 'SB') {
          nextPlayerIndex = i;
        }
      }

      for (var i = 0; i < players.length; i++) {
        if (players[i].pos == 'SB') {
          nextPlayerIndex = i;
          if (
            players[i].loss ||
            players[i].currentPlay == 'Fold' ||
            players[i].currentPlay == 'Allin'
          ) {
            nextPlayerIndex == (nextPlayerIndex + 1) % players.length;
            continue;
          }
          result.currentPlayer = players[nextPlayerIndex];
        }
      }
      console.log('the next player is ' + players[nextPlayerIndex].name);
      result.currentPlayer = players[nextPlayerIndex];
      result.largestBet = 0;
      result.largestRaise = 0;
    }
  }
  io.emit('getTurn', result.gameTurn);
  io.emit('getBetData', {
    largestBet: result.largestBet,
    largestRaise: result.largestRaise,
    pot: result.pot,
  });
  for (var i = 0; i < players.length; i++) {
    io.to(players[i].id.toString()).emit('getTotal', players[i].total);
    io.to(players[i].id.toString()).emit('getCurrent', players[i].current);
    console.log(players[i].total);
  }
  gameStates[socket.data.roomNumber] = result;
  console.log('final');
  console.log(result);
  io.emit('checkCurrentPlayer', result.currentPlayer.name);
}

var rotate = function (nums, k) {
  k %= nums.length; // if k is greater than nums.length then one cycle is completed that means it will remain the same and we have to remainder shifts

  let reverse = function (i, j) {
    while (i < j) {
      let temp = nums[i];
      nums[i] = nums[j];
      nums[j] = temp;
      i++;
      j--;
    }
  }; // suppose  ----->--->
  reverse(0, nums.length - 1); // reverse   <--<------
  reverse(0, k - 1); // reverse first part ---><----
  reverse(k, nums.length - 1); // reverse second part --->----->
};

function checkEndGame(room) {
  console.log('checking Endgame');

  var players = new Map(Object.entries(room.players));
  players = Array.from(players.values());
  activePlayers = 0;
  for (var i = 0; i < players.length; i++) {
    if (
      players[i].currentPlay != 'Fold' &&
      players[i].currentPlay != 'Allin' &&
      players[i].loss == false
    ) {
      activePlayers += 1;
    }
  }
  console.log('number of active players: ' + activePlayers);
  if (activePlayers < 1) {
    console.log('game ending');
    return true;
  }
  console.log('game not ending');
  return false;
}

async function endGame(result) {
  result.gameTurn = 'Showdown';

  //Make map of player cards
  const playerCards = result.playerCards;
  const sharedCards = result.communityCards;
  const players = result.player;

  let highestRank = null; //calc best hand

  let winnderIndex = 0; //for player array
  let playerIndex = 0;

  for (let i = 0; i <= playerCards.length - 2; i += 2) {
    let rank = getRankValueAndName(
      [playerCards[i], playerCards[i + 1]],
      sharedCards,
    );
    if (highestRank == null) {
      highestRank = rank;
      console.log(highestRank.desc);
      continue;
    }

    if (rank.value > highestRank.value) {
      highestRank = rank;
      winnderIndex = playerIndex;
    }
    playerIndex++;
    console.log(highestRank.desc);
  }

  //transfer pot to winner
  players[winnderIndex].total += result.pot;
  //reset current, readyState, currentPlay, currentRaise, loss
  //reset community cards
  //reset playerCards
  //reset currentstatus to waiting
  //reset pot

  result.winner = winnderIndex;
  console.log('=============================');
  console.log(
    'winner is: ' + players[winnderIndex].name + 'with ' + highestRank.desc,
  );
  console.log('=============================');
  //eturn result;
}

function checkEndRound(result) {
  //check if all players have called/folded/allin-ed
  checkEndRound = true;
  //genereate a array containing a round of players after the current player
  rotateIndex = players.length - playerIndex;
  nextPlayers = [...Array(players).keys()];
  rotate(nextPlayers, rotateIndex);
  nextPlayers.pop(0);

  for (var i of nextPlayers) {
    if (
      !players[i].currentPlay ||
      (players[i].currentPlay == 'Call' &&
        players[i].current <= result.largestBet) ||
      players[i].currentPlay == 'Check'
    ) {
      checkEndRound = false;
      result.currentPlayer = players[i];
    }
  }
  return checkEndRound;
}

const NUM_VALUES_IN_DECK = 13;
const NUM_SUITS_IN_DECK = 4;
const NUM_CARDS_IN_HAND = 5;
const ACE_VALUE = Math.pow(2, 13);
const STRAIGHT_LOW_ACE_INDICATOR = parseInt('10000000011110', 2);
const TEN_CARD_POSITION = 8;
const RANK_BASE_VALUE = Math.pow(10, 9);

/* NUM_VALUES =
  A: 8192,
  K: 4096,
  Q: 2048,
  J: 1024,
  T: 512,
  9: 256,
  8: 128,
  7: 64,
  6: 32,
  5: 16,
  4: 8,
  3: 4,
  2: 2,
  A: 1,
*/

/*
Card Matrix
.  2  3  4  5  6  7  8  9  T  J  Q  K  A
C 00 01 02 03 04 05 06 07 08 09 10 11 12
D 13 14 15 16 17 18 19 20 21 22 23 24 25
H 26 27 28 29 30 31 32 33 34 35 36 37 38
S 39 40 41 42 43 44 45 46 47 48 49 50 51
 */

function getRankValueAndName(privateCards, sharedCards) {
  //should be 2 arrays
  var hand = privateCards.concat(sharedCards);
  console.log(hand);
  const suits = new Array(NUM_SUITS_IN_DECK).fill(0);
  const values = new Array(NUM_VALUES_IN_DECK).fill(0);

  //Count suits and num of values in hand
  hand.forEach(card => {
    let val = calcCardValue(card);
    suits[Math.floor(val / NUM_VALUES_IN_DECK)] += 1;
    values[val % NUM_VALUES_IN_DECK] += 1;
  });

  let rankValue = values.reduce(
    (total, val, index) =>
      (total +=
        ((val === 1 && Math.pow(2, index + 1)) || 0) +
        ((val > 1 && Math.pow(2, index + 1) * ACE_VALUE * val) || 0)),
    0,
  );

  const firstCardIndex = values.findIndex(index => index === 1);
  const ranks = {
    royal_flush: false,
    straight_flush: false,
    four_of_a_kind: values.some(count => count === 4),
    full_house: values.filter(Boolean).length === 2,
    flush: suits.some(count => count === NUM_CARDS_IN_HAND),
    straight:
      values
        .slice(firstCardIndex, firstCardIndex + NUM_CARDS_IN_HAND)
        .filter(count => count === 1).length === 5 ||
      rankValue === STRAIGHT_LOW_ACE_INDICATOR,
    three_of_a_kind: values.some(count => count === 3),
    two_pairs: values.filter(count => count === 2).length === 2,
    pair: values.filter(count => count === 2).length === 1,
    high_card: true,
  };
  ranks.straight_flush = ranks.flush && ranks.straight;
  ranks.royal_flush =
    ranks.straight_flush && firstCardIndex === TEN_CARD_POSITION;
  let rankIndex = 0;
  let rankDescription = '';
  Object.keys(ranks).every((key, index) => {
    rankIndex = 10 - index;
    rankDescription = key;
    return !ranks[key];
  });
  rankValue +=
    rankIndex * RANK_BASE_VALUE -
    ((rankValue === STRAIGHT_LOW_ACE_INDICATOR && ACE_VALUE - 1) || 0);

  return {
    value: rankValue,
    desc: rankDescription
      .split('_')
      .map(char => char[0].toUpperCase() + char.slice(1))
      .join(' '),
  };
}

function calcCardValue(card) {
  var baseValue = 0;
  switch (card.suit) {
    case 'Club':
      baseValue = -2;
      break;
    case 'Diamond':
      baseValue = 11;
      break;
    case 'Heart':
      baseValue = 24;
      break;
    case 'Spade':
      baseValue = 37;
      break;
  }

  if (!isNaN(parseInt(card.number))) return baseValue + parseInt(card.number); // if is a number

  var numValue = 0;

  switch (card.number) {
    case 'T':
      numValue = 10;
      break;
    case 'J':
      numValue = 11;
      break;
    case 'Q':
      numValue = 12;
      break;
    case 'K':
      numValue = 13;
      break;
    case 'A' || 1:
      numValue = 14;
      break;
  }

  return baseValue + numValue;
}

module.exports = {endTurn};
