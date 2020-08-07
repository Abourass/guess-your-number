import DivideAndConquer from './classes/divideAndConquer'
import RandomGuessing from './classes/randomGuessing'
import DivideAndRandomOdd from './classes/divideAndRandomOdd'
import DivideAndRandomEven from './classes/divideAndRandomEven'

export declare interface configInterface {
  high: number,
  low: number,
  tries: number
  targetNumber: number
}

declare interface resultInterface {
  sumOfTries: number;
  sumOfTime: number;
  timer: number,
  result: {
    status: string,
    tries: number}
}

const guessYourNumber = (debug: true | false = false): void => {
  const config: configInterface = {low: 1, high: 10000000, tries: 40, targetNumber: NaN};
  const divideAndConquerResults: resultInterface[] = [];
  const randomGuessingResults: resultInterface[] = [];
  const divideAndRandomOddResults: resultInterface[] = [];
  const divideAndRandomEvenResults: resultInterface[] = [];
  let divideAndRandomOddStartTime, divideAndRandomEvenStartTime, divideStartTime, randomStartTime;

  for (let i: number = 0; i < 150; i++){
    config.targetNumber = Math.floor(Math.random() * (config.high + 1));
    console.log(`Loop ${i} => Number to Guess = ${config.targetNumber}`);

    randomStartTime = Date.now();
    const randomGuessingCycle: {status: string, tries: number} =  new RandomGuessing(config).start();
    if (debug) console.log(`Loop ${i} - randomGuessing`);
    randomGuessingResults.push({
      result: randomGuessingCycle,
      timer: Date.now() - randomStartTime,
      sumOfTime: (randomGuessingResults.length === 0)
        ? (Date.now() - randomStartTime)
        : (randomGuessingResults[randomGuessingResults.length - 1].sumOfTime + (Date.now() - randomStartTime)),
      sumOfTries: (randomGuessingResults.length === 0)
        ? randomGuessingCycle.tries
        : (randomGuessingResults[randomGuessingResults.length - 1].sumOfTries + randomGuessingCycle.tries),
    });

    divideAndRandomOddStartTime = Date.now();
    const divideAndRandomOddCycle: {status: string, tries: number} =  new DivideAndRandomOdd(config).start();
    if(debug) console.log(`Loop ${i} - divideAndRandomOdd`);
    divideAndRandomOddResults.push({
      result: divideAndRandomOddCycle,
      timer: Date.now() - divideAndRandomOddStartTime,
      sumOfTime: (divideAndRandomOddResults.length === 0)
        ? (Date.now() - divideAndRandomOddStartTime)
        : (divideAndRandomOddResults[divideAndRandomOddResults.length - 1].sumOfTime + (Date.now() - divideAndRandomOddStartTime)),
      sumOfTries: (divideAndRandomOddResults.length === 0)
        ? divideAndRandomOddCycle.tries
        : (divideAndRandomOddResults[divideAndRandomOddResults.length - 1].sumOfTries + divideAndRandomOddCycle.tries)
    });

    divideAndRandomEvenStartTime = Date.now();
    const divideAndRandomEvenCycle: {status: string, tries: number} =  new DivideAndRandomEven(config).start();
    if(debug) console.log(`Loop ${i} - divideAndRandomEven`);
    divideAndRandomEvenResults.push({
      result: divideAndRandomEvenCycle,
      timer: Date.now() - divideAndRandomEvenStartTime,
      sumOfTime: (divideAndRandomEvenResults.length === 0)
        ? (Date.now() - divideAndRandomEvenStartTime)
        : (divideAndRandomEvenResults[divideAndRandomEvenResults.length - 1].sumOfTime + (Date.now() - divideAndRandomEvenStartTime)),
      sumOfTries: (divideAndRandomEvenResults.length === 0)
        ? divideAndRandomEvenCycle.tries
        : (divideAndRandomEvenResults[divideAndRandomEvenResults.length - 1].sumOfTries + divideAndRandomEvenCycle.tries)
    });

    divideStartTime = Date.now();
    const divideAndConquerCycle: {status: string, tries: number} =  new DivideAndConquer(config).start();
    if(debug) console.log(`Loop ${i} - divideAndConquer`);
    divideAndConquerResults.push({
      result: divideAndConquerCycle,
      timer: Date.now() - divideStartTime,
      sumOfTime: (divideAndConquerResults.length === 0)
        ? (Date.now() - divideStartTime)
        : (divideAndConquerResults[divideAndConquerResults.length - 1].sumOfTime + (Date.now() - divideStartTime)),
      sumOfTries: (divideAndConquerResults.length === 0)
        ? divideAndConquerCycle.tries
        : (divideAndConquerResults[divideAndConquerResults.length - 1].sumOfTries + divideAndConquerCycle.tries),
    });
    if (debug){
      console.table({
        'Random Guessing Result': randomGuessingResults[i].result,
        'Odd Divide and Random Result': divideAndRandomOddResults[i].result,
        'Even Divide and Random Result': divideAndRandomEvenResults[i].result,
        'Divide and Conquer Result': divideAndConquerResults[i].result,
        'Random Guessing Timer': randomGuessingResults[i].timer,
        'Odd Divide and Random Timer': divideAndRandomOddResults[i].timer,
        'Even Divide and Random Timer': divideAndRandomEvenResults[i].timer,
        'Divide and Conquer Timer': divideAndConquerResults[i].timer,
        'Random Guessing sumOfTime': randomGuessingResults[i].sumOfTime,
        'Odd Divide and Random sumOfTime': divideAndRandomOddResults[i].sumOfTime,
        'Even Divide and Random sumOfTime': divideAndRandomEvenResults[i].sumOfTime,
        'Divide and Conquer sumOfTime': divideAndConquerResults[i].sumOfTime,
        'Random Guessing sumOfTries': randomGuessingResults[i].sumOfTries,
        'Odd Divide and Random sumOfTries': divideAndRandomOddResults[i].sumOfTries,
        'Even Divide and Random sumOfTries': divideAndRandomEvenResults[i].sumOfTries,
        'Divide and Conquer sumOfTries': divideAndConquerResults[i].sumOfTries,
      });
    }
  }

  console.table({
    'set': 'Random Guessing',
    'Wins': `${randomGuessingResults.filter((randomGuess: resultInterface): boolean => randomGuess.result.status === 'win').length} / ${randomGuessingResults.length}`,
    'Total Guesses': randomGuessingResults[randomGuessingResults.length - 1].sumOfTries,
    'Avg Guesses': (randomGuessingResults[randomGuessingResults.length - 1].sumOfTries / randomGuessingResults.length),
    'Avg Run Time': (randomGuessingResults[randomGuessingResults.length - 1].sumOfTime / randomGuessingResults.length),
  });

  console.table({
    'Set': 'Odd Divide And Random',
    'Wins': `${divideAndRandomOddResults.filter((divideAndRandomGuess: resultInterface): boolean => divideAndRandomGuess.result.status === 'win').length} / ${divideAndRandomOddResults.length}`,
    'Total Guesses': divideAndRandomOddResults[divideAndRandomOddResults.length - 1].sumOfTries,
    'Avg Guesses': (divideAndRandomOddResults[divideAndRandomOddResults.length - 1].sumOfTries / divideAndRandomOddResults.length),
    'Avg Run Time': (divideAndRandomOddResults[divideAndRandomOddResults.length - 1].sumOfTime / divideAndRandomOddResults.length),
  });

  console.table({
    'Set': 'Even Divide And Random',
    'Wins': `${divideAndRandomEvenResults.filter((divideAndRandomGuess: resultInterface): boolean => divideAndRandomGuess.result.status === 'win').length} / ${divideAndRandomEvenResults.length}`,
    'Total Guesses': divideAndRandomEvenResults[divideAndRandomEvenResults.length - 1].sumOfTries,
    'Avg Guesses': (divideAndRandomEvenResults[divideAndRandomEvenResults.length - 1].sumOfTries / divideAndRandomEvenResults.length),
    'Avg Run Time': (divideAndRandomEvenResults[divideAndRandomEvenResults.length - 1].sumOfTime / divideAndRandomEvenResults.length),
  });

  console.table({
    'set': 'Divide And Conquer',
    'Wins': `${divideAndConquerResults.filter((divideAndConquerGuess: resultInterface): boolean => divideAndConquerGuess.result.status === 'win').length} / ${divideAndConquerResults.length}`,
    'Total Guesses': divideAndConquerResults[divideAndConquerResults.length - 1].sumOfTries,
    'Avg Guesses': (divideAndConquerResults[divideAndConquerResults.length - 1].sumOfTries / divideAndConquerResults.length),
    'Avg Run Time': (divideAndConquerResults[divideAndConquerResults.length - 1].sumOfTime / divideAndConquerResults.length),
  });
};
guessYourNumber();
