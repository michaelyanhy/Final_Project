// Get the canvas element and its drawing context
        const chess = document.getElementById("chess");
        const context = chess.getContext("2d");
        var WhosMove = document.querySelector("#WhosMove");
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

        // Initialize the chessboard array
        for (let i = 0; i < ROWS; i++) {
            chessBoard[i] = [];
            for (let j = 0; j < ROWS; j++) {
                chessBoard[i][j] = 0; // 0 means no chess on the board
            }
        }

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

// listen to chess move event
        chess.onclick = function(e) {
            if (gameOver) return;
            const x = Math.floor(e.offsetX / CELL_SIZE);
            const y = Math.floor(e.offsetY / CELL_SIZE);
            if (chessBoard[x][y] === 0) {
                chessBoard[x][y] = isBlack ? 1 : 2; // 1 means Black，2 means White
                drawChess(x, y, isBlack);
                if (checkWin(x, y)) {
                    const winner = isBlack ? "Black" : "White";
                    alert(`${winner} is the winner! Thank you for playing. `);
                    gameOver = true;
                }
                isBlack = !isBlack;
            }
            if (isBlack === false) {
                WhosMove.innerHTML = "It's White";
            }
            else {
                WhosMove.innerHTML = "It's Black";
            }
        };

        // draw the chessboard
        drawBoard();
