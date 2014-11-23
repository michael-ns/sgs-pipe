var React = require('react');

var GameActions = {
  onClickConfirm:function(player, opponent){
    var selectedCardID = $(".selected").attr("id");
    selectedCardID = parseInt(selectedCardID);

    var selectedCard = player.playCard(selectedCardID);

    this.settleCardEffect(selectedCard, opponent);

    $(".selected").removeClass("selected").css("color", "black");
  },

  settleCardEffect:function(card, opponent){
    if(card.effect == "sha") {
      opponent.currentHP -= 1;
    }
  },

  onClickEndTurn:function(game){
    game.switchTurn();
  },

  onClickSelect:function(cardID){
    $(".card").css("color", "black");
    $("#" + cardID).css("color", "red").addClass("selected");
    $(".confirm-btn").css("display", "block");
  }  
};

module.exports = GameActions;