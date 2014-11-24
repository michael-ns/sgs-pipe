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
      <table>
        <tr>
          <td><h2>Deck</h2></td>
          <td><h2>Player: {this.state.allGameStates.player.currentHP}</h2></td> 
          <td><h2>Opponent: {this.state.allGameStates.opponent.currentHP}</h2></td>
        </tr>
        <tr>
          <td><Deck cards={this.state.allGameStates.deck} /></td>
          <PlayerList player={this.state.allGameStates.player} opponent={this.state.allGameStates.opponent} />
        </tr>
        <tr>
           <td><h2 className="turn-indicator">Your Turn</h2></td>
           <td><button className="confirm-btn" onClick={this.onClickConfirm}>Confirm</button></td>
           <td><button className="end-turn-btn" onClick={this.onClickEndTurn}>End Turn</button></td>
        </tr>
        <tr>
           <td><button className="game-start-btn" onClick={this.onClickStartGame}>Start</button></td>
        </tr>
      </table>
      )
  }
});

var Card = React.createClass({
  onClickSelect:function(e){
    GameActions.onClickSelect(this.props.id);
  },

  render:function(){
    return (
      <div>
        <p className="card" id={this.props.id} onClick={this.onClickSelect}>{this.props.name}</p>
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
      return <Card name={card.effect} type={card.cardType} cardID={card.cardID} />
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
      return <Card name={card.effect} type={card.cardType} id={card.cardID} />
    });

    return (
      <td>
        {handCards}
      </td>
      )
  }
});

var PlayerList = React.createClass({
  getInitialState:function(){
    return {
      player: this.props.player,
      opponent: this.props.opponent
    }
  },

  render:function(){
    return (
      <div>
        <Player person={this.state.player} />
        <Player person={this.state.opponent} />
      </div>
      )
  }
});

module.exports = Game;