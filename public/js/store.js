/*
 * TodoStore
 */

var GameDispatcher = require('./dispatcher');
var EventEmitter = require('events').EventEmitter;
var GameConstants = require('./constants');
var assign = require('object-assign');
var $ = require('jquery');

var CHANGE_EVENT = 'change';

var _deck = null;
var _player = null;
var _opponent = null;
var _startingHandCount = 4;

/**
 * Handle player clicking a card
 */
function cardSelect(cardID) {
  $(".card").css("color", "black");
  $("#" + cardID).css("color", "red").addClass("selected");
  $(".confirm-btn").css("display", "block");
}

function onClickStartGame() {
  $(".game-start-btn").css("display", "none");
  for (var i=0; i < _startingHandCount; i++) _player.putInHand(deck.draw());
  for (var i=0; i < _startingHandCount; i++) _opponent.putInHand(deck.draw());
}

function onClickConfirm() {
  var selectedCardID = $(".selected").attr("id");
  selectedCardID = parseInt(selectedCardID);

  var selectedCard = _player.playCard(selectedCardID);

  settleCardEffect(selectedCard);

  $(".selected").removeClass("selected").css("color", "black");
}

function settleCardEffect(card) {
  if(card.effect == "sha") {
    _opponent.currentHP -= 1;
  }
}

var GameStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return {
      deck: _deck,
      player: _player,
      opponent: _opponent
    };
  },

  setDeck: function(deck) {
    _deck = deck;
  },

  setPlayer: function(player) {
    _player = player;
  },

  setOpponent: function(opponent) {
    _opponent = opponent;
  },

  //not specific to this game
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

// Register to handle all updates
GameDispatcher.register(function(payload) {
  var action = payload.action;
  
  switch(action.actionType) {
    case GameConstants.CARD_SELECT:
      id = action.id;
      cardSelect(id);
      break;

    case GameConstants.ONCLICK_CONFIRM:
      onClickConfirm();
      break;

    case GameConstants.ONCLICK_START_GAME:
      onClickStartGame();
      break;

    default:
      return true;
  }

  // This often goes in each case that should trigger a UI change. This store
  // needs to trigger a UI change after every view action, so we can make the
  // code less repetitive by putting it here.  We need the default case,
  // however, to make sure this only gets called after one of the cases above.
  GameStore.emitChange();

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = GameStore;
