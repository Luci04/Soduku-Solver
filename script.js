// var board = [
//     [3, 0, 6, 5, 0, 8, 4, 0, 0],
//     [5, 2, 0, 0, 0, 0, 0, 0, 0],
//     [0, 8, 7, 0, 0, 0, 0, 3, 1],
//     [0, 0, 3, 0, 1, 0, 0, 8, 0],
//     [9, 0, 0, 8, 6, 3, 0, 0, 5],
//     [0, 5, 0, 0, 9, 0, 6, 0, 0],
//     [1, 3, 0, 0, 0, 0, 2, 5, 0],
//     [0, 0, 0, 0, 0, 0, 0, 7, 4],
//     [0, 0, 5, 2, 0, 6, 3, 0, 0]
// ];

var arr = [[], [], [], [], [], [], [], [], []]
var temp = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);

    }
}

function initializeTemp(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            temp[i][j] = false;

        }
    }
}


function setTemp(board, temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                temp[i][j] = true;
            }
        }
    }
}


function setColor1(temp, color) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (temp[i][j] == true) {
                arr[i][j].style.color = color;
            }

        }
    }
}

function setColor2(temp, color) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (temp[i][j] == true && arr[i][j].style.color != 'red') {
                arr[i][j].style.color = color;
            }

        }
    }
}

function resetColor() {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            arr[i][j].style.color = "green";
        }
    }
}


var board = [[], [], [], [], [], [], [], [], []]


let button = document.getElementById('generate-sudoku')
let solve = document.getElementById('solve')


function changeBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {

                arr[i][j].innerText = board[i][j]
            }

            else
                arr[i][j].innerText = ''
        }
    }
}


button.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor1(temp, "red")
        changeBoard(board)
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
    //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
    xhrRequest.send()
}



function isSafe(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[i][col] == num)
            return false;

        if (board[row][i] == num) {
            return false;
        }
    }

    let startRow = row - row % 3, startCol = col - col % 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] == num) {
                return false;
            }
        }
    }

    return true;

}

solve.onclick = function () {
    solveSudoku(board, 0, 0);
    setTemp(board, temp)
    setColor2(temp, "green")
    console.log(board)
}

function solveSudoku(board, row, col) {
    if (row == 9) {
        changeBoard(board)
        return false;
    }

    if (col == 9) {
        return solveSudoku(board, row + 1, 0);
    }

    if (board[row][col] != 0) {
        return solveSudoku(board, row, col + 1);
    }

    for (let num = 1; num <= 9; num++) {
        if (isSafe(board, row, col, num)) {

            board[row][col] = num;

            if (solveSudoku(board, row, col + 1)) {
                return true;
            }
        }

        board[row][col] = 0;
    }

    return false;
}
