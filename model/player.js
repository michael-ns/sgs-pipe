var Card = require('./card')
var Deck = require('./deck')

var player = {
  playerName: 'default name',
  maxHP: 3,
  currentHP: 3,
  cards: [],
  canSha: true,

  putInHand: function(card) {
    this.cards.push(card);
  },

  playCard: function(cardID) {
    for (var i = 0; i < this.cards.length; i++) {
      if (this.cards[i].cardID == cardID) {

        var selectedCard = this.cards[i];
        console.log(selectedCard)
        if(this.settleCardEffect(selectedCard)) {
          //remove the card from hand
          this.cards.splice(i, 1);
        }

        return selectedCard;
      }
    }
  },

  settleCardEffect: function(card) {
    var cardEffect = card.effect;

    switch(cardEffect) {
      case "sha":
        if(this.canSha) {
          this.canSha = false;
          return true;
        } else {
          alert("You can only use Sha once per turn.");
          return false;
        }
      case "shan":
        return false;
      default:
        if (this.currentHP < this.maxHP) {
          this.currentHP += 1;
          return true;
        } else {
          alert("You can only use Tao when you are hurt.");
          return false;
        }
    }
  }
}

module.exports = player;