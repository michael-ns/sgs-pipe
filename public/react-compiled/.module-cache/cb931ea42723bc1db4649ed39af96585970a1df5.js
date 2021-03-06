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
      React.createElement("h1", null, "This is My SGS MOD")

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
      return React.createElement(Card, {name: card.effect, type: card.cardType, cardID: card.cardID})
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
      React.createElement("td", null, 
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