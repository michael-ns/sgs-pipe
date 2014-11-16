var Game = React.createClass({
  getInitialState:function(){
    return {
      deckCards: this.props.cards,
      player: this.props.player,
      opponent: this.props.opponent
    }
  },

  render:function(){
    return (
      <table>
        <tr>
          <td><h2>Deck</h2></td>
          <td><h2>Player</h2></td> 
          <td><h2>Opponent</h2></td>
        </tr>
        <tr>
          <td><Deck cards={this.state.deckCards} /></td>
          <PlayerList player={this.state.player} opponent={this.state.opponent} />
        </tr>
      </table>
      )
  }
});

var Card = React.createClass({
  render:function(){
    return (
      <div>
        <p>{this.props.name} - ({this.props.type})</p>
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
      return <Card name={card.effect} type={card.cardType} />
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

React.renderComponent(<Game cards={deck} player={michael} opponent={nancy} />, document.getElementById('board'))