var Card = require('./card')
var Deck = require('./deck')

var player = {
  playerName: 'default name',
  maxHP: 3,
  currentHP: 3,
  cards: [],
  canSha: true,

  putInHand: function(card, isVisible) {
    card.setVisibility(isVisible);
    this.cards.push(card);


      console.log(card.visible)
  }
}

module.exports = player;