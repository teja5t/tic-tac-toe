const gameBoard = (function () {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    function play(player, x, y) {
        board[x * 3 + y] = player;
    }

    function checkWinner() {
        for (let i = 0; i < 3; i++) {
            //check rows
            if (board[i * 3] != 0 && board[i * 3] === board[i * 3 + 1] && board[i * 3] === board[i * 3 + 2]) {
                return board[i * 3];
            }

            //check columns
            if (board[i] != 0 && board[i] === board[i + 3] && board[i] === board[i + 6]) {
                return board[i];
            }
        }

        //check diagonals
        if (board[0] != 0 && board[0] === board[4] && board[0] === board[8]) {
            return board[0];
        }

        if (board[2] != 0 && board[2] === board[4] && board[2] === board[6]) {
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

    return { play, checkWinner, printBoard }
})();

gameBoard.printBoard();
gameBoard.play(1, 0, 1);
gameBoard.play(1, 1, 1);
gameBoard.play(1, 2, 1);
console.log(gameBoard.checkWinner());
gameBoard.printBoard();