const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

let canvasSize;
let elementsSize;

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function startGame() {
    /* Insert elements with emojis */
    game.font = `${elementsSize}px Verdana`;
    game.textAlign = "";

    for (let i = 0; i < 10; i++) {
        game.fillText(emojis["X"], elementsSize * i, elementsSize);
    }
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