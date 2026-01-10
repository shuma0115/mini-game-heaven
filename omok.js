const gameBoard = document.getElementById('game-board');
const boardSize = 19;
let currentPlayer = 'black';
const board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));

function checkWin(row, col) {
    const player = board[row][col];
    if (!player) return false;

    // Check horizontal
    let count = 1;
    for (let i = 1; i < 5; i++) {
        if (col + i < boardSize && board[row][col + i] === player) count++;
        else break;
    }
    for (let i = 1; i < 5; i++) {
        if (col - i >= 0 && board[row][col - i] === player) count++;
        else break;
    }
    if (count >= 5) return true;

    // Check vertical
    count = 1;
    for (let i = 1; i < 5; i++) {
        if (row + i < boardSize && board[row + i][col] === player) count++;
        else break;
    }
    for (let i = 1; i < 5; i++) {
        if (row - i >= 0 && board[row - i][col] === player) count++;
        else break;
    }
    if (count >= 5) return true;

    // Check diagonal (top-left to bottom-right)
    count = 1;
    for (let i = 1; i < 5; i++) {
        if (row + i < boardSize && col + i < boardSize && board[row + i][col + i] === player) count++;
        else break;
    }
    for (let i = 1; i < 5; i++) {
        if (row - i >= 0 && col - i >= 0 && board[row - i][col - i] === player) count++;
        else break;
    }
    if (count >= 5) return true;

    // Check diagonal (top-right to bottom-left)
    count = 1;
    for (let i = 1; i < 5; i++) {
        if (row + i < boardSize && col - i >= 0 && board[row + i][col - i] === player) count++;
        else break;
    }
    for (let i = 1; i < 5; i++) {
        if (row - i >= 0 && col + i < boardSize && board[row - i][col + i] === player) count++;
        else break;
    }
    if (count >= 5) return true;

    return false;
}

function handleClick(row, col) {
    if (board[row][col]) return;

    board[row][col] = currentPlayer;
    const cell = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
    cell.classList.add(currentPlayer);

    if (checkWin(row, col)) {
        setTimeout(() => {
            alert(`${currentPlayer === 'black' ? '흑' : '백'}돌 승리!`);
            resetBoard();
        }, 100);
    } else {
        currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
    }
}

function createBoard() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', () => handleClick(i, j));
            gameBoard.appendChild(cell);
        }
    }
}

function resetBoard() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            board[i][j] = null;
            const cell = document.querySelector(`[data-row='${i}'][data-col='${j}']`);
            cell.classList.remove('black', 'white');
        }
    }
    currentPlayer = 'black';
}

createBoard();
