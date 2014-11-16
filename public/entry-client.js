//at the start of the game, both players draw cards
var startCardCount = 4;

for (var i=0; i < startCardCount; i++) michael.putInHand(deck.draw());
for (var i=0; i < startCardCount; i++) nancy.putInHand(deck.draw());

console.log(michael)
console.log(nancy)
console.log(deck)