const inquirer = require('inquirer');

const guessYourNumber = () => {
  const config = {
    low: 0,
    high: 10000001,
    guesses: [],
    tries: 30
  };

  const chooseANumber = () => {
    inquirer.prompt([{type: 'number', name: 'number', message: `Choose a (whole) number between 1 - ${config.high - 1}`}]).then((answers) => {
      config.number = answers.number;
      console.log('Number to guess is: ', config.number);
      makeGuess();
    })
  };

  const checkGuess = (guess) => {
    let response;
    if (guess > config.number){
      response = 'Lower';
      config.guesses.push({guess: guess, response: response});
    }

    if (guess < config.number){
      response = 'Higher';
      config.guesses.push({guess: guess, response: response});
    }

    if (guess === config.number){
      response = 'You Win!';
      config.guesses.push({guess: guess, response: response});
    }
    return makeGuess(response);
  };

  const makeGuess = (response = null) => {
    const middleNumber = Math.floor(config.high / 2);
    if (config.guesses.length > config.tries){
      console.log(`Could not guess in ${config.tries} guesses`);
      return console.table(config.guesses);
    }
    if (response == null){ checkGuess(middleNumber) } // First Guess
    if (response === 'You Win!'){
      console.table(config.guesses);
      return console.log(`Winning Guess in ${config.guesses.length} guesses`)
    }
    if (response === 'Lower'){ checkGuess(generateNumber(response))}
    if (response === 'Higher'){ checkGuess(generateNumber(response))}
  };

  const generateNumber = (response) => {
    let newGuess;
    while (typeof newGuess !== 'number'){
      newGuess = checkNumberGen(Math.floor(Math.random() * config.high), response);
    }
    return newGuess
  };

  const checkNumberGen = (newGuess) => {
    for (let i = 0; i < config.guesses.length; i++){
      const guessHistory = config.guesses[i];
      if (guessHistory.response === 'Lower' && newGuess > guessHistory.guess){ return 'failed'; }
      if (guessHistory.response === 'Higher' && newGuess < guessHistory.guess){ return 'failed'; }
      if (guessHistory.guess === newGuess){ return 'failed'; }
    }
    return newGuess
  };

  chooseANumber();
};
guessYourNumber();
