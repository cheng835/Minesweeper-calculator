import {getBoard, createBoard} from "../script.js"

let boardData = null;
let boardTiles = null;

/*so i dont have to pass data and tiles into every function in here*/
export async function initBoard() {
    boardData = await getBoard();
    boardTiles = await createBoard(boardData);
}

export function getData() {
    return boardData;
}

export function getTiles() {
    return boardTiles;
}
