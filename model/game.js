var game = {
  isMyTurn: true,

  printTurnIndicator: function() {
    if(this.isMyTurn) {
      var msg = "Your turn";
    }else {
      var msg = "Opponent's turn";
    }
    
    return msg;
  },

  switchTurn: function() {
    alert("break point in function");
    if(this.isMyTurn) {
      this.isMyTurn = false;
    }else {
      this.isMyTurn = true;
    }
  }
}

module.exports = game;