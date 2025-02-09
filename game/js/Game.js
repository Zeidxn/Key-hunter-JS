import Player from "./Player.js";
import Obstacle from "./Obstacle.js";
import { rectsOverlap } from "./collisions.js";
import { initListeners } from "./ecouteurs.js";
import End from "./End.js";
import MovingObstacle from "./MovingObstacle.js";
export default class Game {
    objetsGraphiques = [];
    movingObstacles = [];
    isGameOver = false;
    currentLevel = 1;
    life = 3;
    maxLife = 3;

    constructor(canvas) {
        this.canvas = canvas;
        this.inputStates = {
            mouseX: 0,
            mouseY: 0,
        };
    }

    async init(canvas) {
        this.ctx = this.canvas.getContext("2d");
        this.loadLevel(this.currentLevel);
        this.displayLoadMessage();
        initListeners(this.inputStates, this.canvas);
        console.log("Game initialisé");

        document.querySelector("#retryButton").addEventListener("click", () => {
            this.resetGame(); // Réinitialiser le jeu
            document.querySelector("#gameOverScreen").classList.remove("show"); // Masquer l'écran de game over
        });

        document.querySelector("#retryButtonWin").addEventListener("click", () => {
            document.querySelector("#winScreen").classList.remove("show"); // Masquer l'écran de victoire
            this.resetGame(); // Réinitialiser le jeu

        });
    }

    loadLevel(level) {
        this.objetsGraphiques = [];
        this.movingObstacles = [];

        this.player = new Player(0, 0);
        this.player.x = 0;
        this.player.y = 0;
        this.player.vitesseX = 0;
        this.player.vitesseY = 0;
        this.objetsGraphiques.push(this.player);


        if (level === 1) {
            // Niveau 1 - Obstacles statiques
            this.objetsGraphiques.push(new Obstacle(300, 0, 40, 600));
            this.objetsGraphiques.push(new Obstacle(500, 500, 100, 100));
            this.objetsGraphiques.push(new Obstacle(200, 400, 50, 50));
            this.objetsGraphiques.push(new Obstacle(30, 550, 70, 70));
            this.objetsGraphiques.push(new Obstacle(400, 200, 60, 60));
            this.objetsGraphiques.push(new Obstacle(700, 300, 70, 70));
            this.objetsGraphiques.push(new End(700, 100, 50, 50)); // Déplacement de l'arrivée
        } else if (level === 2) {
            // Niveau 2 - Obstacles mobiles et plus nombreux
            this.objetsGraphiques.push(new Obstacle(500, 0, 40, 600));
            this.objetsGraphiques.push(new Obstacle(150, 500, 60, 60));
            this.objetsGraphiques.push(new Obstacle(350, 200, 60, 60));
            this.objetsGraphiques.push(new Obstacle(130, 200, 60, 180));

            this.objetsGraphiques.push(new Obstacle(700, 250, 100, 100));
            this.objetsGraphiques.push(new Obstacle(600, 500, 80, 80));
            this.objetsGraphiques.push(new End(700, 100, 50, 50)); // Nouvelle position de l'arrivée
        } else if (level === 3) {
            // Niveau 3 - Obstacles mobiles et plus complexes
            this.objetsGraphiques.push(new Obstacle(400, 0, 40, 600));
            this.objetsGraphiques.push(new Obstacle(300, 300, 50, 50));
            this.objetsGraphiques.push(new Obstacle(100, 500, 80, 80));
            this.objetsGraphiques.push(new Obstacle(650, 250, 100, 100));
            this.objetsGraphiques.push(new Obstacle(450, 400, 50, 50));
            this.objetsGraphiques.push(new Obstacle(500, 100, 60, 60));

            // Obstacles mobiles
            const movingObstacle1 = new MovingObstacle(300, 100, 60, 60, 2, 0, this.canvas); // Se déplace horizontalement
            const movingObstacle2 = new MovingObstacle(500, 300, 60, 60, 0, 2, this.canvas); // Se déplace verticalement
            const movingObstacle3 = new MovingObstacle(600, 100, 80, 80, -2, 0, this.canvas); // Se déplace horizontalement

            // Ajout des obstacles mobiles dans le tableau dédié
            this.movingObstacles.push(movingObstacle1, movingObstacle2, movingObstacle3);

            // Ajout des obstacles mobiles à la scène
            this.objetsGraphiques.push(...this.movingObstacles);

            this.objetsGraphiques.push(new End(700, 100, 50, 50)); // Arrivée dans un coin difficile
        }
    }

