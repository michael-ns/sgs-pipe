var ce = require('cloneextend');
game = require('./../model/game');
Card = require('./../model/card');
deck = require('./../model/deck');
player = require('./../model/player');

game = require('./../model/game');

//creat players
michael = ce.clone(player);
michael.playerName = 'Michael';
michael.hp = 4;
nancy = ce.clone(player);
nancy.playerName = 'Nancy';

// get game objects ready
sha = new Card('sha.jpg', 'sha', 'basic', 0);
shan = new Card('shan.jpg', 'shan', 'basic', 0);
tao = new Card('tao.jpg', 'tao', 'basic', 0);

//set cards count
shaCount = 8;
shanCount = 8;
taoCount = 3;

//insert cards into the deck
for(i = 0; i < shaCount; i++) {
	sha.setCardID(deck.cards.length);
	deck.cards.push(sha);
}

for(i = 0; i < shanCount; i++) {
	sha.setCardID(deck.cards.length);
	deck.cards.push(shan);
}

for(i = 0; i < taoCount; i++) {
	sha.setCardID(deck.cards.length);
	deck.cards.push(tao);
}

deck.shuffle();

