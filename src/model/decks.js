const _cards = require('./cards.js');

class Deck {
  constructor() {
    this.cards = []
    this.discarded = []
  }

  copy(){
    let deck = new Deck();
    for (let i in this.cards){
        deck.cards.push(this.cards[i]);
    }
    for (let i in this.discarded){
        deck.discarded.push(this.discarded[i]);
    }
    return deck;
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

  damage(baseDamage) {
    let _damage = baseDamage;
    let card = this.draw();
    while (card.roller) {
      _damage = Math.max(card.damage(_damage, 0));
      card = this.draw();
    }
    return Math.max(card.damage(_damage), 0);
  }

  status(){
    let card = this.draw();
    while (card.roller) {
      card = this.draw();
    }
    if (card.reshuffle) {
      //console.log(card.print());
    }
    return card.reshuffle
  }

  addCard(card) {
    if (!(card instanceof _cards.Card)) {
      throw new Error('Can only add instance of card class!');
    }

    this.cards.push(card);
    this.shuffle();
  }

  removeCard(card) {
    const cardType = (typeof(card) === String) ? card : card.constructor.name;
    //console.log(cardType);
    for (let i = 0; i < this.cards.length; i++) {
      //console.log(this.cards[i].constructor.name);
      if (this.cards[i].constructor.name === cardType) {
        console.log(this.cards[i].print())
        this.cards.splice(i,1);
        return;
      }
    }
  }

  print() {
    let _deck = {}
    for (let i = 0; i < this.cards.length; i++) {
      const key = this.cards[i].print();
      if (_deck[key] === undefined) {
        _deck[key] = 0;
      }
      _deck[key]++;
    }
    console.log(_deck);
  }
}

class Default extends Deck {
  constructor() {
    super();

    this.addCard(new _cards.CriticalMiss());
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
