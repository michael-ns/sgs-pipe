(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"c:\\pipeline\\model\\card.js":[function(require,module,exports){
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
},{}],"c:\\pipeline\\model\\deck.js":[function(require,module,exports){
var Card = require('./card')

var deck = {
	cards: [],

	shuffle: function() {
		var currentIndex = this.cards.length, temporaryValue, randomIndex ;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = this.cards[currentIndex];
			this.cards[currentIndex] = this.cards[randomIndex];
			this.cards[randomIndex] = temporaryValue;
		}
	},

	draw: function() {
		var card = this.cards[0];
		this.cards.splice(1, 1);

		return card;
	}
};

module.exports = deck;
},{"./card":"c:\\pipeline\\model\\card.js"}],"c:\\pipeline\\model\\game.js":[function(require,module,exports){
var game = {
  turnIndicator: "My turn: YES",
  turnCount: "Turn count: ",
  myHP: 3,
  opponentHP: 3,

  getTurnIndicator: function() {
    return this.turnIndicator;
  }
}

module.exports = game;
},{}],"c:\\pipeline\\model\\player.js":[function(require,module,exports){
var Card = require('./card')
var Deck = require('./deck')

var player = {
	hp: 3,
	cards: [],

	putInHand: function(card) {
		this.cards.push(card);
	},

	playCard: function(cardIndex) {
		this.cards.splice(cardIndex, 1);
	}
}

module.exports = player;
},{"./card":"c:\\pipeline\\model\\card.js","./deck":"c:\\pipeline\\model\\deck.js"}],"c:\\pipeline\\node_modules\\cloneextend\\index.js":[function(require,module,exports){
function replace(a, b)
{
 if (!b)
 {
  return a;
 }
 var key;
 for (key in b)
 {
  if(b.hasOwnProperty(key))
  { 
   a[key] = b[key];
  }
 }
   
 return a;
} exports.replace=replace;

function add(a, b)
{
 if (!b)
 {
  return a;
 }
 var key;
 for (key in b)
 {
  if(b.hasOwnProperty(key))
  { 
   if(typeof a[key] === 'undefined' ||  a[key]===null)
   {
    a[key] = b[key];
   }
  }
 }
 return a;
} exports.add=add;


function extend(a, b, context, newobjs, aparent, aname, haveaparent) // context is anti circular references mechanism
{
 if (a==b){ return a;}
 if (!b)  { return a;}
 
 var key, clean_context=false, return_sublevel=false,b_pos;
 if(!haveaparent){ aparent={'a':a}; aname='a'; }
 if(!context){clean_context=true;context=[];newobjs=[];}
 b_pos=context.indexOf(b);
 if( b_pos==-1 ) {context.push(b);newobjs.push([aparent, aname]);} else { return newobjs[b_pos][0][ newobjs[b_pos][1] ]; }

 for (key in b)
 {
   if(b.hasOwnProperty(key))
   { 
   if(typeof a[key] === 'undefined')
   {   
    if(typeof b[key] === 'object')
    {
     if( b[key] instanceof Array ) // http://javascript.crockford.com/remedial.html
      {a[key] = extend([], b[key],context,newobjs,a,key,true);}
     else if(b[key]===null)
      {a[key] = null;}
     else if( b[key] instanceof Date )
      { a[key]= new b[key].constructor();a[key].setTime(b[key].getTime());  }
     else
      { a[key] = extend({}, b[key],context,newobjs,a,key,true); /*a[key].constructor = b[key].constructor;  a[key].prototype = b[key].prototype;*/ }
    }
    else
    {  a[key] = b[key]; }
   }
   else if(typeof a[key] === 'object' && a[key] !== null)
   {  a[key] = extend(a[key], b[key],context,newobjs,a,key,true); /*a[key].constructor = b[key].constructor;  a[key].prototype = b[key].prototype;*/ }
   else  
   {  a[key] = b[key]; }
  }
 }
 if(clean_context) {context=null;newobjs=null;}
 if(!haveaparent)
 {
  aparent=null;
  return a;
 }
 if(typeof a === 'object' && !(a instanceof Array) )
 {
  /*a.constructor = b.constructor;
  a.prototype   = b.prototype*/;
 } 
 return a;
} exports.extend=extend;

function extenduptolevel(a, b, levels, context, newobjs, aparent, aname, haveaparent)
{
 if (a==b){ return a;}
 if (!b){ return a;}

 var key, clean_context=false, return_sublevel=false;
 if(!haveaparent){ aparent={'a':a}; aname='a'; }
 if(!context){clean_context=true;context=[];newobjs=[];}
 b_pos=context.indexOf(b);
 if( b_pos==-1 ) {context.push(b);newobjs.push([aparent, aname]);} else { return newobjs[b_pos][0][ newobjs[b_pos][1] ]; }
 
 for (key in b)
 {
  if(b.hasOwnProperty(key))
  { 
   if(typeof a[key] === 'undefined')
   {
    if(typeof b[key] === 'object' && levels>0)
    {
     if( b[key] instanceof Array ) // http://javascript.crockford.com/remedial.html
     { a[key] = extenduptolevel([], b[key],levels-1,context,newobjs,a,key,true); }
     else if(b[key]===null)
     { a[key] = null; }
     else if( b[key] instanceof Date )
     { a[key]= new b[key].constructor();a[key].setTime(b[key].getTime());  }
     else
     { a[key] = extenduptolevel({}, b[key],levels-1,context,newobjs,a,key,true); }
    }
    else
    {  a[key] = b[key]; }
   }
   else if(typeof a[key] === 'object' && a[key] !== null && levels>0)
   {  a[key] = extenduptolevel(a[key], b[key],levels-1,context,newobjs,a,key,true); }
   else  
   {  a[key] = b[key]; }
  }
 }
 if(clean_context) {context=null;newobjs=null;}

 if(!haveaparent)
 {
  aparent=null;
  return a;
 }
 if(typeof a === 'object' && !(a instanceof Array) )
 {
  /*a.constructor = b.constructor;
  a.prototype   = b.prototype;*/
 } 
 return a;
} exports.extenduptolevel=extenduptolevel;

function clone(obj)
{
 if (typeof obj === 'object')
 {
  if (obj ===null ) { return null; }
  if (obj instanceof Array )
  { return extend([], obj); }
  else if( obj instanceof Date )
  {
   var t= new obj.constructor();
   t.setTime(obj.getTime());
   return t;
  }
  else
  { return extend({}, obj); }
 }
 return obj;
} exports.clone=clone;

function cloneextend(obj,exteddata)
{
 if (typeof obj === 'object')
 {
  if (obj ===null ) { return null; }
  return extend(clone(obj),exteddata);
 }
 return obj;
} exports.cloneextend=cloneextend;


function cloneuptolevel(obj,level) // clone only numlevels levels other levels leave references
{
 if (typeof obj === 'object')
 {
  if (obj ===null ) { return null; }
  if (obj instanceof Array ) { return extenduptolevel([], obj,level); }
  return extenduptolevel({}, obj,level);
 }
 return obj;
} exports.cloneuptolevel=cloneuptolevel;

function foreach(object, block, context)
{
 if (object)
 {
  if (typeof object === "object" && object instanceof Array)
   return object.forEach(object, block, context)
  else //if (typeof object === "object") // or (object instanceof Function)...
  {
   if(object)
   for (var key in object)
   {
    if(object.hasOwnProperty(key))
    {
     if(block.call(context, object[key], key, object)===false)break;
    }
   }
  }  
 }
} exports.foreach=foreach;

/*
 hasbugs and useless, yet interesting maybe developed later for dot pathed object transformation:
 
 {
  'foo.bar':'bluebar',
  'foo.color':'blue'
 }
 
 transforemed to
 
 {
  foo:
  {
   bar:'bluebar',
   color:'blue'
  }
 }
 
 like:
 
 var config={};
 cloneextend.dotpath(config,{
  'foo.bar':'bluebar',
  'foo.color':'blue'
 })
 
 //
 function dotpath(data,dotkeys,preserve)
 {
      if(!preserve)preserve=false;
      var create=!preserve;
      if(create) if(!data) data={};
      var keys= dotkeys.split("."),value=data;
      for (var i=0;i<keys.length;i++)
      {
          if(!value[keys[i]]) //should you create one?
          {
              if(create)
                  value[keys[i]]={};
              else
                  return undefined;
          }
          value = value[keys[i]];
      }
      return value;
 }
 */
},{}],"c:\\pipeline\\public\\javascripts\\main.js":[function(require,module,exports){
var ce = require('cloneextend');
game = require('./../../model/game');
Card = require('./../../model/card');
deck = require('./../../model/deck');
player = require('./../../model/player');

game = require('./../../model/game');

//creat players
michael = ce.clone(player);
michael.hp = 4;
nancy = ce.clone(player);

// get game objects ready
sha = new Card('sha.jpg', 'sha', 'basic');
shan = new Card('shan.jpg', 'shan', 'basic');
tao = new Card('tao.jpg', 'tao', 'basic');

//set cards count
shaCount = 8;
shanCount = 8;
taoCount = 3;

//insert cards into the deck
for(i = 0; i < shaCount; i++) {
	deck.cards.push(sha);
}

for(i = 0; i < shanCount; i++) {
	deck.cards.push(shan);
}

for(i = 0; i < taoCount; i++) {
	deck.cards.push(tao);
}

deck.shuffle();


},{"./../../model/card":"c:\\pipeline\\model\\card.js","./../../model/deck":"c:\\pipeline\\model\\deck.js","./../../model/game":"c:\\pipeline\\model\\game.js","./../../model/player":"c:\\pipeline\\model\\player.js","cloneextend":"c:\\pipeline\\node_modules\\cloneextend\\index.js"}]},{},["c:\\pipeline\\public\\javascripts\\main.js"]);
