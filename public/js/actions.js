var GameDispatcher = require('./dispatcher');
var GameConstants = require('./constants');

var GameActions = {

  /**
  * Handle select when player clicks on a card
  */
  onClickSelect: function(cardID) {
    GameDispatcher.handleViewAction({
      actionType: GameConstants.CARD_SELECT,
      id: cardID
    });
  },

  onClickConfirm: function() {
    GameDispatcher.handleViewAction({
      actionType: GameConstants.ONCLICK_CONFIRM,
    });
  }
};

module.exports = GameActions;
