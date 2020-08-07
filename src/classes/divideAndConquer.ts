import range from '../range';
import NumberGuesser from './NumberGuesser';

class DivideAndConquer extends NumberGuesser {
  makeGuess = (): number => {
    if (this.guesses.length > 0 ){
      const lastGuess: {response: 'Lower' | 'Higher', guess: number} = this.guesses[this.guesses.length -1 ];
      const lastRange: number[] = this.range;

      if (lastGuess.response === 'Lower') this.range = [...range(lastRange[0], lastGuess.guess)];
      if (lastGuess.response === 'Higher') this.range = [...range(lastGuess.guess, lastRange[lastRange.length - 1])];
    }
    return this.middleNumber()
  };
}
export default DivideAndConquer;


