import ObjectGraphique from "./ObjectGraphique.js";

export default class Player extends ObjectGraphique {
    constructor(x, y) {
        super(x, y, 80, 80);
        this.vitesseX = 0;
        this.vitesseY = 0;

        // Load GIFs for each direction
        this.gifs = {
            up: new Image(),
            left: new Image(),
            down: new Image(),
            right: new Image()
        };
        this.gifs.up.src = "https://zeidxn.github.io/Key-hunter-JS/assets/images/player/walk-up.gif";
        this.gifs.left.src = "https://zeidxn.github.io/Key-hunter-JS/assets/images/player/walk-left.gif";
        this.gifs.down.src = "https://zeidxn.github.io/Key-hunter-JS/assets/images/player/walk-down.gif";
        this.gifs.right.src = "https://zeidxn.github.io/Key-hunter-JS/assets/images/player/walk-right.gif";

        // Default direction
        this.currentGif = this.gifs.down;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.translate(-this.w / 2, -this.h / 2);

        ctx.drawImage(this.currentGif, 0, 0, this.w, this.h);

        ctx.restore();
    }

    move() {
        // Update position
        this.x += this.vitesseX;
        this.y += this.vitesseY;

        // Determine the correct GIF based on movement direction
        if (this.vitesseY < 0) {
            this.currentGif = this.gifs.up; // Up
        } else if (this.vitesseX < 0) {
            this.currentGif = this.gifs.left; // Left
        } else if (this.vitesseY > 0) {
            this.currentGif = this.gifs.down; // Down
        } else if (this.vitesseX > 0) {
            this.currentGif = this.gifs.right; // Right
        }
    }
}