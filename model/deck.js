var Card = require('./card')

var deck = {
	cards: [],

	shuffle: function() {
		var currentIndex = this.cards.length, temporaryValue, randomIndex ;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = this.cards[currentIndex];
			this.cards[currentIndex] = this.cards[randomIndex];
			this.cards[randomIndex] = temporaryValue;
		}
	},

	draw: function() {
		var card = this.cards[0];
		this.cards.splice(0, 1);

		return card;
	}
};

module.exports = deck;