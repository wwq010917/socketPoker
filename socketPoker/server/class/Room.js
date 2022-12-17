class Room {
  constructor(number) {
    this.roomNumber = number;
    this.players = new Array();
    this.communityCards = new Array();
    this.playerCards = new Array();
    this.currentStatus = 'waiting';
    this.setPositions = false;
    this.startingMoney = 1000;
    this.button;
    this.currentPlayer;
    this.largestBet = 0;
    this.largestRaise = 0;
    this.pot = 0;
    this.gameTurn = 'Preflop';
    this.winner;
    // [["S2", "S3"], ["H5", "HK"]]
  }
}
module.exports = {Room};
