function Card(image, effect, cardType) {
  this.cardID = 1;
  this.image = image;
  this.effect = effect;
  this.cardType = cardType;

  function setCardID(id) {
    this.cardID = id;
  };

  return {
    image: image,
    effect: effect,
    cardType: cardType,
    cardID: this.cardID,
    setCardID: setCardID
  }
}

module.exports = Card;