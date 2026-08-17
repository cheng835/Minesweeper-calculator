import { handleLeftClick } from "./event.js";
import {getData, getTiles} from "./state.js"

/*this function checks of the number of flags matches the value of the tile*/
export function flagCounter(tile) {
    if(tile.clicked === false) return;
    const boardData = getData();
    const boardTiles = getTiles();

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
/*function checks whether the flags are in the right places returns true or false*/
export function flagChecker(tile) {
    if(tile.clicked === false) return;
    const boardData = getData();
    const boardTiles = getTiles();
    let logic = true;

    for(const [row, col] of getNeighbors(tile)) {
        const t = boardTiles[row][col];
        if((boardData.solvedBoard[row][col] === -1) && (!t.flagged)) {
            t.el.classList.add("clickedBomb");
            logic = false;
        }
        if((t.flagged) && (boardData.solvedBoard[row][col] !== -1)) {
            t.el.classList.add("wrongBomb");
            logic = false;
        }

    }
    if(!logic) {
        showBombs();
    }
    else {
        for(const [row, col] of getNeighbors(tile)) {
            handleLeftClick(boardTiles[row][col]);
        }
    }

    return logic;
}

export function showBombs() {
    const boardData = getData();
    const boardTiles = getTiles();
    
    for (let r = 0; r < boardTiles.length; r++) {
            for(let c = 0; c < boardTiles[r].length; c++) {
                const t = boardTiles[r][c];
                if(t.value === -1 && !t.flagged)
                    boardTiles[r][c].el.classList.add("bomb");
            }        
        }
}

export function getNeighbors(tile) {
    const boardData = getData();
    const boardTiles = getTiles();

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