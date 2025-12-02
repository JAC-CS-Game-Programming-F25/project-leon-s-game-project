import { loadPlayerSprites, playerSpriteConfig } from "../../../config/SpriteConfig.js";
import Vector from "../../../lib/Vector.js";
import Collider from "../../../lib/Collider.js";
import Animation from '../../../lib/Animation.js';
import ImageName from "../../enums/ImageName.js";
import Entity from "../Entity.js";
import { images } from '../../globals.js';
import StateMachine from "../../../lib/StateMachine.js";
import PlayerStateName from "../../enums/PlayerStateName.js";
import PlayerIdlingState from "./PlayerIdlingState.js";
import PlayerRunningState from "./PlayerRunningState.js";
import PlayerJumpingState from "./PlayerJumpingState.js";
import PlayerFallingState from "./PlayerFallingState.js";
import PlayerSlashingState from "./PlayerSlashingState.js";
import PlayerDownSlashingState from "./PlayerDownSlashingState.js";
import { oneInXChance } from "../../../lib/Random.js";

export default class Player extends Entity {
    constructor(x, y, width, height, map) {
        super(x, y, width, height);
        this.initialPosition = new Vector(x, y);
        this.position = new Vector(x, y);
        this.dimensions = new Vector(width, height);
        this.renderOffset = {
            x: 10,
            y: 8,
        }
        this.velocity = new Vector(0, 0);
        this.map = map;
        this.facingRight = true;

        this.health = 5;

        this.playerSprites = loadPlayerSprites(
            images.get(ImageName.HornetFull),
            playerSpriteConfig
        );

        this.playerAnimations = {
            idle: new Animation(this.playerSprites.idle),
            run: new Animation(this.playerSprites.run, 0.1),
            jump: new Animation(this.playerSprites.jump),
            fall: new Animation(this.playerSprites.fall),
            slash: new Animation(this.playerSprites.slash, 0.1, 1),
            down: new Animation(this.playerSprites.downslash, 0.1, 1),
            bind: new Animation(this.playerSprites.bind),
            death: new Animation(this.playerSprites.death),
        };
        this.slashEffects = {
            baseL: this.playerSprites.slasheffectL,
            baseR: this.playerSprites.slasheffectR,
            downL: this.playerSprites.downeffectL,
            downR: this.playerSprites.downeffectR
        }

        this.currentAnimation = this.playerAnimations.idle;

        this.activeHitboxes = [];

        this.stateMachine = new StateMachine();

        this.stateMachine.add(
            PlayerStateName.Slashing,
            new PlayerSlashingState(this)
        );
        this.stateMachine.add(
            PlayerStateName.Downslashing,
            new PlayerDownSlashingState(this)
        );
        this.stateMachine.add(
            PlayerStateName.Running,
            new PlayerRunningState(this)
        );
        this.stateMachine.add(
            PlayerStateName.Jumping,
            new PlayerJumpingState(this)
        );
        this.stateMachine.add(
            PlayerStateName.Falling,
            new PlayerFallingState(this)
        );
        this.stateMachine.add(
            PlayerStateName.Idling,
            new PlayerIdlingState(this)
        );
    }

    /**
     * Updates the player's state.
     * @param {number} dt - The time passed since the last update.
     */
    update(dt) {
        if (this.isDying) return
        if (oneInXChance(100)) {
            if (this.health > 0) {
                this.health--;
            }
        }
        // if (oneInXChance(75)) {
        //     if (this.health < 5) {
        //         this.health++;
        //     }
        // }
        this.stateMachine.update(dt);

    }

    /**
     * Renders the player.
     * @param {CanvasRenderingContext2D} context - The rendering context.
     */
    render(context) {
        this.activeHitboxes.forEach(hitbox => {
            hitbox.render(context);
        });
        this.stateMachine.render(context);

    }
}