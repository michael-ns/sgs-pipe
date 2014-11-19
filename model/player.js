var Card = require('./card')
var Deck = require('./deck')

var player = {
  playerName: 'default name',
  hp: 3,
  cards: [],

  putInHand: function(card) {
    this.cards.push(card);
  },

  playCard: function(cardID) {
    for (var i = 0; i < this.cards.length; i++) {
      if (this.cards[i].cardID == cardID) {

        var selectedCard = this.cards[i];
        this.cards.splice(i, 1);
        return selectedCard;
      }
    }
  }
}

module.exports = player;