import Obstacle from "./Obstacle.js";


export default class MovingObstacle extends Obstacle {
    constructor(x, y, width, height, speedX, speedY, canvas) {
        super(x, y, width, height);
        this.speedX = speedX; // Vitesse horizontale
        this.speedY = speedY; // Vitesse verticale
        this.canvas = canvas;
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Faire rebondir l'obstcle quand il atteint les bords de l'écran
        if (this.x <= 0 || this.x + this.w >= this.canvas.width) {
            this.speedX = -this.speedX;
        }
        if (this.y <= 0 || this.y + this.h >= this.canvas.height) {
            this.speedY = -this.speedY;
        }
    }
}
