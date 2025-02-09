import ObjectGraphique from './ObjectGraphique.js';

export default class End extends ObjectGraphique {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.image = new Image();
        this.image.src = "./../../assets/images/item-end.png";
    }

    draw(ctx) {
        ctx.save();
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
        ctx.restore();
    }
}