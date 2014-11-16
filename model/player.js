var Card = require('./card')
var Deck = require('./deck')

var player = {
	playerName: 'default name',
	hp: 3,
	cards: [],

	putInHand: function(card) {
		this.cards.push(card);
	},

	playCard: function(cardIndex) {
		this.cards.splice(cardIndex, 1);
	}
}

module.exports = player;