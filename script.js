function createTile(row, col, data) {
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

    tile.el.addEventListener("click", () => handleLeftClick(tile));
    tile.el.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        handleRightClick(tile);
        /*prevents it from its usual behavior of right click opening up the browser menu*/
    })

    return tile;
}

function handleLeftClick(tile) {
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

async function createBoard() {
    const response = await fetch("data.json", {cache: "no-store"});
    /*cache bc it wouldnt update with new info from data.json*/

    const data = await response.json();

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
}

createBoard();