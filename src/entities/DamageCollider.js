import Entity from "./Entity.js";

export default class DamageCollider extends Entity {
    constructor(x, y, width, height, sprite = null, lifetime = 0.1, source = null) {
        super(x,y,width,height);
        this.sprite = sprite;
        this.lifetime = lifetime;
        this.age = 0;
        this.isActive = true;
        this.source = source;
    }

    update(dt) {
        this.age += dt;
        if (this.age >= this.lifetime) {
            this.isActive = false;
        }
    }

    render(context) {
        if (this.sprite) {
            this.sprite.render(this.position.x, this.position.y);
        }
    }
}