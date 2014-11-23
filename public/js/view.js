var React = require('react');
var $ = require('jquery');

var GameActions = require('./actions');

var Game = React.createClass({
  getInitialState:function(){
    return {
      game: game,
      deckCards: deck,
      player: michael,
      opponent: nancy
    }
  },

  onClickConfirm:function(e){
    GameActions.onClickConfirm(this.state.player, this.state.opponent);
    this.forceUpdate();
  },

  onClickEndTurn:function(e){
    GameActions.onClickEndTurn(this.state.game);
    this.forceUpdate();
  },

  render:function(){
    return (
      <table>
        <tr>
          <td><h2>Deck s</h2></td>
          <td><h2>Player: {this.state.player.currentHP}</h2></td> 
          <td><h2>Opponent: {this.state.opponent.currentHP}</h2></td>
        </tr>
        <tr>
          <td><Deck cards={this.state.deckCards} /></td>
          <PlayerList player={this.state.player} opponent={this.state.opponent} />
        </tr>
        <tr>
           <td><h2>{this.state.game.printTurnIndicator()}</h2></td>
           <td><button className="confirm-btn" onClick={this.onClickConfirm}>Confirm</button></td>
           <td><button className="end-turn-btn" onClick={this.onClickEndTurn}>End Turn</button></td>
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
        <p className="card" id={this.props.id} onClick={this.onClickSelect}>{this.props.name} - ({this.props.type})</p>
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