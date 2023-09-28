const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const buttonsDiv = document.querySelector(".btns");
const buttons = buttonsDiv.querySelectorAll("*");

const spanLives = document.querySelector("#lives");

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

const playerPosition = {
    x: undefined,
    y: undefined,
    col: undefined,
    row: undefined,
};
const giftPosition = {
    x: undefined,
    y: undefined,
    col: undefined,
    row: undefined,
};
let bombsPosition = [];

let collision = false;

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

    showLives();

    const map = maps[level];

    /* Check if all levels have been passed */
    if (level >= maps.length) {
        winGame();
        return;
    }

    /* Transform each map into a two-dimensional array */
    const mapRows = map.trim().split("\n")
    const mapRowsCol = mapRows.map(row => row.trim().split(""));

    bombsPosition = [];

    /* Print each element of the map with the corresponding emoji */
    mapRowsCol.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = elementsSize * colIndex;
            const posY = elementsSize * (rowIndex + 1);

            //I associate the column and row index (plus one), instead of a fixed position. So I can calculate the initial position of the player by multiplying this index by the variable "elementsSize"
            if (playerPosition.col === undefined && playerPosition.row === undefined && col == "O") {
                playerPosition.col = colIndex;
                playerPosition.row = rowIndex + 1;
            } else if (col === "I") {
                giftPosition.col = colIndex;
                giftPosition.row = rowIndex + 1;
            } else if (col === "X") {
                bombsPosition.push({
                    col: colIndex,
                    row: rowIndex + 1,
                });
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
    playerPosition.x = elementsSize * playerPosition.col;
    playerPosition.y = elementsSize * playerPosition.row;

    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);

    collision = bombsPosition.find((e) => {
        return e.col === playerPosition.col && e.row === playerPosition.row;
    })

    winLevel();
    lose();
}
;
function moveUp() {
    if (playerPosition.row > 1) {
        playerPosition.row -= 1;
        movePlayer();
        setCanvasSize();
    }
};
function moveLeft() {
    if (playerPosition.col >= 1) {
        playerPosition.col -= 1;
        movePlayer();
        setCanvasSize();
    }
}
function moveRight() {
    if (playerPosition.col < 9) {
        playerPosition.col += 1;
        movePlayer();
        setCanvasSize();
    }
}
function moveDown() {
    if (playerPosition.row <= 9) {
        playerPosition.row += 1;
        movePlayer();
        setCanvasSize();
    }
};

/* win functions */
function winLevel() {
    if (playerPosition.col === giftPosition.col && playerPosition.row === giftPosition.row) {
        game.clearRect(0, 0, canvasSize, canvasSize);
        level++;
        startGame();
    }
}
function winGame() {
    game.textAlign = "center";
    game.fillText(emojis["WIN"], canvasSize / 2, (canvasSize / 2) - elementsSize);
    game.fillText("You win!", canvasSize / 2, (canvasSize / 2 + elementsSize));
}

/* lose functions */
function lose() {
    if (collision) {
        playerPosition.col = undefined;
        playerPosition.row = undefined;
        if (lives > 1) {
            lives--;
            startGame();
        } else {
            level = 0;
            lives = 3;
            startGame();
        }
        console.log(lives);
    }
};

function showLives() {
    let heartsArray = [];
    for (let l = lives; l > 0; l--) {
        heartsArray.push(emojis["LIFE"]);
    };
    const showHearts = heartsArray.join(" ");
    spanLives.innerText = showHearts;
}