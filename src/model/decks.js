const _cards = require('./cards.js');

class Deck {
  constructor() {
    this.cards = []
    this.discarded = []
  }

  shuffle() {
    // shuffle an array in place according to the fisher shuffle:
    // https://en.wikipedia.org/wiki/Fisher-Yates_shuffle
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  restore() {
    while (this.discarded.length > 0) {
      this.cards.push(this.discarded.pop());
    }
    this.shuffle();
  }

  draw() {
    const card = this.cards.pop();

    if (!card.remove) {
      this.discarded.push(card);
    }

    if (card.reshuffle || this.cards.length == 0) {
      this.restore();
    }

    return card;
  }

  addCard(card) {
    if (!(card instanceof _cards.Card)) {
      throw new Error('Can only add instance of card class!');
    }

    this.cards.push(card);
    this.shuffle();
  }

  removeCard(card) {
    console.log(typeof(card) + ' = ' + (typeof(card) === 'string'));
    const cardType = (typeof(card) === String) ? card : card.constructor.name;
    console.log('Remove card by type: ' + cardType);
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].constructor.name === cardType) {
        console.log('Found card: ' + i);
        this.cards.pop(i);
        return;
      } else {
        console.log('Does not match type: ' + this.cards[i].constructor.name);
      }
    }
  }

  print() {
    for (let i = 0; i < this.cards.length; i++) {
      console.log(this.cards[i].print());
    }
  }
}

class Default extends Deck {
  constructor() {
    super();

    this.addCard(new _cards.CriticalMiss());
    this.addCard(new _cards.CriticalHit());
    this.addCard(new _cards.CriticalHit());
    this.addCard(new _cards.MinusTwo());
    this.addCard(new _cards.PlusTwo());
    for (let i = 0; i < 5; i++) { this.addCard(new _cards.MinusOne());}
    for (let i = 0; i < 6; i++) { this.addCard(new _cards.Zero());}
    for (let i = 0; i < 5; i++) { this.addCard(new _cards.PlusOne());}
  }
}

module.exports.Deck = Deck;
module.exports.Default = Default;
