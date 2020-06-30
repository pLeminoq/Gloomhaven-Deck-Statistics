const _perks = require('./perks.js');

class Character {
  constructor() {
    this.perks = []
  }

  addPerk(perk, count) {
    this.perks.push({perk, count})
  }
}

class Scoundrel extends Character {
    constructor() {
      super()
      this.addPerk(new _perks.RemoveZeros(), 1);
      this.addPerk(new _perks.AddPlusOneRoller(), 2);
      this.addPerk(new _perks.ReplaceMinusTwo(), 1);
    }

}

module.exports.Scoundrel = Scoundrel;
