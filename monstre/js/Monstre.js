import { initListeners } from "../../game/js/ecouteurs.js";
export default class Game {

    constructor(canvas) {
        this.canvas = canvas;
        this.x=100;
        this.y=100;
        this.inputStates = {};

    }

    async init(canvas) {
        this.ctx = this.canvas.getContext("2d");
        this.inputStates = {
            mouseX: 0,
            mouseY: 0,
        };

        initListeners(this.inputStates, this.canvas);
        console.log("Game initialisé");
    }

    start() {
        console.log("Game démarré");

        // On démarre une animation à 60 images par seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    mainAnimationLoop() {
        // 1 - on efface le canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 2 - on dessine les objets à animer dans le jeu
        // ici on dessine le monstre
        this.drawAllObjects(this.x,this.y);

        // 3 - On regarde l'état du clavier, manette, souris et on met à jour
        // l'état des objets du jeu en conséquence
        this.update();

        // 4 - on demande au navigateur d'appeler la fonction mainAnimationLoop
        // à nouveau dans 1/60 de seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    drawAllObjects(x, y) {
        this.ctx.save();
        this.ctx.translate(x, y);

        // Tête
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(25, 10, 50, 40);

        // Yeux
        this.ctx.fillStyle = "yellow";
        this.ctx.fillRect(35, 20, 10, 10);
        this.ctx.fillRect(55, 20, 10, 10);

        // Pupilles
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(38, 23, 4, 4);
        this.ctx.fillRect(58, 23, 4, 4);

        // Bouche noire
        this.ctx.fillRect(40, 40, 20, 5);

        // Cornes rouges
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(25, 0, 10, 20);
        this.ctx.fillRect(65, 0, 10, 20);

        // Corps
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(10, 50, 80, 100);

        // Bras
        this.ctx.fillRect(-20, 70, 30, 20); // Bras gauche
        this.ctx.fillRect(90, 70, 30, 20); // Bras droit

        // Jambes
        this.ctx.fillRect(25, 150, 20, 40); // Jambe gauche
        this.ctx.fillRect(55, 150, 20, 40); // Jambe droite

        // Pieds
        this.ctx.fillRect(25, 190, 20, 10); // Pied gauche
        this.ctx.fillRect(55, 190, 20, 10); // Pied droit

        this.ctx.restore();
    }


    update() {
        // Appelée par mainAnimationLoop
        // donc tous les 1/60 de seconde

        // Déplacement du joueur.
        this.movePlayer();


        // On regarde si le joueur a atteint la sortie
        // TODO

    }

    movePlayer() {
        // On déplace le joueur en fonction de l'état du clavier
        if (this.inputStates.ArrowUp) {
            this.y -= 5;
        }
        if (this.inputStates.ArrowDown) {
            this.y += 5;
        }
        if (this.inputStates.ArrowLeft) {
            this.x -= 5;
        }
        if (this.inputStates.ArrowRight) {
            this.x += 5;
        }
    }


}