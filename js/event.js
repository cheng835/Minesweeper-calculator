import {flagCounter, flagChecker, getNeighbors, getTiles, getData} from "./logic.js";

export function handleLeftClick(tile) {
    if (tile.flagged || tile.clicked) return;

    tile.clicked = true; //sets property to clicked
    if(tile.value == -1) {
        tile.el.classList.add("clickedBomb");
    } else {
        switch(tile.value){
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
}

export function handleRightClick(tile) {
    if(tile.clicked) return;

    tile.flagged = !tile.flagged;
    tile.el.classList.toggle("flag", tile.flagged);
}

export function handleDoubleClick(tile) {
    if(tile.flagged) return;
    const tiles = getTiles();
    console.log("mousedown");
    if(flagCounter(tile))
        flagChecker(tile);
    else {
        for(const[row, col] of getNeighbors(tile)) {
            const t = tiles[row][col];
            if(!t.clicked && !t.flagged)
                t.el.classList.add("clicked");
        }
    }
}

