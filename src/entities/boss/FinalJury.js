import { finalJurySpriteConfig, loadFinalJurySptites } from "../../../config/SpriteConfig.js";
import Animation from "../../../lib/Animation.js";
import StateMachine from "../../../lib/StateMachine.js";
import Vector from "../../../lib/Vector.js";
import BossStateName from "../../enums/BossStateName.js";
import ImageName from "../../enums/ImageName.js";
import { images } from "../../globals.js";
import Entity from "../Entity.js";
import FinalJuryIdlingState from "./FinalJuryIdlingState.js";

export default class FinalJury extends Entity {
    constructor(x, y, width, height, map, player) {
        super(x, y, width, height);
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

        this.FinalJurySprites = loadFinalJurySptites(
            images.get(ImageName.FinalJury),
            finalJurySpriteConfig
        );

        this.finalJuryAnimations = {
            idle: new Animation(this.FinalJurySprites.idle),
            jump: new Animation(this.FinalJurySprites.jump),
            slam: new Animation(this.FinalJurySprites.slam),
            whip: new Animation(this.FinalJurySprites.whip),
            spin: new Animation(this.FinalJurySprites.spin),
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
            new FinalJuryIdlingState(this)
        );
        this.stateMachine.add(
            BossStateName.Jumping,
            new FinalJuryIdlingState(this)
        );
        this.stateMachine.add(
            BossStateName.Slamming,
            new FinalJuryIdlingState(this)
        );
        this.stateMachine.add(
            BossStateName.Sliding,
            new FinalJuryIdlingState(this)
        );
        this.stateMachine.add(
            BossStateName.Spinning,
            new FinalJuryIdlingState(this)
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
		this.stateMachine.update(dt);
	}

    /**
	 * Renders the ]Final Jury.
	 * @param {CanvasRenderingContext2D} context - The rendering context.
	 */
	render(context) {
        this.stateMachine.render(context);
	}
}