console.log(
  `Welcome to the Number Guessing Game.\nI'm thinking of an number between 1 and 100.\nYou have 5 chances to guess the correct number.`,
)
console.log(
  '\nPlease select the difficulty level:\n 1. Easy (10 chances) \n 2. Medium (5 chances) \n 3. Hard (3 chances)\n',
)

const computerNumberGuessing = Math.floor(Math.random() * 101)
const prompt = require('prompt-sync')()
const difficultyChoice = prompt('Enter your choice: ')

const difficulties = {
  1: { name: 'Easy', chances: 10 },
  2: { name: 'Medium', chances: 5 },
  3: { name: 'Hard', chances: 3 },
}

if (!Object.keys(difficulties).includes(difficultyChoice)) {
  console.log('\nPlease enter the choice from 1 to 3')
  process.exit()
}

const { name: difficultyName, chances } = difficulties[difficultyChoice]

console.log(
  `\nGreat! You have selected the ${difficultyName} difficulty level. \nLet's start the game!\n`,
)

let attempts = 0

do {
  const userGuessing = parseInt(prompt('Enter your guess: '))

  if (isNaN(userGuessing) || userGuessing < 0 || userGuessing > 100) {
    console.log('\nInvalid input. Please enter a number between 0 and 100.')
    continue
  }

  attempts += 1
  if (userGuessing === computerNumberGuessing) {
    console.log(
      `Congratulations! You guessed the correct number in ${attempts} attempts.`,
    )
    process.exit()
  }

  if (userGuessing < computerNumberGuessing) {
    console.log(`Incorrect! The number is greater than ${userGuessing}.`)
  } else {
    console.log(`Incorrect! The number is smaller than ${userGuessing}.`)
  }
} while (chances > attempts)

console.log(
  `Sorry, you've used all your attempts. The correct number was ${computerNumberGuessing}.`,
)
process.exit()
