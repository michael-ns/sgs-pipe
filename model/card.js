function Card(image, effect, cardType) {
  this.cardID = 1;
  this.image = image;
  this.effect = effect;
  this.cardType = cardType;
  this.visible = false;

  function setCardID(id) {
    this.cardID = id;
  };

  function setVisibility(isVisible) {
    this.visible = isVisible;
  };

  return {
    image: image,
    effect: effect,
    cardType: cardType,
    visible: this.visible,
    cardID: this.cardID,
    setCardID: setCardID,
    setVisibility: setVisibility
  }
}

module.exports = Card;