const startGameBtn = document.getElementById('start-game-btn');

const Choices = {
    ROCK: 'ROCK',
    PAPER: 'PAPER',
    SCISSORS: 'SCISSORS'
};

const Defaults = {
    USER_CHOICE: Choices.ROCK,
    RESULT_DRAW: 'DRAW',
    RESULT_PLAYER_WINS: 'PLAYER_WINS',
    RESULT_COMPUTER_WINS: 'COMPUTER_WINS'
};

let gameIsRunning = false;

const getPlayerChoice = () => {
    const selection = prompt(`${Choices.ROCK}, ${Choices.PAPER} or ${Choices.SCISSORS}?`, '').toUpperCase();
    if (!Object.values(Choices).includes(selection)) {
        alert(`Invalid choice! We chose ${Defaults.USER_CHOICE} for you!`);
        return Defaults.USER_CHOICE;
    }
    return selection;
}

const getComputerChoice = () => {
    const randomValue = Math.random();
    if (randomValue < 0.34) {
        return Choices.ROCK;
    } else if (randomValue < 0.67) {
        return Choices.PAPER;
    } else {
        return Choices.SCISSORS;
    }
};

const getWinner = (cChoice, pChoice) => {
    const isDraw = cChoice === pChoice;
    const isPlayerWinner = (cChoice === Choices.ROCK && pChoice === Choices.PAPER) ||
        (cChoice === Choices.PAPER && pChoice === Choices.SCISSORS) ||
        (cChoice === Choices.SCISSORS && pChoice === Choices.ROCK);

    if (isDraw) {
        return Defaults.RESULT_DRAW;
    }
    return isPlayerWinner ? Defaults.RESULT_PLAYER_WINS : Defaults.RESULT_COMPUTER_WINS;
};

startGameBtn.addEventListener('click', () => {
    if (gameIsRunning) {
        return;
    }
    gameIsRunning = true;
    console.log('Game is starting...');

    const playerChoice = getPlayerChoice();
    const computerChoice = getComputerChoice();
    const winner = getWinner(computerChoice, playerChoice);

    console.log(winner);
});