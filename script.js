console.log("TEST");

import { initMouseState, listenHover, listenLeftClick, listenRightClick } from "./js/event.js";
import {initBoard, getData, getTiles} from "./js/state.js";

export function createTile(row, col, data) {
    const value = data.solvedBoard[row][col];

    const tile = {
        row,
        col,
        value,
        flagged: false,
        clicked: false,
        el: document.createElement("div")
    }

    tile.el.classList.add("tile");
    tile.el.dataset.row = row;
    tile.el.dataset.col = col;
    return tile;
    
}

export async function getBoard() {
    const response = await fetch("data.json", {cache: "no-store"});
    /*cache so it updates with new info from data.json*/
    const data = await response.json();
    return data;
}

export async function createBoard(data) {
    const board = document.getElementById("board");
    board.style.gridTemplateColumns = `repeat(${data.cols}, 16px)`;

    const tiles = [];

    for(let r = 0; r < data.rows; r++) {
        const rowArr = [];
        //this gets you a grid instead of list
        for(let c = 0; c < data.cols; c++)
        {
            const tile = createTile(r, c, data);
            board.appendChild(tile.el);
            rowArr.push(tile);
            
        }
        tiles.push(rowArr);
    }
    return tiles;
}

await initBoard();
const tiles = getTiles();
initMouseState();
for(const row of tiles) {
    for(const tile of row) {
        listenHover(tile);
        listenLeftClick(tile);
        listenRightClick(tile);
    }
}