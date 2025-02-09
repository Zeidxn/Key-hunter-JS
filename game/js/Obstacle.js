import ObjectGraphique from "./ObjectGraphique.js";

export default class Obstacle extends ObjectGraphique {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.image = new Image();
        this.image.src = h > w ? "https://zeidxn.github.io/Key-hunter-JS/assets/images/obstacles/wall-rect-1.png" : "https://zeidxn.github.io/Key-hunter-JS/assets/images/obstacles/wall-1.png";
    }

    draw(ctx) {
        ctx.save();

        if (this.h > this.w) {
            // Si c'est un rectangle (plus haut que large), on applique un motif répété
            const pattern = ctx.createPattern(this.image, "repeat");
            if (pattern) {
                ctx.fillStyle = pattern;
                ctx.fillRect(this.x, this.y, this.w, this.h);
            }
        } else {
            // Sinon (carré ou autre), on dessine l'image normalement
            ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
        }
        ctx.fillStroke = "black";
        ctx.strokeRect(this.x + 0.5, this.y + 0.5, this.w - 1, this.h - 1);
        ctx.restore();
    }
}