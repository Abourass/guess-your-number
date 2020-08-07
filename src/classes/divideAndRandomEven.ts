import range from '../range';
import NumberGuesser from './NumberGuesser';

class DivideAndRandomEven extends NumberGuesser {
  isOdd = (num: number):boolean => num % 2 !== 0;

  makeGuess = ():number => {
    if (this.guesses.length > 0 ){
      const lastGuess: {response: 'Lower' | 'Higher', guess: number} = this.guesses[this.guesses.length - 1]
      const lastRange: number[] = this.range;

      if (lastGuess.response === 'Lower') this.range = [...range(lastRange[0], lastGuess.guess)];
      if (lastGuess.response === 'Higher') this.range = [...range(lastGuess.guess, lastRange[lastRange.length - 1])];
    }
    let newGuess: string | number;
    if (this.guesses.length === 0){
      newGuess = this.middleNumber();
    } else {
      if (this.isOdd(this.guesses.length)){
        while (typeof newGuess !== 'number') {
          newGuess = this.checkNumberGen(this.range[Math.floor(Math.random() * (this.range.length + 1))]);
        }
      } else {
        newGuess = this.middleNumber();
      }
    }
    return newGuess
  };

  checkNumberGen = (newGuess: number): string | number => {
    for (let i: number = 0; i < this.guesses.length; i++){
      const guessHistory = this.guesses[i];
      if (guessHistory.response === 'Lower' && newGuess > guessHistory.guess) return 'failed';
      if (guessHistory.response === 'Higher' && newGuess < guessHistory.guess) return 'failed';
      if (guessHistory.guess === newGuess) return 'failed';
    }
    return newGuess
  };
}
export default DivideAndRandomEven;


