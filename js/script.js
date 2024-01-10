// Array of words for the game
const words = ["apple", "banana", "orange", "grape", "strawberry"];

// Randomly select a word from the array
const selectedWord = words[Math.floor(Math.random() * words.length)];

// Array to store guessed letters
const guessedLetters = [];

// Maximum number of allowed incorrect guesses
const maxIncorrectGuesses = 8;

// Variable to track the number of incorrect guesses
let incorrectGuesses = 0;

// Function to display the current state of the word with underscores for unknown letters
function displayWord() {
    const wordDisplay = selectedWord
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');

    document.querySelector('.word-in-progress').innerText = wordDisplay;
}

// Function to check if the guessed letter is in the word
function checkGuess(letter) {
    guessedLetters.push(letter);

    if (selectedWord.split('').every(letter => guessedLetters.includes(letter))) {
        document.getElementById('result').innerText = 'Congratulations! You guessed the word!';
    } else if (!selectedWord.includes(letter)) {
        incorrectGuesses++;
        updateRemainingGuesses();
    }

    displayWord();
}

// Function to update the remaining guesses
function updateRemainingGuesses() {
    const remainingGuesses = maxIncorrectGuesses - incorrectGuesses;
    document.querySelector('.remaining span').innerText = remainingGuesses;

    if (remainingGuesses === 0) {
        document.getElementById('result').innerText = 'Game over! You ran out of guesses. The correct word was ' + selectedWord + '.';
    }
}

// Function to handle guess submission
function submitGuess() {
    const guessInput = document.getElementById('guessInput');
    const guess = guessInput.value.toLowerCase();

    // Check if the input is a single letter and hasn't been guessed before
    if (/^[a-z]$/.test(guess) && !guessedLetters.includes(guess)) {
        checkGuess(guess);
    } else {
        document.getElementById('result').innerText = 'Invalid guess. Please enter a single letter that you haven\'t guessed before.';
    }

    // Clear the input field after processing the guess
    guessInput.value = '';
}

// Initial display of the word and remaining guesses
displayWord();
updateRemainingGuesses();

// Event listener for the guess button
document.querySelector('.guess-form').addEventListener('submit', function (e) {
    e.preventDefault();
    submitGuess();
});
