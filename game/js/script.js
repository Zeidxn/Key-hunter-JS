import Game from "./Game.js";

window.onload = async function() {
    const canvas = document.getElementById('myCanvas');
    const game = new Game(canvas);
    await game.init();
    game.start();
};

