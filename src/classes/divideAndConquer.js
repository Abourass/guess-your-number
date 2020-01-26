const range = require('../range');
const NumberGuesser = require('./NumberGuesser');

class DivideAndConquer extends NumberGuesser {
  makeGuess = () => {
    if (this.guesses.length > 0 ){
      const lastGuess = this.guesses[this.guesses.length -1 ],
        lastRange = this.range;
      if (lastGuess.response === 'Lower'){
        this.range = [...range(lastRange[0], lastGuess.guess)];
      }
      if (lastGuess.response === 'Higher'){
        this.range = [...range(lastGuess.guess, lastRange[lastRange.length - 1])];
      }
    }
    return this.middleNumber()
  };
}
module.exports = DivideAndConquer;


