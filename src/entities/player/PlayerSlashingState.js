import PlayerStateName from "../../enums/PlayerStateName.js";
import DamageCollider from "../DamageCollider.js";
import PlayerState from "./PlayerState.js"

export default class PlayerSlashingState extends PlayerState {
    constructor(player) {
        super(player);
        this.isMovingRight = false;
		this.isMovingLeft = false;
    }

    enter() {
        // play slash sound
        this.player.currentAnimation = this.player.playerAnimations.slash;
        this.player.currentAnimation.refresh();

        this.savedVelocityX = this.player.velocity.x;
        this.spawnedHitbox = false;
    }

    update(dt) {
         // Let gravity continue (fall slashes)
        this.applyGravity(dt);

        // Keep horizontal velocity exactly unchanged
        this.player.velocity.x = this.savedVelocityX;

        // Update position based on preserved velocity
        this.updatePosition(dt);

        this.player.currentAnimation.update(dt);
        if (this.player.currentAnimation.isHalfwayDone()) {
            console.log("halfway");
            this.spawnSlashHitbox();
		}
        if(this.player.currentAnimation.isDone()) {
            this.player.currentAnimation.refresh();
            this.player.stateMachine.change(PlayerStateName.Idling);
        }

        
    }

    spawnSlashHitbox() {
        let effectSprite = this.player.slashEffects.baseL[0];
        const width = effectSprite.width;
        const height = effectSprite.height;

        // Position hitbox relative to player
        let x = this.player.position.x;
        let y = this.player.position.y + this.player.dimensions.y / 2 - height / 2;

        // If facing right, place hitbox in front
        if (this.player.facingRight) {
            x += this.player.dimensions.x; 
            effectSprite = this.player.slashEffects.baseR[0]
        }
        else {
            x -= width; 
        }

        const hitbox = new DamageCollider(
            x,
            y,
            width,
            height,
            effectSprite,
            0.15,
            this.player
        );

        // Attach to your world/game
        this.player.map.damageColliders.push(hitbox);

        // OR If attached to player:
        // this.player.activeHitboxes.push(hitbox);
    }
}