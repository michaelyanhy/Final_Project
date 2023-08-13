
// Get the canvas element and its drawing context
const chess = document.getElementById("chess");
const context = chess.getContext("2d");
let WhosMove = document.querySelector("#WhosMove");
let restartButton = document.querySelector("#restartButton");
const ROWS = 15; // Number of rows on the chessboard
let chessBoard = []; // Record the chess pieces on the board
let isBlack = true; // Indicates whether the current move is by Black or White
let gameOver = false; // Indicates if the game is over

// Calculate the size of each grid based on the screen size
const CELL_SIZE = Math.min(window.innerWidth, window.innerHeight) * 0.7 / ROWS;
// Calculate the size of the chessboard based on the grid size
const CHESS_SIZE = CELL_SIZE * ROWS;
chess.width = CHESS_SIZE;
chess.height = CHESS_SIZE;

// Initialize the chessboard
function initializeChessBoard() {
    for (let i = 0; i < ROWS; i++) {
        chessBoard[i] = [];
        for (let j = 0; j < ROWS; j++) {
            chessBoard[i][j] = 0; // 0 means no chess on the board
            context.clearRect(0, 0, CHESS_SIZE, CHESS_SIZE); // Clear the canvas
        }
    }
}

initializeChessBoard()

// draw the chessboard
function drawBoard() {
    context.strokeStyle = "#000";
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < ROWS; j++) {
            context.strokeRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
}

// draw the chess
function drawChess(x, y, isBlack) {
    context.beginPath();
    context.arc(x * CELL_SIZE + CELL_SIZE / 2, y * CELL_SIZE + CELL_SIZE / 2, CELL_SIZE / 2 * 0.8, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = isBlack ? "black" : "white";
    context.fill();
}

// detemine is there a winner
function checkWin(x, y) {
    const chessType = chessBoard[x][y];
    const directions = [[1, 0], [0, 1], [1, 1], [1, -1]]; // 4 directions
    for (const [dx, dy] of directions) {
        let count = 1;
        for (let i = 1; i < 5; i++) {
            const newRow = x + i * dx;
            const newCol = y + i * dy;
            if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= ROWS || chessBoard[newRow][newCol] !== chessType) {
                break;
            }
            count++;
        }
        for (let i = 1; i < 5; i++) {
            const newRow = x - i * dx;
            const newCol = y - i * dy;
            if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= ROWS || chessBoard[newRow][newCol] !== chessType) {
                break;
            }
            count++;
        }
        if (count >= 5) {
            return true;
        }
    }
    return false;
}

// listen to chess move event
chess.onclick = function (e) {
    if (gameOver) return;
    const x = Math.floor(e.offsetX / CELL_SIZE);
    const y = Math.floor(e.offsetY / CELL_SIZE);
    if (chessBoard[x][y] === 0) {
        chessBoard[x][y] = isBlack ? 1 : 2; // 1 means Black，2 means White
        moveReminder();
        drawChess(x, y, isBlack);
        if (checkWin(x, y)) {
            const winner = isBlack ? "Black" : "White";
            alert(`${winner} is the winner! Thank you for playing. `);
            gameOver = true;
        }
        isBlack = !isBlack;
    }
    //Another way to let the user know who's move next
    // if (isBlack === false) {
    //     WhosMove.innerHTML = "It's White";
    // }
    // else {
    //     WhosMove.innerHTML = "It's Black";
    // }
};

//Change to move reminder
function moveReminder() {
    WhosMove.innerHTML = isBlack ? "White's" : "Black's"; //If this move is Black, isBlack should be true, then it should display "It's White' move" to let the user know who's move next
        WhosMove.setAttribute("class", "")
        WhosMove.classList.add(isBlack ? 'whiteChess' : 'blackChess')
}

//reset the game
function restartGame() {
    const confirmed = confirm("Do you want to restart the game?");
    if (confirmed) {
        initializeChessBoard();
        isBlack = true;
        gameOver = false;
        drawBoard(); // Redraw the empty board
        console.log("Game Reset");
    }
}

restartButton.addEventListener('click', restartGame)

// draw the chessboard
drawBoard();
