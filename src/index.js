const DivideAndConquer = require('./classes/divideAndConquer');
const RandomGuessing = require('./classes/randomGuessing');
const DivideAndRandom = require('./classes/divideAndRandom');

const guessYourNumber = (debug = false) => {
  const config = {low: 1, high: 10000000, tries: 40};
  const divideAndConquerResults = [], randomGuessingResults = [], divideAndRandomResults = [];
  let divideAndRandomStartTime, divideStartTime, randomStartTime;

  for (let i = 0; i < 100; i++){
    config.targetNumber = Math.floor(Math.random() * (config.high + 1));
    console.log(`Loop ${i} => Number to Guess = ${config.targetNumber}`);

    randomStartTime = Date.now();
    const randomGuessingCycle =  new RandomGuessing(config).start();
    if (debug){console.log(`Loop ${i} - randomGuessing`)}
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

    divideAndRandomStartTime = Date.now();
    const divideAndRandomCycle =  new DivideAndRandom(config).start();
    if(debug){console.log(`Loop ${i} - divideAndRandom`);}
    divideAndRandomResults.push({
      result: divideAndRandomCycle,
      timer: Date.now() - divideAndRandomStartTime,
      sumOfTime: (divideAndRandomResults.length === 0)
        ? (Date.now() - divideAndRandomStartTime)
        : (divideAndRandomResults[divideAndRandomResults.length - 1].sumOfTime + (Date.now() - divideAndRandomStartTime)),
      sumOfTries: (divideAndRandomResults.length === 0)
        ? divideAndRandomCycle.tries
        : (divideAndRandomResults[divideAndRandomResults.length - 1].sumOfTries + divideAndRandomCycle.tries)
    });

    divideStartTime = Date.now();
    const divideAndConquerCycle =  new DivideAndConquer(config).start();
    if(debug){console.log(`Loop ${i} - divideAndConquer`);}
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
        'Divide and Random Result': divideAndRandomResults[i].result,
        'Divide and Conquer Result': divideAndConquerResults[i].result,
        'Random Guessing Timer': randomGuessingResults[i].timer,
        'Divide and Random Timer': divideAndRandomResults[i].timer,
        'Divide and Conquer Timer': divideAndConquerResults[i].timer,
        'Random Guessing sumOfTime': randomGuessingResults[i].sumOfTime,
        'Divide and Random sumOfTime': divideAndRandomResults[i].sumOfTime,
        'Divide and Conquer sumOfTime': divideAndConquerResults[i].sumOfTime,
        'Random Guessing sumOfTries': randomGuessingResults[i].sumOfTries,
        'Divide and Random sumOfTries': divideAndRandomResults[i].sumOfTries,
        'Divide and Conquer sumOfTries': divideAndConquerResults[i].sumOfTries,
      });
    }
  }

  console.table({
    'set': 'Random Guessing',
    'Wins': `${randomGuessingResults.filter((randomGuess) => randomGuess.result.status === 'win').length} / ${randomGuessingResults.length}`,
    'Total Guesses': randomGuessingResults[randomGuessingResults.length - 1].sumOfTries,
    'Avg Guesses': (randomGuessingResults[randomGuessingResults.length - 1].sumOfTries / randomGuessingResults.length),
    'Avg Run Time': (randomGuessingResults[randomGuessingResults.length - 1].sumOfTime / randomGuessingResults.length),
  });

  console.table({
    'Set': 'Divide And Random',
    'Wins': `${divideAndRandomResults.filter((divideAndRandomGuess) => divideAndRandomGuess.result.status === 'win').length} / ${divideAndRandomResults.length}`,
    'Total Guesses': divideAndRandomResults[divideAndRandomResults.length - 1].sumOfTries,
    'Avg Guesses': (divideAndRandomResults[divideAndRandomResults.length - 1].sumOfTries / divideAndRandomResults.length),
    'Avg Run Time': (divideAndRandomResults[divideAndRandomResults.length - 1].sumOfTime / divideAndRandomResults.length),
  });

  console.table({
    'set': 'Divide And Conquer',
    'Wins': `${divideAndConquerResults.filter((divideAndConquerGuess) => divideAndConquerGuess.result.status === 'win').length} / ${divideAndConquerResults.length}`,
    'Total Guesses': divideAndConquerResults[divideAndConquerResults.length - 1].sumOfTries,
    'Avg Guesses': (divideAndConquerResults[divideAndConquerResults.length - 1].sumOfTries / divideAndConquerResults.length),
    'Avg Run Time': (divideAndConquerResults[divideAndConquerResults.length - 1].sumOfTime / divideAndConquerResults.length),
  });
};
guessYourNumber();
