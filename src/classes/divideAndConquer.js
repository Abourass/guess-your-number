const range = require('../range');
const NumberGuesser = require('./NumberGuesser');

class divideAndConquer extends NumberGuesser {
  middleNumber = () => Math.floor((this.range[0] + this.range[this.range.length - 1]) / 2);

  checkGuess = (guess) => {
    let response;
    if (guess > this.targetNumber){
      response = 'Lower';
      this.guesses.push({guess: guess, response: response, low: this.range[0], high: this.range[this.range.length - 1]});
    }
    if (guess < this.targetNumber){
      response = 'Higher';
      this.guesses.push({guess: guess, response: response, low: this.range[0], high: this.range[this.range.length - 1]});
    }
    if (guess === this.targetNumber){
      response = `You Win!`;
      this.guesses.push({guess: guess, response: response, low: this.range[0], high: this.range[this.range.length - 1]});
    }
    return response;
  };

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

  start = () => {
    if (this.guesses.length < this.tries){
      let results = '';
      while (results !== 'You Win!'){
        results = this.checkGuess(this.makeGuess())
      }
      return results + ` Guessed in ${this.guesses.length} tries!`;
    } else {
      return {result: `Failed to guess within ${this.tries} guesses`}; // Check for how many tries you've used
    }
  }
}
module.exports = divideAndConquer;