    start() {
        console.log("Game démarré");
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    mainAnimationLoop() {
        if (this.isGameOver) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawAllObjects();
        this.update();
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    drawAllObjects() {
        this.objetsGraphiques.forEach(obj => {
            obj.draw(this.ctx);
        });

        // Dessiner la barre de vie
        this.drawHealthBar();
    }

    drawHealthBar() {
        // Dessiner la barre de vie
        const barWidth = 200; // Largeur de la barre
        const barHeight = 20; // Hauteur de la barre
        const barX = 10; // Position X
        const barY = this.canvas.height - barHeight - 10; // Position Y (en bas de l'écran)

        // Dessiner le fond de la barre de vie
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(barX, barY, barWidth, barHeight);

        // Dessiner la barre de vie
        const lifeWidth = (this.life / this.maxLife) * barWidth; // Calcul de la largeur de la barre en fonction des vies
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(barX, barY, lifeWidth, barHeight);
    }

    update() {
        this.movePlayer();

        // Déplacer tous les obstacles mobiles
        this.movingObstacles.forEach(movingObstacle => {
            movingObstacle.move();
        });
    }

    movePlayer() {
        this.player.vitesseX = 0;
        this.player.vitesseY = 0;

        if (this.inputStates.ArrowRight) {
            this.player.vitesseX = 7;
        }
        if (this.inputStates.ArrowLeft) {
            this.player.vitesseX = -7;
        }
        if (this.inputStates.ArrowUp) {
            this.player.vitesseY = -7;
        }
        if (this.inputStates.ArrowDown) {
            this.player.vitesseY = 7;
        }

        this.player.move();
        this.testCollisionsPlayer();
    }

    testCollisionsPlayer() {
        this.testCollisionPlayerBordsEcran();
        this.testCollisionPlayerObstacles();
    }

    testCollisionPlayerBordsEcran() {
        if (this.player.x - this.player.w / 2 < 0) {
            this.player.vitesseX = 0;
            this.player.x = this.player.w / 2;
        }
        if (this.player.x + this.player.w / 2 > this.canvas.width) {
            this.player.vitesseX = 0;
            this.player.x = this.canvas.width - this.player.w / 2;
        }
        if (this.player.y - this.player.h / 2 < 0) {
            this.player.vitesseY = 0;
            this.player.y = this.player.h / 2;
        }
        if (this.player.y + this.player.h / 2 > this.canvas.height) {
            this.player.vitesseY = 0;
            this.player.y = this.canvas.height - this.player.h / 2;
        }
    }

    testCollisionPlayerObstacles() {
        this.objetsGraphiques.forEach(obj => {
            // Test de collision avec la sortie (End) uniquement pour le player
            if (obj instanceof End) {
                if (rectsOverlap(this.player.x - this.player.w / 2, this.player.y - this.player.h / 2, this.player.w, this.player.h, obj.x, obj.y, obj.w, obj.h)) {
                    this.isGameOver = true;
                    console.log("Collision avec la sortie");
                    this.displayVictoryMessage(); // Affichage du message de victoire
                }
            }

            // Test de collision avec les obstacles (Obstacles) pour le player uniquement
            if (obj instanceof Obstacle || obj instanceof MovingObstacle) {
                if (rectsOverlap(this.player.x - this.player.w / 2, this.player.y - this.player.h / 2, this.player.w, this.player.h, obj.x, obj.y, obj.w, obj.h)) {
                    if (this.life > 1) {
                        console.log("Collision avec obstacle");
                        this.life--; // Baisser la vie
                        this.player.x = 0;
                        this.player.y = 0;
                        this.player.vitesseX = 0;
                        this.player.vitesseY = 0;
                    } else {
                        console.log("Collision avec obstacle");
                        this.isGameOver = true;

                        let gameOverScreen = document.querySelector("#gameOverScreen");
                        gameOverScreen.classList.add("show");

                        document.querySelector(".retryButton").addEventListener("click", () => {
                            gameOverScreen.classList.remove("show");
                            this.resetGame();
                        });
                    }
                }
            }
        });
    }

    displayVictoryMessage() {
        let transitionScreen = document.querySelector("#levelTransition");
        let winScreen = document.querySelector("#winScreen");

        if (this.currentLevel < 3) {
            this.currentLevel++;
            this.displayLoadMessage();
        } else {
            winScreen.classList.add("show");
        }

        setTimeout(() => {
            if (this.currentLevel <= 3) {
                this.isGameOver = false;
                transitionScreen.classList.remove("show");
                this.loadLevel(this.currentLevel);
                this.start();
            }
        }, 2000); // Afficher pendant 2 secondes
    }



    resetGame() {
        console.log("Réinitialisation du jeu");
        this.isGameOver = false;
        this.currentLevel = 1;
        this.life = 3;
        this.loadLevel(this.currentLevel);
        this.start();
    }

    displayLoadMessage() {
        let numNiveau = document.querySelector("#levelNumber");
        numNiveau.textContent = this.currentLevel;
        let transitionScreen = document.querySelector("#levelTransition");
        transitionScreen.classList.add("show");
        setTimeout(() => {
            transitionScreen.classList.remove("show");
        },2000);
    }
}
