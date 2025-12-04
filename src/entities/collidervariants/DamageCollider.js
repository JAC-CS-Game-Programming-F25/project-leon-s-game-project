import { didCollide, getKnockbackDirection } from "../../../lib/Collision.js";
import { debugOptions } from "../../globals.js";
import Entity from "../Entity.js";
import Player from "../player/Player.js";

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

    checkHit(target) {
        if (target instanceof Player && this.source?.isBoss) {
            if(didCollide(this, target) && !target.isGraced) {
                target.getHurt();
                target.damageKnockBack(getKnockbackDirection(this, target));
            }
        }
    }

    render(context) {
        if (this.sprite) {
            this.sprite.render(this.position.x, this.position.y);
            // If debug mode is enabled, render additional debug information
            if (debugOptions.playerCollision && this.source instanceof Player) {
                this.renderDebug(context);
            }
            if (debugOptions.bossCollision && this.source?.isBoss) {
                this.renderDebug(context);
            }
        }
    }

    /**
     * Renders debug information for the player and surrounding tiles.
     * This method visualizes the player's bounding box and nearby tiles,
     * highlighting potential collision areas.
     *
     * @param {CanvasRenderingContext2D} context - The rendering context.
     */
    renderDebug(context) {

        // Render a blue outline around the player's bounding box
        context.strokeStyle = 'red';
        context.strokeRect(
            this.position.x,
            this.position.y,
            this.dimensions.x,
            this.dimensions.y
        );
    }
}