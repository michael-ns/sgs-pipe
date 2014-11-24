var ce = require('cloneextend');
var $ = require('jquery');
var GameView = require('./view');
var React = require('react');
var GameStore = require('./store');

game = require('./../../model/game');
Card = require('./../../model/card');
deck = require('./../../model/deck');
player = require('./../../model/player');

//setup deck
sha = new Card('sha.jpg', 'sha', 'basic', 0);
shan = new Card('shan.jpg', 'shan', 'basic', 0);
tao = new Card('tao.jpg', 'tao', 'basic', 0);

//set cards count
shaCount = 8;
shanCount = 8;
taoCount = 3;

//insert cards into the deck
for(i = 0; i < shaCount; i++) {
  currentSha = ce.clone(sha);
  currentSha.setCardID(deck.cards.length);
  deck.cards.push(currentSha);
}

for(i = 0; i < shanCount; i++) {
  currentShan = ce.clone(shan);
  currentShan.setCardID(deck.cards.length);
  deck.cards.push(currentShan);
}

for(i = 0; i < taoCount; i++) {
  currentTao = ce.clone(tao);
  currentTao.setCardID(deck.cards.length);
  deck.cards.push(currentTao);
}

deck.shuffle();

GameStore.setDeck(deck);

//setup player
michael = ce.clone(player);
michael.playerName = 'Michael';
michael.maxHP = 4;
michael.currentHP = 4;
nancy = ce.clone(player);
nancy.playerName = 'Nancy';

GameStore.setPlayer(michael);
GameStore.setOpponent(nancy);

React.renderComponent(
    GameView(), document.getElementById('board')
);