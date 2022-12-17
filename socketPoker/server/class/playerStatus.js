class playerStatus {
  constructor(hostName, id) {
    this.id = id;
    this.name = hostName;
    this.total = 1000; // total money left for the player
    this.current = 0; //total bet in this current round
    this.pos = '';
    this.readyState = false;
    this.currentPlay = false; //the current decided play in this round
    this.currentRaise = 0; //the current total bet this turn
    this.loss = false; //when the player has 0 total money
    this.currentRank = false; //shows rank of current hand
  }
}
module.exports = {playerStatus};
