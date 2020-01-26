const range = require('../range');
const NumberGuesser = require('./NumberGuesser');

class DivideAndRandom extends NumberGuesser {
  isOdd = num => num % 2 !== 0;

  makeGuess = () => {
    if (this.guesses.length > 0 ){
      const lastGuess = this.guesses[this.guesses.length -1 ], lastRange = this.range;
      if (lastGuess.response === 'Lower'){
        this.range = [...range(lastRange[0], lastGuess.guess)];
      }
      if (lastGuess.response === 'Higher'){
        this.range = [...range(lastGuess.guess, lastRange[lastRange.length - 1])];
      }
    }
    let newGuess;
    if (this.guesses.length === 0){
      newGuess = this.middleNumber();
    } else {
      if (this.isOdd(this.guesses.length)){
        newGuess = this.middleNumber();
      } else {
        while (typeof newGuess !== 'number') {
          newGuess = this.checkNumberGen(this.range[Math.floor(Math.random() * (this.range.length + 1))]);
        }
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
}
module.exports = DivideAndRandom;


