import { handleLeftClick } from "./event.js";

let boardData;
let boardTiles;
/*so i dont have to pass data and tiles into every function in here*/

export function init(data, tiles) {
    boardData = data;
    boardTiles = tiles;
}

export function getTiles() {
    return boardTiles;
}

export function getData() {
    return boardData;
}

export function flagCounter(tile) {
    let bombTotal = 0;
    let flagTotal = 0;

    for(const [row, col] of getNeighbors(tile)) {
        if(boardData.solvedBoard[row][col] == -1) {
            bombTotal += 1;
        }
        if(boardTiles[row][col].flagged) {
            flagTotal += 1;
        }

    }
    return bombTotal == flagTotal;
}

/*this command assumes flagCounter returns true*/
export function flagChecker(tile) {
    let logic = true;

    for(const [row, col] of getNeighbors(tile)) {
        if((boardData.solvedBoard[row][col] === -1) && (!boardTiles[row][col].flagged)) {
            tile.el.classList.add("clickedBomb");
            logic = false;
        }
        if((boardTiles[row][col].flagged) && (boardData.solvedBoard[row][col] !== -1)) {
            tile.el.classList.add("wrongBomb");
            logic = false;
        }

    }
    if(!logic) {
        for (let r = 0; r < boardTiles.length; r++) {
            for(let c = 0; c < boardTiles[r].length; c++) {
                if(boardTiles[r][c].value === -1)
                    boardTiles[r][c].el.classList.add("revealedBomb");
            }        
        }
    }
    else {
        for(const [row, col] of getNeighbors(tile)) {
            handleLeftClick(boardTiles[row][col]);
        }
    }

}

export function getNeighbors(tile) {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1], 
        [0, -1],           [0, 1],
        [1, -1], [1, 0], [1, 1]
    ]

    const neighbors = [];
    for(const [rowOffset, colOffset] of directions) {
        const rowCheck = tile.row + rowOffset;
        const colCheck = tile.col + colOffset;

        if((0 <= rowCheck && rowCheck < boardData.rows) && (0 <= colCheck && colCheck < boardData.cols)) {
            neighbors.push([rowCheck, colCheck]);
        }
    }

    return neighbors;
}