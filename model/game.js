var game = {
  turnIndicator: "My turn: YES",
  turnCount: "Turn count: ",
  myHP: 3,
  opponentHP: 3,
  myHand: [],
  opponentHand: [],
  gameObjects: [],

  getTurnIndicator: function() {
    return this.turnIndicator;
  }
}

module.exports = game;