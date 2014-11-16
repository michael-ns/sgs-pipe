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
      React.createElement("table", null, 
        React.createElement("tr", null, 
          React.createElement("td", null, "Deck"), 
          React.createElement("td", null, "Player"), 
          React.createElement("td", null, "Opponent")
        ), 
        React.createElement("tr", null, 
          React.createElement("td", null, React.createElement(Deck, {cards: this.state.deckCards})), 
          React.createElement(PlayerList, {player: this.state.player, opponent: this.state.opponent})
        )
      )
      )
  }
});

var Card = React.createClass({displayName: 'Card',
  render:function(){
    return (
      React.createElement("div", null, 
        React.createElement("p", null, this.props.name, " - (", this.props.type, ")")
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