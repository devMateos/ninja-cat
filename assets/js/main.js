const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const buttonsDiv = document.querySelector(".btns");
const buttons = buttonsDiv.querySelectorAll("*");

let canvasSize;
let elementsSize;

const playerPosition = {
    x: undefined,
    y: undefined,
    playerCol: undefined,
    playerRow: undefined,
}

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

/* ----- FUNCTIONS ----- */
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

            //I associate the column and row index (plus one), instead of a fixed position. So I can calculate the initial position of the player by multiplying this index by the variable "elementsSize"
            if (playerPosition.playerCol === undefined && playerPosition.playerRow === undefined && col == "O") {
                playerPosition.playerCol = colIndex;
                playerPosition.playerRow = rowIndex + 1;
            }

            game.fillText(emoji, posX, posY);
        });
    });
    movePlayer();
}

/* Movement functions */
document.addEventListener("keydown", (event) => {
    if (event.key === "w" || event.key === "ArrowUp") moveUp();
    else if (event.key === "a" || event.key === "ArrowLeft") moveLeft();
    else if (event.key === "d" || event.key === "ArrowRight") moveRight();
    else if (event.key === "s" || event.key === "ArrowDown") moveDown();
})
buttons[0].addEventListener("click", moveUp);
buttons[1].addEventListener("click", moveLeft);
buttons[2].addEventListener("click", moveRight);
buttons[3].addEventListener("click", moveDown);

function movePlayer() {
    //The reason for doing it this way, instead of associating the x and y position of the player to a fixed value, is that in this way we can make the size of the skull (player avatar) also adjust when resizing the screen
    playerPosition.x = elementsSize * playerPosition.playerCol;
    playerPosition.y = elementsSize * playerPosition.playerRow;
    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
    console.log(playerPosition);
}

function moveUp() {
    console.log("arriba");
    if (playerPosition.playerRow > 1) {
        playerPosition.playerRow -= 1;
        movePlayer();
        setCanvasSize();
    }
}
function moveLeft() {
    console.log("izquierda");
    if (playerPosition.playerCol >= 1) {
        playerPosition.playerCol -= 1;
        movePlayer();
        setCanvasSize();
    }
}
function moveRight() {
    console.log("derecha");
    if (playerPosition.playerCol < 9) {
        playerPosition.playerCol += 1;
        movePlayer();
        setCanvasSize();
    }
}
function moveDown() {
    console.log("abajo");
    if (playerPosition.playerRow <= 9) {
        playerPosition.playerRow += 1;
        movePlayer();
        setCanvasSize();
    }
}
