import range from '../range';
import {configInterface} from '../index';

class NumberGuesser {
  private readonly low: number;
  private readonly high: number;
  private readonly targetNumber: number;
  private readonly tries: number;
  protected range: number[];
  protected guesses: any[];

  constructor({low, high, targetNumber, tries}: configInterface){
    this.low = low;
    this.high = high;
    this.targetNumber = targetNumber;
    this.range = [...range(this.low, this.high)];
    this.tries = tries;
    this.guesses = [];
  }

  middleNumber = () => Math.floor((this.range[0] + this.range[this.range.length - 1]) / 2);

  checkGuess = (guess: number) => {
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

  makeGuess = (): number => 9;

  start = (): {status: string, tries: number} => {
    let results: string = '';
    while (results !== 'You Win!'){
      if (this.guesses.length < this.tries){
        results = this.checkGuess(this.makeGuess())
      } else {
        return {status: 'fail', tries: this.guesses.length}; // Check for how many tries you've used
      }
    }
    return {status: 'win', tries: this.guesses.length};
  }
}
export default NumberGuesser;
