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

/**
 * Add game actions to log
 */
function addLogMsg(msg){
  $('.log-msg').append("<div>" + msg + "</div>");
}

/**
 * Start the game and all players draw cards from the deck
 */
function onClickStartGame() {
  $(".game-start-btn").css("display", "none");
  //second argument for putInHand represents card visibility
  for (var i=0; i < _startingHandCount; i++) _player.putInHand(deck.draw(), true);
  for (var i=0; i < _startingHandCount; i++) _opponent.putInHand(deck.draw(), false);

  addLogMsg("Game started. Let's rock!");
}

/**
 * Play the selected card
 */
function onClickConfirm() {
  var selectedCardID = $(".selected").attr("id");
  selectedCardID = parseInt(selectedCardID);

  playCard(selectedCardID);

  //reset select state on page
  $(".selected").removeClass("selected").css("color", "black");
}

/**
 * settle card play
 */
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

/**
 * settle card effect
 */
function settleCardEffect(card) {
  AIrespondToCard(card);
}

/**
 * handle AI response to card play
 */
function AIrespondToCard(card) {
  if (card.effect == "sha") {
    if (opponentHasCard("shan")) {
      opponentPlayCard("shan");
    } else {
      GameStore.opponentTakeDamage(1);
      addLogMsg("Opponent took one damage");
    }
  }
}

/**
 * Whether the opponent has certain card
 */
function opponentHasCard(cardEffect) {
  console.log(GameStore)
  var opponentCards = _opponent.cards;

  for (var i = 0; i < opponentCards.length; i++) {
    if (opponentCards[i].effect == cardEffect) {
      return true;    
    }
  }

  return false;
}

/**
 * Opponents play card to repsonse to the player action
 */
function opponentPlayCard(cardEffect) {
  var opponentCards = _opponent.cards;

  for (var i = 0; i < opponentCards.length; i++) {
    if (opponentCards[i].effect == cardEffect) {
      opponentCards.splice(i, 1);
      addLogMsg("Opponent played Shan to response");
      break;
    }
  }
}

/**
 * Check whether the selected card can be played
 */
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

  opponentTakeDamage: function(damage) {
    _opponent.currentHP -= damage;
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
