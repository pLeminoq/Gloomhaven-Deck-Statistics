class Card {
  constructor(value, reshuffle, roller, remove, status) {
    this.value = value;
    this.roller = (roller !== undefined) ? roller : false;
    this.reshuffle = (reshuffle !== undefined) ? reshuffle : false;
    this.remove = (remove !== undefined) ? remove : false;
    this.status = (status !== undefined) ? status : false;
  }

  damage(baseDamage) {
    return baseDamage + this.value;
  }

  print() {
    let res = '';
    if (this.value > 0) {
      res += '+';
    }
    if (this.roller) {
      return res + this.value + 'roller'
    }
    return res + this.value;
  }
}

class CriticalHit extends Card {
  constructor() {
    super(0, true);
  }

  damage(baseDamage) {
    return baseDamage * 2;
  }

  print() {
    return 'CRIT'
  }
}

class CriticalMiss extends Card {
  constructor() {
    super(0, true);
  }

  damage(baseDamage) {
    return baseDamage * 0;
  }

  print() {
    return 'MISS'
  }
}

class MinusTwo extends Card {
  constructor() {
    super(-2);
  }
}

class MinusOne extends Card {
  constructor() {
    super(-1);
  }
}

class Zero extends Card {
  constructor() {
    super(0);
  }
}

class PlusOne extends Card {
  constructor() {
    super(1);
  }
}

class PlusOneRoller extends Card {
  constructor() {
    super(1, false, true);
  }
}

class PlusTwo extends Card {
  constructor() {
    super(2);
  }
}

module.exports.Card = Card;
module.exports.CriticalHit = CriticalHit;
module.exports.CriticalMiss = CriticalMiss;
module.exports.MinusTwo = MinusTwo;
module.exports.MinusOne = MinusOne;
module.exports.Zero = Zero;
module.exports.PlusOne = PlusOne;
module.exports.PlusTwo = PlusTwo;
module.exports.PlusOneRoller = PlusOneRoller;
