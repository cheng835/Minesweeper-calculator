import {flagCounter, flagChecker, getNeighbors, getTiles, getData} from "./logic.js";

/*listeners*/
export function listenLeftClick(tile) {
    tile.el.addEventListener("click", () => handleLeftClick(tile));
}

export function listenRightClick(tile) {
        tile.el.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        handleRightClick(tile);
        /*prevents it from its usual behavior of right click opening up the browser menu*/
    })
}

export function listenDoubleClick(tile) {
    let leftDown = false;
    let rightDown = false;
    tile.el.addEventListener("mousedown", (e) =>  {
        if(e.button === 0)
            leftDown = true;
        if(e.button === 2)
            rightDown = true;
        if(leftDown && rightDown) {
            e.preventDefault();
            handleDoubleClick(tile);
        }
    })

    tile.el.addEventListener("mouseup", (e) => {
        const wasDoubleClicked = leftDown && rightDown;
        if(e.button === 0)
            leftDown = false;
        if(e.button === 2)
            rightDown === false;
        if(wasDoubleClicked) {
            e.preventDefault();
            unhighlightNeighbors(tile);
        }
    })
}

/*event handlers*/
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

function handleRightClick(tile) {
    if(tile.clicked) return;

    tile.flagged = !tile.flagged;
    tile.el.classList.toggle("flag", tile.flagged);
}

function handleDoubleClick(tile) {
    const tiles = getTiles();

    if(!tile.flagged && flagCounter(tile))
        flagChecker(tile);
    else {
        for(const[row, col] of getNeighbors(tile)) {
            const t = tiles[row][col];
            if(!t.clicked && !t.flagged)
                t.el.classList.add("clicked");
        }
    }
}

function unhighlightNeighbors(tile) {
    const tiles = getTiles();

    for(const[row, col] of getNeighbors(tile)) {
        const t = tiles[row][col];
        /*console.log(t);*/
        if(!t.clicked && !t.flagged)
                t.el.classList.remove("clicked");
        }
}

