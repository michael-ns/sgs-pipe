function Card(image, effect, cardType) {
   this.image = image;
   this.effect = effect;
   this.cardType = cardType;

   return {
      image: image,
      effect: effect,
      cardType: cardType
   }
}

module.exports = Card;