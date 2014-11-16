/*
var cards = [
  {id: 1, name: 'sha', type: 'basic'},
  {id: 2, name: 'sha', type: 'basic'},
  {id: 3, name: 'sha', type: 'basic'},
  {id: 4, name: 'shan', type: 'basic'},
  {id: 5, name: 'shan', type: 'basic'},
  {id: 6, name: 'shan', type: 'basic'},
  {id: 7, name: 'tao', type: 'basic'}
]

var playerOneHand = [
  {id: 8, name: 'sha', type: 'basic'},
  {id: 9, name: 'tao', type: 'basic'}
]

var playerTwoHand = [
  {id: 8, name: 'shan', type: 'basic'},
  {id: 9, name: 'shan', type: 'basic'}
]

var handCards = []

handCards.push(playerOneHand)
handCards.push(playerTwoHand)

*/

var Game = React.createClass({displayName: 'Game',
  getInitialState:function(){
    return {
      deckCards: this.props.cards,
      player: this.props.player,
      opponent: this.props.opponent
    }
  },

  render:function(){
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, "This is My SGS MOD"), 
        React.createElement("h2", null, "Deck:"), 
        React.createElement(Deck, {cards: this.state.deckCards}), 
        React.createElement("p", null, "'======================================='"), 
        React.createElement(PlayerList, {player: this.state.player, opponent: this.state.opponent})
      )
      )
  }
});

var Card = React.createClass({displayName: 'Card',
  render:function(){
    return (
      React.createElement("div", null, 
        React.createElement("h2", null, this.props.name, " - (", this.props.type, ")")
      )
      )
  }
});

var Deck = React.createClass({displayName: 'Deck',
  getInitialState:function(){
    return {
      deckCards: this.props.cards
    }
  },

  render:function(){
    var deck = this.state.deckCards.cards.map(function(card){
      return React.createElement(Card, {name: card.effect, type: card.cardType})
    });

    return (
      React.createElement("div", null, 
        deck
      )
      )
  }
});

var Player = React.createClass({displayName: 'Player',
  getInitialState:function(){
    return {
      person: this.props.person
    }
  },
  render:function(){
    var handCards = this.state.person.cards.map(function(card){
      return React.createElement(Card, {name: card.effect, type: card.cardType})
    });

    return (
      React.createElement("div", null, 
        React.createElement("h2", null, this.state.person.playerName, ": "), 
        handCards
      )
      )
  }
});

var PlayerList = React.createClass({displayName: 'PlayerList',
  getInitialState:function(){
    return {
      player: this.props.player,
      opponent: this.props.opponent
    }
  },

  render:function(){
    return (
      React.createElement("div", null, 
        React.createElement(Player, {person: this.state.player}), 
        React.createElement(Player, {person: this.state.opponent})
      )
      )
  }
});

React.renderComponent(React.createElement(Game, {cards: deck, player: michael, opponent: nancy}), document.getElementById('board'))