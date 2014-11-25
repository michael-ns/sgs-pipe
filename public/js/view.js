var React = require('react');
var ReactPropTypes = React.PropTypes;
var $ = require('jquery');
var GameActions = require('./actions');
var GameStore = require('./store');

function getGameState() {
  return{
    allGameStates: GameStore.getAll()
  }
}

var Game = React.createClass({
  getInitialState:function(){
    return getGameState();
  },

  onClickStartGame:function(e){
    GameActions.onClickStartGame();
    this.forceUpdate();
  },

  onClickConfirm:function(e){
    GameActions.onClickConfirm();
    this.forceUpdate();
  },

  onClickEndTurn:function(e){
    this.state.allGameStates.isMyTurn = !this.state.allGameStates.isMyTurn
    this.updateTurnIndicator();
  },

  updateTurnIndicator:function(){
    var msg = this.state.allGameStates.isMyTurn
      ? "Your turn"
      : "Opponent's turn"
    ;

    $('.turn-indicator').text(msg);
  },

  render:function(){
    return (
      <div id="board-inner">

        <div className="log col-md-3">
          <div>Game Log</div>
          <div className="log-msg"></div>
        </div>

        <div className="game-area col-md-9">
          <div className="opponent-state row">Opponent: {this.state.allGameStates.opponent.currentHP}</div>
          <div className="opponent-cards row"><Player person={this.state.allGameStates.opponent} /></div>
          <div className="battle-field row"><button className="game-start-btn" onClick={this.onClickStartGame}>Start</button></div>
          <div className="player-cards row"><Player person={this.state.allGameStates.player} /></div>
          <div className="player-state row">Player: {this.state.allGameStates.player.currentHP}</div>
          <div className="row"><button className="confirm-btn" onClick={this.onClickConfirm}>Confirm</button></div>
        </div>

      </div>
      )
  }
});

var Card = React.createClass({
  onClickSelect:function(e){
    GameActions.onClickSelect(this.props.id);
  },

  render:function(){

    var card = <img className="card" src={'img/back.jpg'} height="140" width="100" />;

    if (this.props.isVisible) {
      card = <img className="card visible" id={this.props.id} data-card={this.props.name} onClick={this.onClickSelect} src={'img/' + this.props.name + '.jpg'} height="140" width="100" />;
    }

    return (
      <div className="col-md-2">
        {card}
      </div>
      )
  }
});

var Deck = React.createClass({
  getInitialState:function(){
    return {
      deckCards: this.props.cards
    }
  },

  render:function(){
    var deck = this.state.deckCards.cards.map(function(card){
      return <Card name={card.effect} id={card.cardID} isVisible={card.visible} cardID={card.cardID} />
    });

    return (
      <div>
        {deck}
      </div>
      )
  }
});

var Player = React.createClass({
  getInitialState:function(){
    return {
      person: this.props.person
    }
  },
  render:function(){
    var handCards = this.state.person.cards.map(function(card){
      return <Card name={card.effect} id={card.cardID} isVisible={card.visible} cardID={card.cardID} />
    });

    return (
      <div>
        {handCards}
      </div>
      )
  }
});

module.exports = Game;