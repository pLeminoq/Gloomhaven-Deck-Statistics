const _cards = require('./cards.js');
const _deck = require('./decks.js');

class Perk {
  constructor(){
    this.addCards = []
    this.removeCards = []
  }

  activate(deck){
      if (!(deck instanceof _deck.Deck)){
        throw new Error('Expected parameter is of class deck!');
      }

      for (let i in this.addCards) {
        deck.addCard(this.addCards[i])
      }

      for (let i in this.removeCards) {
        deck.removeCard(this.removeCards[i])
      }
  }

  deactivate(deck){
    if (!(deck instanceof _deck.Deck)){
      throw new Error('Expected parameter is of class deck!');
    }

    for (let i in this.addCards) {
      deck.removeCard(this.addCards[i]);
    }

    for (let i in this.removeCards) {
      deck.addCard(this.removeCards[i]);
    }

  }
}

class RemoveZeros extends Perk{
  constructor() {
    super();
    for (let i=0; i<4; i++){
      this.removeCards.push(new _cards.Zero());
    }
  }
}

class AddPlusOneRoller extends Perk{
  constructor() {
    super();
    for (let i=0; i<2; i++){
      this.addCards.push(new _cards.PlusOneRoller());
    }
  }
}

class ReplaceMinusTwo extends Perk{
  constructor() {
    super();
    this.addCards.push(new _cards.Zero());
    this.removeCards.push(new _cards.MinusTwo());
  }
}

module.exports.ReplaceMinusTwo = ReplaceMinusTwo;
module.exports.RemoveZeros = RemoveZeros;
module.exports.AddPlusOneRoller = AddPlusOneRoller;
