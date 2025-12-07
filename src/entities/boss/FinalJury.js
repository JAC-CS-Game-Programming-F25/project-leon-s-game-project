import { finalJurySpriteConfig, loadFinalJurySprites } from "../../../config/SpriteConfig.js";
import Animation from "../../../lib/Animation.js";
import StateMachine from "../../../lib/StateMachine.js";
import Vector from "../../../lib/Vector.js";
import BossStateName from "../../enums/BossStateName.js";
import ImageName from "../../enums/ImageName.js";
import { images, timer } from "../../globals.js";
import Entity from "../Entity.js";
import FinalJuryFallingState from "./FinalJuryFallingState.js";
import FinalJuryFireSpinningstate from "./FinalJuryFireSpinningstate.js";
import FinalJuryIdlingState from "./FinalJuryIdlingState.js";
import FinalJuryJumpingState from "./FinalJuryJumpingState.js";
import FinalJurySlammingState from "./FinalJurySlammingState.js";
import FinalJurySlidingState from "./FinalJurySlidingState.js";
import FinalJuryWhippingState from "./FinalJuryWhippingState.js";

export default class FinalJury extends Entity {
    constructor(x, y, width, height, map, player) {
        super(x, y, width, height);
        this.isBoss = true;
        this.initialPosition = new Vector(x,y);
        this.position = new Vector(x, y);
        this.dimensions = new Vector(width, height);
        this.renderOffset = {
			x: 7,
			y: 11,
		}
        this.velocity = new Vector(0, 0);
        this.map = map;
        this.player = player;
        this.facingRight = false;

        this.totalHealth = 500;
        this.health = this.totalHealth;

        this.FinalJurySprites = loadFinalJurySprites(
            images.get(ImageName.FinalJury),
            finalJurySpriteConfig
        );

        this.finalJuryAnimations = {
            idle: new Animation(this.FinalJurySprites.idle),
            jump: new Animation(this.FinalJurySprites.jump),
            slam: new Animation(this.FinalJurySprites.slam, 0.15, 1),
            whip: new Animation(this.FinalJurySprites.whip, 0.1, 1),
            spin: new Animation(this.FinalJurySprites.spin, 0.1),
            slide: new Animation(this.FinalJurySprites.slide),
            stun: new Animation(this.FinalJurySprites.stun),
        };

        this.slashEffects = {
            baseL: this.FinalJurySprites.slasheffectL,
            baseR: this.FinalJurySprites.slasheffectR,
        };
        this.currentAnimation = this.finalJuryAnimations.idle;

        this.stateMachine = new StateMachine();
        // TODO: Implement the boss states
        this.stateMachine.add(
            BossStateName.Stunning,
            new FinalJuryIdlingState(this)
        );
        this.stateMachine.add(
            BossStateName.Whipping,
            new FinalJuryWhippingState(this)
        );
        this.stateMachine.add(
            BossStateName.Falling,
            new FinalJuryFallingState(this)
        );
        this.stateMachine.add(
            BossStateName.Jumping,
            new FinalJuryJumpingState(this)
        );
        this.stateMachine.add(
            BossStateName.Slamming,
            new FinalJurySlammingState(this)
        );
        this.stateMachine.add(
            BossStateName.Sliding,
            new FinalJurySlidingState(this)
        );
        this.stateMachine.add(
            BossStateName.Spinning,
            new FinalJuryFireSpinningstate(this)
        );
        this.stateMachine.add(
            BossStateName.Idling,
            new FinalJuryIdlingState(this)
        );
    }

    /**
	 * Updates the Final Jury's state.
	 * @param {number} dt - The time passed since the last update.
	 */
    update(dt) {
        this.checkDamageColliderCollisions();
		this.stateMachine.update(dt);
	}
    checkDamageColliderCollisions() {
        this.map.damageColliders.forEach(collider => {
            collider.checkHit(this);
        })
    }

    getHurt(source) {
        this.isGraced = true;
        this.health -= 10;
        timer.addTask(
            () => {},
            0.1,
            0.1,
            () => {
                this.isGraced = false;
            }
        );
        console.log(`${this.health}/${this.totalHealth}`);
    }

    /**
	 * Renders the ]Final Jury.
	 * @param {CanvasRenderingContext2D} context - The rendering context.
	 */
	render(context) {
        this.stateMachine.render(context);
	}
}