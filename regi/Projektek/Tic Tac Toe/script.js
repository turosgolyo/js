let board;
let currentPlayer;
let gameMode;
let gameActive;

function startGame(mode) {
    gameMode = mode;
    restartGame();
}

function restartGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('result').textContent = '';
    document.getElementById('restart').style.display = 'none';
    drawBoard();
}

function drawBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellElement.textContent = cell;
        cellElement.onclick = () => makeMove(index);
        boardElement.appendChild(cellElement);
    });
}

function makeMove(index) {
    if (!gameActive || board[index]) {
        return;
    }
    board[index] = currentPlayer;
    drawBoard();

    if (checkWin(currentPlayer)) {
        endGame(`${currentPlayer} játékos nyert!`);
    } else if (board.every(cell => cell)) {
        endGame('Döntetlen!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (gameMode === 'onePlayer' && currentPlayer === 'O') aiMove();
    }
}

function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => pattern.every(index => board[index] === player));
}

function endGame(message) {
    document.getElementById('result').textContent = message;
    gameActive = false;
    document.getElementById('restart').style.display = 'block';
}

function aiMove() {
    const emptyCells = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = 'O';
    drawBoard();
    if (checkWin('O')) {
        endGame('A gép nyert');
    } else if (board.every(cell => cell)) {
        endGame('Döntetlen');
    } else {
        currentPlayer = 'X';
    }
}

restartGame();