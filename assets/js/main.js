const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

let canvasSize;
let elementsSize;

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

/* ----- FUNCTIONS ----- */
function startGame() {
    /* Insert elements with emojis */
    game.font = `${elementsSize}px Verdana`;

    /* Transform each map into a two-dimensional array */
    const map = maps[0];
    const mapRows = map.trim().split("\n")
    const mapRowsCol = mapRows.map(row => row.trim().split(""));

    /* Print each element of the map with the corresponding emoji */
    mapRowsCol.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = elementsSize * colIndex;
            const posY = elementsSize * (rowIndex + 1);
            game.fillText(emoji, posX, posY);
        });
    });
}

function setCanvasSize() {
    /* Responsive canvas */
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else if (window.innerHeight < window.innerWidth) {
        canvasSize = window.innerHeight * 0.8;
    }
    canvas.setAttribute("width", canvasSize);
    canvas.setAttribute("height", canvasSize);

    /* Responsive elements */
    elementsSize = (canvasSize / 10) - 2;

    startGame();
}