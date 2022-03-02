const Player = (name, symbol) => {
    let turn = true;
    /*const play = (gameboard) => {
        let board = document.querySelectorAll('.gameboard div');
        board.forEach((grid) => {

            grid.addEventListener('click', () => {
                if ((!grid.textContent) && (turn === true)) {
                    console.log(`${name} is playing!`);
                    grid.textContent = symbol;
                    gameboard[grid.className[grid.className.length - 1]] = symbol; //getting thr last index of the class name of each grid to use them as indices in the gameboard array
                    turn = false;
                }

            });

        });
    }*/

    return { name, symbol, turn };
};

const game = (() => {

    let board = document.querySelectorAll('.gameboard div');
    let gameboard = [];
    const body = document.querySelector('body');
    const result = document.createElement('div');

    const gameBoard = () => {

        const restart = (player1, player2) => {
            const start = document.querySelector('.start');
            start.addEventListener('click', () => {
                result.textContent = "";
                gameboard.splice(0, gameboard.length);
                if (body.lastElementChild == result)
                    body.removeChild(result);
                board.forEach((grid) => {
                    grid.textContent = "";

                });
                player1.turn = player2.turn = true;
            });
        }


        const getGameBoard = () => gameboard;

        return { restart, getGameBoard };
    }

    const displayController = (player1, player2) => {
        board.forEach((grid) => {
            grid.addEventListener('click', () => {

                if ((!grid.textContent) && (player1.turn === true)) {
                    //console.log(`${player1.name} is playing!`);
                    grid.textContent = player1.symbol;
                    game.gameboard[grid.className[grid.className.length - 1]] = player1.symbol; //getting thr last index of the class name of each grid to use them as indices in the gameboard array
                    player1.turn = false;
                    player2.turn = true;



                } else if ((!grid.textContent) && (player2.turn === true)) {
                    //console.log(`${player2.name} is playing!`);
                    grid.textContent = player2.symbol;
                    game.gameboard[grid.className[grid.className.length - 1]] = player2.symbol; //getting thr last index of the class name of each grid to use them as indices in the gameboard array
                    player2.turn = false;
                    player1.turn = true;

                }
                if (checkWinner(player1) || checkWinner(player2)) {
                    player1.turn = false;
                    player2.turn = false;
                    body.appendChild(result);
                }



            });
        });

    }

    function checkRows(symbol) {
        let check = false;
        let result = false;
        let i = j = 0;

        for (i = 0; i < 9; i += 3) {
            loop: for (j = i; j < (i + 3 - 1); j++) {
                if (gameboard[j] === gameboard[j + 1] && gameboard[j] === symbol)
                    check = true;
                else { check = false; break loop; }
            }
            result = result || check;
        }
        //result = ((gameboard[i] === gameboard[i + 1] && gameboard[i + 1] === gameboard[i + 2]) || (gameboard[i + 3] === gameboard[i + 4] && gameboard[i + 4] === gameboard[i + 5]) || (gameboard[i + 6] === gameboard[i + 7] && gameboard[i + 7] === gameboard[i + 8]));
        return result;
    }

    function checkColumns(symbol) {
        let check = false;
        let result = false;
        let i = j = 0;
        for (i = 0; i < 3; i++) {
            loop: for (j = i; j < (i + 9 - 3); j += 3) {
                if (gameboard[j] === gameboard[j + 3] && gameboard[j] === symbol)
                    check = true;
                else { check = false; break loop; }
            }
            result = result || check;
        }
        //result= ((gameboard[i] === gameboard[i + 3] && gameboard[i + 3] === gameboard[i + 6]) || (gameboard[i + 1] === gameboard[i + 1 + 3] && gameboard[i + 1 + 3] === gameboard[i + 1 + 6]) || (gameboard[i + 2] === gameboard[i + 2 + 3] && gameboard[i + 2 + 3] === gameboard[i + 2 + 6]));
        return result;
    }

    function checkDiagonals(symbol) {
        let check;
        let result = false;
        let i = j = 0;
        for (i = 0; i < 3; i += (3 - 1)) {
            if (i === 0) {
                loop1: for (j = i; j < (9 - 1 - i); j += 4) {
                    if (gameboard[j] === gameboard[j + 4] && gameboard[j] === symbol)
                        check = true;
                    else { check = false; break loop1; }
                }
                result = result || check;
            }
            else {
                loop2: for (j = i; j < (9 - 1 - i); j += 2) {
                    if (gameboard[j] === gameboard[j + 2] && gameboard[j] === symbol)
                        check = true;
                    else { check = false; break loop2; }
                }
                result = result || check;
            }

        }
        //result = ((gameboard[i] === gameboard[i + 4] && gameboard[i + 4] === gameboard[i + 8]) || (gameboard[i + 2] === gameboard[i + 4] && gameboard[i + 4] === gameboard[i + 6]));
        return result;
    }

    function checkWinner(player) {
        if (player.turn === false && (checkRows(player.symbol) || checkColumns(player.symbol) || checkDiagonals(player.symbol))) {
            result.textContent = `${player.name} won!`;
            //console.log(`${player.name} won!`);
            return true;
        } else if (gameboard.toString().replaceAll(",", "").length === 9) {
            result.textContent = "It is a draw!";
            return true;
        }
        return false;

    }

    return { gameBoard, displayController, gameboard };

})();

const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

game.displayController(player1, player2);
game.gameBoard().restart(player1, player2);