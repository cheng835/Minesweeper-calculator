import {getNeighbors} from "./logic.js"
import {getData, getTiles} from "./state.js"

export function floodFill (tile) {
    const data = getData();
    const tiles = getTiles();

    openNeighbors(tile, tiles, data);
}

function openNeighbors(tile, tiles, data) {

    displayValue(tile);
    if(tile.value !== 0) return;

    for(const[row, col] of getNeighbors(tile)) {
        // console.log("checking neighbors for: ", tile.row, tile.col);
        const t = tiles[row][col];
        // console.log("current checking: ", t.row, t.col);
        if(!t.clicked && !t.flagged) {
            // console.log("t isnt clicked or flagged");
            t.clicked = true;
            displayValue(t);
            if(t.value === 0) {
                openNeighbors(t, tiles, data);
            }
        } 
    }
}

export function displayValue(tile) {
    // console.log("displaying value: ", tile.value);
    switch(tile.value) {
            case 0: tile.el.classList.add("clicked"); break;
            case 1: tile.el.classList.add("num1"); break;
            case 2: tile.el.classList.add("num2"); break;
            case 3: tile.el.classList.add("num3"); break;
            case 4: tile.el.classList.add("num4"); break;
            case 5: tile.el.classList.add("num5"); break;
            case 6: tile.el.classList.add("num6"); break;
            case 7: tile.el.classList.add("num7"); break;
        }
}