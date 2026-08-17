import {flagCounter, flagChecker, showBombs, getNeighbors} from "./logic.js";
import {getTiles, getData} from "./state.js"
import {floodFill} from "./game.js"

let hoverTile = null; //tile currently under cursor
let chordAnchor = null; //tile that is being highlighted
let chording = false; //the double click motion: true when both buttons are down
let locked = false; //true from when chording starts until both buttons are up
let suppressClick = false;
let suppressContext = false;
let gameEnd = false;

export function initMouseState() {
    document.addEventListener("mousedown", onDocumentMouseDown);
    document.addEventListener("mouseup", onDocumentMouseUp);
    /*document means for the entire HTML page listen for these events and if so run those function*/
}

/*allows highlight to follow wherever the mouse chord is hovering*/
export function listenHover(tile) {
    tile.el.addEventListener("mouseenter", () => {
        if(gameEnd) return;
        hoverTile = tile;
        if(chording) {
            unhighlightNeighbors(chordAnchor);
            chordAnchor = tile;
            highlightNeighbors(chordAnchor);
        }
    });
    tile.el.addEventListener("mouseleave", () => {
        if(hoverTile === tile) hoverTile = null;
    });
}

export function listenLeftClick(tile) {
    tile.el.addEventListener("click", () => {
        // console.log("gameEnd: ", gameEnd);
        if(gameEnd) return;
        if(suppressClick) {
            suppressClick = false;
            return;
            // edge case: chord, let go of left without letting go of right, click left again, and repeat would it break?
            //answer: no, clicking again just reactivate the chord, suppressing the click again
        }
        handleLeftClick(tile);
    });
}

export function listenRightClick(tile) {
    tile.el.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if(gameEnd) return;
        if(suppressContext) {
            suppressContext = false;
            return;
        }
        handleRightClick(tile);
    });
}

/*detects the first instant when a user starts double clicking on a tile*/
function onDocumentMouseDown(e) {
    if(gameEnd) return;

    //e holds all the buttons currently held down
    if(e.buttons === 3 && !chording && hoverTile) {
        //buttons left(1) and right(2) are held, and cursor is currently hovering a tile 
        e.preventDefault();
        chording = true;
        locked = true;
        chordAnchor = hoverTile;
        highlightNeighbors(chordAnchor);
    }
}

function onDocumentMouseUp(e) {
    if(gameEnd) return;

    if(chording) {
        unhighlightNeighbors(chordAnchor);
        chording = false;
        if(hoverTile === chordAnchor) {
            resolveChord(hoverTile);
            //if you release on the same tile you double clicked it will open up neighbors
        }
        chordAnchor = null;
        suppressClick = true;
        suppressContext = true;
    }
    if(e.buttons === 0) { //both buttons up
        locked = false;
    }
}

export function handleLeftClick(tile) {
    console.log("left click");
    if(tile.flagged || tile.clicked) return;

    tile.clicked = true;
    if(tile.value === -1) {
        tile.el.classList.add("clickedBomb");
        gameEnd = true;
        showBombs();
    } 
    else {
        floodFill(tile);
    }
}

export function handleRightClick(tile) {
    console.log("right click");
    if(tile.clicked) return;
    tile.flagged = !tile.flagged;
    tile.el.classList.toggle("flag", tile.flagged);
}

function resolveChord(tile) {
    if(tile.value === 0) return;
    if(tile.clicked && !tile.flagged && flagCounter(tile)) {
        //tile is clicked, not flagged, and # of flags matches value
        gameEnd = !flagChecker(tile); //returns whether flags are correct or not
    }
}

function highlightNeighbors(tile) {
    const tiles = getTiles();

    if(!tile.clicked && !tile.flagged)
        tile.el.classList.add("clicked");
    for(const[row, col] of getNeighbors(tile)) {
        const t = tiles[row][col];
        if(!t.clicked && !t.flagged)
            t.el.classList.add("clicked");
    }
    // console.log("highlighting");
}

function unhighlightNeighbors(tile) {
    const tiles = getTiles();

    if(!tile.clicked && !tile.flagged)
        tile.el.classList.remove("clicked");
    for(const[row, col] of getNeighbors(tile)) {
        const t = tiles[row][col];
        if(!t.clicked && !t.flagged)
                t.el.classList.remove("clicked");
    }
    // console.log("unhighlighting");
}