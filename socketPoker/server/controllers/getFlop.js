class card {
  constructor(number, suit) {
    this.number = number;
    this.suit = suit;
  }
}
function getFlop(room, io) {
  const cards = [
    'SA',
    'S2',
    'S3',
    'S4',
    'S5',
    'S6',
    'S7',
    'S8',
    'S9',
    'S10',
    'SJ',
    'SQ',
    'SK',
    'DA',
    'D2',
    'D3',
    'D4',
    'D5',
    'D6',
    'D7',
    'D8',
    'D9',
    'D10',
    'DJ',
    'DQ',
    'DK',
    'HA',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'H7',
    'H8',
    'H9',
    'H10',
    'HJ',
    'HQ',
    'HK',
    'CA',
    'C2',
    'C3',
    'C4',
    'C5',
    'C6',
    'C7',
    'C8',
    'C9',
    'C10',
    'CJ',
    'CQ',
    'CK',
  ];
  //console.log(room.currentStatus);

  for (i = 1; i <= Object.keys(room.players).length * 2; i++) {
    n = Math.floor(Math.random() * cards.length);
    var newCard;
    if (cards[n][0] == 'S') {
      newCard = new card(cards[n][1], 'Spade');
    } else if (cards[n][0] == 'C') {
      newCard = new card(cards[n][1], 'Club');
    } else if (cards[n][0] == 'D') {
      newCard = new card(cards[n][1], 'Diamond');
    } else if (cards[n][0] == 'H') {
      newCard = new card(cards[n][1], 'Heart');
    }
    room.playerCards.push(newCard);

    cards.splice(n, 1);
  }
  for (i = 0; i <= 4; i++) {
    n = Math.floor(Math.random() * cards.length);
    var newCard;
    if (cards[n][0] == 'S') {
      newCard = new card(cards[n][1], 'Spade');
    } else if (cards[n][0] == 'C') {
      newCard = new card(cards[n][1], 'Club');
    } else if (cards[n][0] == 'D') {
      newCard = new card(cards[n][1], 'Diamond');
    } else if (cards[n][0] == 'H') {
      newCard = new card(cards[n][1], 'Heart');
    }
    room.communityCards.push(newCard);
    cards.splice(n, 1);
  }
  console.log(room.communityCards);
  console.log(room.playerCards);
  // room.currentStatus = 'start';

  return room;
}
module.exports = {getFlop};
