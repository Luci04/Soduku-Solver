var board = [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0]
];

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

function print(board, size) {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            console.log(board[i][j]);
        }
    }
}

function solveSudoku(board, row, col) {
    if (row == 9) {
        print(board, 9);
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

solveSudoku(board, 0, 0);

// print(board, 9);

console.log("Avinash")