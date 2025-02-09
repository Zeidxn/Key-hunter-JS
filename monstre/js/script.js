import Monstre from "./Monstre.js";

// Bonne pratique : avoir une fonction appelée une fois
// que la page est prête, que le DOM est chargé, etc.
window.onload = init;

async function init() {
    // On recupère le canvas
    let canvas = document.querySelector("#monstreCanvas");

    // On cree une instance du jeu
    let monstre = new Monstre(canvas);
    // ici on utilise await car la méthode init est asynchrone
    // typiquement dans init on charge des images, des sons, etc.
    await monstre.init();

    // on peut démarrer le jeu
    monstre.start();
}