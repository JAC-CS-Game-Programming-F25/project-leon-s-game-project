import SoundName from "../../enums/SoundName.js";
import { sounds, timer } from "../../globals.js";
import PlayerState from "./PlayerState.js";

export default class PlayerDyingState extends PlayerState {
    constructor(player) {
        super(player);
        this.deathPause = 2
    }

    enter() {
        this.player.currentAnimation = this.player.playerAnimations.death;
        this.player.isDying = true;
        sounds.play(SoundName.GruntDeath);
        timer.addTask(
            () => {},
            0.1,
            this.deathPause,
            () => this.checkTransition()
        );
    }

    update(dt) {
        
    }

    checkTransition() {
        this.player.isDying = false;
        this.player.die();
    }
}