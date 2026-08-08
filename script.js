import { handleLeftClick, handleRightClick, handleDoubleClick } from "./js/event.js";
import {init} from "./js/logic.js";

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

    /*turn all these listeners into functions inside event.js*/
    tile.el.addEventListener("click", () => handleLeftClick(tile));
    tile.el.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        handleRightClick(tile);
        /*prevents it from its usual behavior of right click opening up the browser menu*/
    })

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
        console.log("test");
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

/*console.log("board created");*/
const data = await getBoard();
const tiles = await createBoard(data);
init(data, tiles);