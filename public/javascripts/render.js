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

var Game = React.createClass({
  getInitialState:function(){
    return {
      deckCards: this.props.cards,
      handCards: this.props.handCards
    }
  },

/* 
  onClickDraw:function(event){
    var currentCard = this.state.deckCards[0];
    this.state.deckCards.splice(0, 1);
    this.state.handCards.push(currentCard);
    this.forceUpdate();
    this.setState();
  },
*/

  render:function(){
    return (
      <div>
        <h1>This is Michael SGS</h1>
        <h2>Deck:</h2>
        <Deck cards={this.state.deckCards} />
        <p>'======================================='</p>
        <PlayerList handCards={this.state.handCards} />
      </div>
      )
  }
});

var Card = React.createClass({
  render:function(){
    return (
      <div>
        <h2 id={'card' + this.props.id}>{this.props.name} - ({this.props.type})</h2>
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
    var deck = this.state.deckCards.map(function(card){
      return <Card id={card.id} name={card.name} type={card.type} />
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
      handCards: this.props.handCards
    }
  },
  render:function(){
    var handCards = this.state.handCards.map(function(card){
      return <Card id={card.id} name={card.name} type={card.type} />
    });

    return (
      <div>
        <h2>Player hand: </h2>
        {handCards}
      </div>
      )
  }
});

var PlayerList = React.createClass({
  getInitialState:function(){
    return {
      handCards: this.props.handCards
    }
  },

  render:function(){
    var players = this.state.handCards.map(function(player){
      return <Player handCards={player} />
    });

    return (
      <div>
        {players}
      </div>
      )
  }
});

React.renderComponent(<Game cards={cards} handCards={handCards} />, document.getElementById('board'))