var Game = React.createClass({
  getInitialState:function(){
    return {
      deckCards: this.props.cards,
      player: this.props.player,
      opponent: this.props.opponent
    }
  },

  onClickConfirm:function(e){
    var selectedCardID = $(".selected").attr("id");
    selectedCardID = parseInt(selectedCardID);

    var selectedCard = this.props.player.playCard(selectedCardID);

    this.settleCardEffect(selectedCard);

    $(".selected").removeClass("selected").css("color", "black");

    this.forceUpdate();
  },

  settleCardEffect:function(card){
    if(card.effect == "sha") {
      this.state.opponent.currentHP -= 1;
    }
  },

  render:function(){
    return (
      <table>
        <tr>
          <td><h2>Deck</h2></td>
          <td><h2>Player: {this.state.player.currentHP}</h2></td> 
          <td><h2>Opponent: {this.state.opponent.currentHP}</h2></td>
        </tr>
        <tr>
          <td><Deck cards={this.state.deckCards} /></td>
          <PlayerList player={this.state.player} opponent={this.state.opponent} />
        </tr>
        <tr>
           <td></td>
           <td><button className="confirm-btn" onClick={this.onClickConfirm}>Confirm</button></td>
           <td></td>
        </tr>
      </table>
      )
  }
});

var Card = React.createClass({
  onClickSelect:function(e){
    $(".card").css("color", "black");
    $("#" + this.props.id).css("color", "red").addClass("selected");
    $(".confirm-btn").css("display", "block");
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

React.renderComponent(<Game cards={deck} player={michael} opponent={nancy} />, document.getElementById('board'))