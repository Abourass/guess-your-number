const DivideAndConquer = require('./classes/divideAndConquer');
const RandomGuessing = require('./classes/randomGuessing');
const DivideAndRandom = require('./classes/divideAndRandom');

const guessYourNumber = () => {
  const config = {low: 1, high: 10000000, tries: 40};
  const divideAndConquerResults = [], randomGuessingResults = [], divideAndRandomResults = [];

  for (let i = 0; i < 150; i++){
    config.targetNumber = Math.floor(Math.random() * (config.high + 1));
    console.log(`Loop ${i} => Number to Guess = ${config.targetNumber}`);

    const randomStartTime = Date.now();
    const result =  new RandomGuessing(config).start();
    //console.log(`Loop ${i} - randomGuessing - ${JSON.stringify(result)}`);
    randomGuessingResults.push({
      result: result,
      timer: Date.now() - randomStartTime,
      sumOfTime: (randomGuessingResults.length === 0)
        ? (Date.now() - randomStartTime)
        : (randomGuessingResults[randomGuessingResults.length - 1].timer + (Date.now() - randomStartTime)),
      sumOfTries: (randomGuessingResults.length === 0)
        ? (result.tries)
        : (randomGuessingResults[randomGuessingResults.length - 1].result.tries + result.tries),
    });

    const divideAndRandomStartTime = Date.now();
    const divideAndRandomResult =  new DivideAndRandom(config).start();
    //console.log(`Loop ${i} - divideAndRandom - ${JSON.stringify(divideAndRandomResult)}`);
    divideAndRandomResults.push({
      result: divideAndRandomResult,
      timer: Date.now() - divideAndRandomStartTime,
      sumOfTime: (divideAndRandomResults.length === 0)
        ? (Date.now() - divideAndRandomStartTime)
        : (divideAndRandomResults[divideAndRandomResults.length - 1].timer + (Date.now() - divideAndRandomStartTime)),
      sumOfTries: (divideAndRandomResults.length === 0)
        ? (divideAndRandomResult.tries)
        : (divideAndRandomResults[divideAndRandomResults.length - 1].result.tries + divideAndRandomResult.tries)
    });

    const divideStartTime = Date.now();
    const divideResult =  new DivideAndConquer(config).start();
    //console.log(`Loop ${i} - divideAndConquer - ${JSON.stringify(divideResult)}`);
    divideAndConquerResults.push({
      result: divideResult,
      timer: Date.now() - divideStartTime,
      sumOfTime: (divideAndConquerResults.length === 0)
        ? (Date.now() - divideStartTime)
        : (divideAndConquerResults[divideAndConquerResults.length - 1].timer + (Date.now() - divideStartTime)),
      sumOfTries: (divideAndConquerResults.length === 0)
        ? (divideResult.tries)
        : (divideAndConquerResults[divideAndConquerResults.length - 1].result.tries + divideResult.tries),
    });
  }

  console.table({
    'set': 'Random Guessing',
    'Wins': `${randomGuessingResults.filter((randomGuess) => randomGuess.result.status === 'win').length} / ${randomGuessingResults.length}`,
    'Total Guesses': randomGuessingResults[randomGuessingResults.length - 1].sumOfTries,
    'Avg Guesses': randomGuessingResults[randomGuessingResults.length - 1].sumOfTries / randomGuessingResults.length,
    'Avg Run Time': randomGuessingResults[randomGuessingResults.length - 1].sumOfTime / randomGuessingResults.length,
  });

  console.table({
    'Set': 'Divide And Random',
    'Wins': `${divideAndRandomResults.filter((divideAndRandomGuess) => divideAndRandomGuess.result.status === 'win').length} / ${divideAndRandomResults.length}`,
    'Total Guesses': divideAndRandomResults[divideAndRandomResults.length - 1].sumOfTries,
    'Avg Guesses': divideAndRandomResults[divideAndRandomResults.length - 1].sumOfTries / divideAndRandomResults.length,
    'Avg Run Time': divideAndRandomResults[divideAndRandomResults.length - 1].sumOfTime / divideAndRandomResults.length,
  });

  console.table({
    'set': 'Divide And Conquer',
    'Wins': `${divideAndConquerResults.filter((divideAndConquerGuess) => divideAndConquerGuess.result.status === 'win').length} / ${divideAndConquerResults.length}`,
    'Total Guesses': divideAndConquerResults[divideAndConquerResults.length - 1].sumOfTries,
    'Avg Guesses': divideAndConquerResults[divideAndConquerResults.length - 1].sumOfTries / divideAndConquerResults.length,
    'Avg Run Time': divideAndConquerResults[divideAndConquerResults.length - 1].sumOfTime / divideAndConquerResults.length,
  });
};
guessYourNumber();
