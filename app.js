/**
 * A reference to the HTML button element with the ID 'start-game-btn'.
 * This button is intended to start the game when clicked.
 * Typically, this is an interactive element that users can interact with to initiate game play.
 *
 * @type {HTMLButtonElement}
 */
const startGameBtn = document.getElementById('start-game-btn');

/**
 * An enumeration representing the possible choices in a game of Rock, Paper, Scissors.
 *
 * @property {string} ROCK - Represents the 'ROCK' choice.
 * @property {string} PAPER - Represents the 'PAPER' choice.
 * @property {string} SCISSORS - Represents the 'SCISSORS' choice.
 */
const Choices = {
    ROCK: 'ROCK',
    PAPER: 'PAPER',
    SCISSORS: 'SCISSORS'
};

/**
 * An object that stores the default values used in the application.
 *
 * @property {Choices} USER_CHOICE - The default choice of the user in a game.
 * @property {string} RESULT_DRAW - The default result value indicating a draw.
 * @property {string} RESULT_PLAYER_WINS - The default result value indicating a player win.
 * @property {string} RESULT_COMPUTER_WINS - The default result value indicating a computer win.
 */
const Defaults = {
    USER_CHOICE: Choices.ROCK,
    RESULT_DRAW: 'DRAW',
    RESULT_PLAYER_WINS: 'PLAYER_WINS',
    RESULT_COMPUTER_WINS: 'COMPUTER_WINS'
};

/**
 * A boolean flag indicating whether the game is currently running.
 * It is set to `true` when the game starts and `false` when the game stops or pauses.
 *
 * @type {boolean}
 */
let gameIsRunning = false;

/**
 * Prompts the user to input their choice for a game (Rock, Paper, or Scissors).
 *
 * The function displays a prompt asking the user to select between Rock, Paper, or Scissors.
 * The user's input is then converted to uppercase and validated against the possible choices.
 * If the user provides an invalid choice, an alert is shown and a default value is returned.
 *
 * @returns {string} The user's selection if it's valid; otherwise, a default choice.
 */
const getPlayerChoice = () => {
    const selection = prompt(`${Choices.ROCK}, ${Choices.PAPER} or ${Choices.SCISSORS}?`, '').toUpperCase();
    if (!Object.values(Choices).includes(selection)) {
        alert(`Invalid choice! We chose ${Defaults.USER_CHOICE} for you!`);
        return Defaults.USER_CHOICE;
    }
    return selection;
}

/**
 * Selects and returns a random choice from the predefined options (ROCK, PAPER, SCISSORS).
 *
 * @function
 * @returns {string} - The choice selected randomly among ROCK, PAPER, and SCISSORS.
 */
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

/**
 * Determines the winner between a computer choice and a player choice in a game of rock-paper-scissors.
 *
 * @param {string} cChoice - The choice of the computer (e.g., "ROCK", "PAPER", "SCISSORS").
 * @param {string} pChoice - The choice of the player (e.g., "ROCK", "PAPER", "SCISSORS").
 * @returns {string} Returns a string indicating the result of the match: either "DRAW", "PLAYER_WINS", or "COMPUTER_WINS".
 */
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
    if (gameIsRunning) return;

    gameIsRunning = true;
    console.log('Game is starting...');

    const generateMessage = (winner, playerChoice, computerChoice) => {
        const DRAW_MESSAGE = (playerChoice, computerChoice) =>
            `You picked ${playerChoice}, computer picked ${computerChoice}, therefore you had a draw`;

        const WIN_MESSAGE = (playerChoice, computerChoice) =>
            `You picked ${playerChoice}, computer picked ${computerChoice}, therefore you won!`;

        const LOSE_MESSAGE = (playerChoice, computerChoice) =>
            `You picked ${playerChoice}, computer picked ${computerChoice}, therefore you lost!`;

        switch (winner) {
            case Defaults.RESULT_DRAW:
                return DRAW_MESSAGE(playerChoice, computerChoice);
            case Defaults.RESULT_PLAYER_WINS:
                return WIN_MESSAGE(playerChoice, computerChoice);
            default:
                return LOSE_MESSAGE(playerChoice, computerChoice);
        }
    };

    const playerChoice = getPlayerChoice();
    const computerChoice = getComputerChoice();
    const winner = getWinner(computerChoice, playerChoice);
    const message = generateMessage(winner, playerChoice, computerChoice);
    alert(message);

    gameIsRunning = false;

    console.log(winner);
});