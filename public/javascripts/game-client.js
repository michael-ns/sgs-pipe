(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"c:\\pipeline\\model\\game.js":[function(require,module,exports){
var game = {
  turnIndicator: "My turn: YES",
  turnCount: "Turn count: ",
  myHP: 3,
  opponentHP: 3,
  myHand: [],
  opponentHand: [],
  gameObjects: [],

  getTurnIndicator: function() {
    return this.turnIndicator;
  }
}

module.exports = game;
},{}],"c:\\pipeline\\public\\javascripts\\main.js":[function(require,module,exports){
game = require('./../../model/game');

console.log(game)
},{"./../../model/game":"c:\\pipeline\\model\\game.js"}]},{},["c:\\pipeline\\public\\javascripts\\main.js"]);
