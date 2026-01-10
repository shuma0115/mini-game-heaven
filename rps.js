const rockButton = document.getElementById('rock');
const scissorsButton = document.getElementById('scissors');
const paperButton = document.getElementById('paper');
const playerChoiceDiv = document.getElementById('player-choice');
const computerChoiceDiv = document.getElementById('computer-choice');
const resultDiv = document.getElementById('result');

const choices = ['rock', 'scissors', 'paper'];

function computerPlay() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function play(playerChoice) {
    const computerChoice = computerPlay();
    playerChoiceDiv.textContent = `당신의 선택: ${playerChoice}`;
    computerChoiceDiv.textContent = `컴퓨터의 선택: ${computerChoice}`;

    if (playerChoice === computerChoice) {
        resultDiv.textContent = '무승부!';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'scissors' && computerChoice === 'paper') ||
        (playerChoice === 'paper' && computerChoice === 'rock')
    ) {
        resultDiv.textContent = '당신이 이겼습니다!';
    } else {
        resultDiv.textContent = '컴퓨터가 이겼습니다!';
    }
}

rockButton.addEventListener('click', () => play('rock'));
scissorsButton.addEventListener('click', () => play('scissors'));
paperButton.addEventListener('click', () => play('paper'));
