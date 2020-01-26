const range = require('../range');
const NumberGuesser = require('./NumberGuesser');

class randomGuessing extends NumberGuesser {
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
    let newGuess;
    if (this.range.length === 0){
      newGuess = this.middleNumber();
    } else {
      while (typeof newGuess !== 'number') {
        newGuess = this.checkNumberGen(this.range[Math.floor(Math.random() * (this.range.length + 1))]);
      }
    }
    return newGuess
  };

  checkNumberGen = (newGuess) => {
    for (let i = 0; i < this.guesses.length; i++){
      const guessHistory = this.guesses[i];
      if (guessHistory.response === 'Lower' && newGuess > guessHistory.guess){ return 'failed'; }
      if (guessHistory.response === 'Higher' && newGuess < guessHistory.guess){ return 'failed'; }
      if (guessHistory.guess === newGuess){ return 'failed'; }
    }
    return newGuess
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
module.exports = randomGuessing;


