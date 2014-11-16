function Card(image, effect, cardType, id) {
  this.cardID = id;
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
    setCardID: setCardID
  }
}

module.exports = Card;