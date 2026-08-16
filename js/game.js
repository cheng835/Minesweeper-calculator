import {getNeighbors} from "./logic.js"
import {getData, getTiles} from "./state.js"

export function floodFill (tile) {
    const data = getData();
    const tiles = getTiles();

    openNeighbors(tile, tiles, data);
}

function openNeighbors(tile, tiles, data) {
    if(tile.value != 0) return;

    for(const[row, col] of getNeighbors(tile)) {
        const t = tiles[row][col];
        if(!t.clicked && !t.flagged) {
            t.clicked = true;
            t.el.classList.add("clicked");
        }
        if(t.value == 0)
            openNeighbors(tile, tiles, data);    

    }
}