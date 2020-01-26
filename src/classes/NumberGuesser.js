const range = require('../range');

class NumberGuesser {
  constructor({low, high, targetNumber, tries} = {}){
    this.low = low;
    this.high = high;
    this.targetNumber = targetNumber;
    this.range = [...range(this.low, this.high)];
    this.tries = tries;
    this.guesses = [];
  }
}
module.exports = NumberGuesser;
