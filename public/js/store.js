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
var _isMyTurn = true;

/**
 * Handle player clicking a card
 */
function cardSelect(cardID) {
  $(".card").css("color", "black");
  $("#" + cardID).addClass("selected");
  $(".confirm-btn").css("display", "block");
}

function addLogMsg(msg){
  $('.log-msg').append("<div>" + msg + "</div>");
}

function onClickStartGame() {
  $(".game-start-btn").css("display", "none");
  //second argument for putInHand represents card visibility
  for (var i=0; i < _startingHandCount; i++) _player.putInHand(deck.draw(), true);
  for (var i=0; i < _startingHandCount; i++) _opponent.putInHand(deck.draw(), false);

  addLogMsg("Game started. Let's rock!");
}

function onClickConfirm() {
  var selectedCardID = $(".selected").attr("id");
  selectedCardID = parseInt(selectedCardID);

  playCard(selectedCardID);

  //reset select state on page
  $(".selected").removeClass("selected").css("color", "black");
}

function playCard(cardID) {
  for (var i = 0; i < _player.cards.length; i++) {
    if (_player.cards[i].cardID == cardID) {

      var selectedCard = _player.cards[i];
      
      if(canPlayCard(selectedCard)) {
        //remove the card from hand
        _player.cards.splice(i, 1);
        settleCardEffect(selectedCard);

        //log card playing action
        var cardName = $('.selected').data('card');
        addLogMsg("You played card: " + cardName);
      }        
    }
  }
}

function settleCardEffect(card) {
  if(card.effect == "sha") {
    _opponent.currentHP -= 1;
  }
}

function canPlayCard(card) {
  switch(card.effect) {
    case "sha":
      if(_player.canSha) {
        _player.canSha = false;
        return true;
      } else {
        alert("You can only use Sha once per turn.");
        return false;
      }

    case "shan":
      return false;

    default:
      if (_player.currentHP < _player.maxHP) {
        _player.currentHP += 1;
        return true;
      } else {
        alert("You can only use Tao when you are hurt.");
        return false;
      }
    }
  }

var GameStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return {
      deck: _deck,
      player: _player,
      opponent: _opponent,
      isMyTurn: _isMyTurn
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
