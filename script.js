const gameBoard = (function () {
    const board = ['', '', '', '', '', '', '', '', ''];

    function play(player, pos) {
        if (board[pos] === '') {
            board[pos] = player;
            showBoard();
            return true;
        }

        return false;
    }

    function checkWinner() {
        for (let i = 0; i < 3; i++) {
            //check rows
            if (board[i * 3] != '' && board[i * 3] === board[i * 3 + 1] && board[i * 3] === board[i * 3 + 2]) {
                return board[i * 3];
            }

            //check columns
            if (board[i] != '' && board[i] === board[i + 3] && board[i] === board[i + 6]) {
                return board[i];
            }
        }

        //check diagonals
        if (board[0] != '' && board[0] === board[4] && board[0] === board[8]) {
            return board[0];
        }

        if (board[2] != '' && board[2] === board[4] && board[2] === board[6]) {
            return board[2];
        }

        return null;
    }

    function printBoard() {
        for (let i = 0; i < 3; i++) {
            console.log("-------------");
            console.log(`| ${board[i * 3]} | ${board[i * 3 + 1]} | ${board[i * 3 + 2]} |`)
        }
        console.log("-------------");
    }

    function showBoard() {
        for (let i = 1; i <= 9; i++) {
            document.querySelector("#n" + i).textContent = board[i - 1];
        }
    }

    function clear() {
        for (let i = 0; i < 9; i++) {
            board[i] = '';
        }
    }

    function isFull() {
        return board.every(x => x != '');
    }


    return { play, checkWinner, printBoard, showBoard, clear, isFull }
})();

const game = (function() {
    let currentPlayer = 'X';

    function setMessage(winner) {
        document.querySelector('button.reset').style.display = '';
        const message = document.querySelector('.message');
        const player1score = document.querySelector(`.player1.score`);
        const player2score = document.querySelector(`.player2.score`);
        

        if (winner === 'tie') {
            message.textContent = 'Tie.';
        }
        else {
            player1 = document.querySelector('.player1.name').value;
            player2 = document.querySelector('.player2.name').value;

            if (winner === 'X') {
                player1score.textContent = +player1score.textContent + 1;
                message.textContent = `${player1} won!`;
            }
            else {
                player2score.textContent = +player2score.textContent + 1;
                message.textContent = `${player2} won!`;
            }
        }
        
        gameBoard.clear();
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function reset() {
        document.querySelector('.message').textContent = '';
        gameBoard.showBoard();
        document.querySelector('button.reset').style.display = 'none';
    }
    
    function start() {
        reset();
        for (let i = 1; i <= 9; i++) {
            document.querySelector("#n" + i).addEventListener('click', () => {
                reset();
                if (gameBoard.play(currentPlayer, i - 1)) {
                    if (gameBoard.checkWinner() != null) {
                        setMessage(currentPlayer);
                    }
                    else if (gameBoard.isFull()) {
                        setMessage('tie');
                    }
    
                    switchPlayer(); 
                }
            });
        }
    }
    

    return { start, reset }
})();

game.start();
document.querySelector('button.reset').addEventListener('click', () => game.reset());

//set player names
