const inquirer = require('inquirer');
const divideAndConquer = require('./classes/divideAndConquer');
const RandomGuessing = require('./classes/randomGuessing');

const guessYourNumber = () => {
  const config = {
    low: 1,
    high: 10000000,
    tries: 30
  };

  inquirer.prompt([{
      type: 'number',
      name: 'number',
      message: `Choose a (whole) number between ${config.low} - ${config.high}`
    }]).then((answers) => {
    config.targetNumber = answers.number;
    console.log('Number to guess is: ', config.targetNumber);
    console.log('Divide and Conquer', new divideAndConquer(config).start());
    console.log('Random Guessing', new RandomGuessing(config).start())
  })
};
guessYourNumber();
