var Game = React.createClass({displayName: 'Game',
  getInitialState:function(){
    return {
      game: this.props.game,
      deckCards: this.props.cards,
      player: this.props.player,
      opponent: this.props.opponent
    }
  },

  onClickConfirm:function(e){
    var selectedCardID = $(".selected").attr("id");
    selectedCardID = parseInt(selectedCardID);

    var selectedCard = this.state.player.playCard(selectedCardID);

    this.settleCardEffect(selectedCard);

    $(".selected").removeClass("selected").css("color", "black");

    this.forceUpdate();
  },

  onClickEndTurn:function(e){
    alert("break point");
    this.state.game.switchTurn();
    alert("break point 2");
    this.forceUpdate();
  },

  settleCardEffect:function(card){
    if(card.effect == "sha") {
      this.state.opponent.currentHP -= 1;
    }
  },

  render:function(){
    return (
      React.createElement("table", null, 
        React.createElement("tr", null, 
          React.createElement("td", null, React.createElement("h2", null, "Deck")), 
          React.createElement("td", null, React.createElement("h2", null, "Player: ", this.state.player.currentHP)), 
          React.createElement("td", null, React.createElement("h2", null, "Opponent: ", this.state.opponent.currentHP))
        ), 
        React.createElement("tr", null, 
          React.createElement("td", null, React.createElement(Deck, {cards: this.state.deckCards})), 
          React.createElement(PlayerList, {player: this.state.player, opponent: this.state.opponent})
        ), 
        React.createElement("tr", null, 
           React.createElement("td", null, React.createElement("h2", null, this.state.game.printTurnIndicator())), 
           React.createElement("td", null, React.createElement("button", {className: "confirm-btn", onClick: this.onClickConfirm}, "Confirm")), 
           React.createElement("td", null, React.createElement("button", {className: "end-turn-btn", onClick: this.onClickEndTurn}, "End Turn"))
        )
      )
      )
  }
});

var Card = React.createClass({displayName: 'Card',
  onClickSelect:function(e){
    $(".card").css("color", "black");
    $("#" + this.props.id).css("color", "red").addClass("selected");
    $(".confirm-btn").css("display", "block");
  },

  render:function(){
    return (
      React.createElement("div", null, 
        React.createElement("p", {className: "card", id: this.props.id, onClick: this.onClickSelect}, this.props.name, " - (", this.props.type, ")")
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
      return React.createElement(Card, {name: card.effect, type: card.cardType, id: card.cardID})
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

React.renderComponent(React.createElement(Game, {game: game, cards: deck, player: michael, opponent: nancy}), document.getElementById('board'))