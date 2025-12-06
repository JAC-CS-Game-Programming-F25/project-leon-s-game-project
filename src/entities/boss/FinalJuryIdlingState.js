import { getRandomPositiveNumber, oneInXChance } from "../../../lib/Random.js";
import BossStateName from "../../enums/BossStateName.js";
import { timer } from "../../globals.js";
import FinalJuryState from "./FinalJuryState.js";

export default class FinalJuryIdlingState extends FinalJuryState {
    constructor(boss) {
        super (boss);
        this.cooldown = 0;
        this.isOnCooldown = false;
    }

    enter() {
		this.boss.velocity.x = 0;
		this.boss.velocity.y = 0;

		this.boss.currentAnimation = this.boss.finalJuryAnimations.idle;

        this.isOnCooldown = true;
        this.cooldown = getRandomPositiveNumber(0.5, 1.5);
        timer.wait(this.cooldown).then(() => {
            this.isOnCooldown = false;
        });
	}

    update(dt) {
		super.update(dt);
		this.handleDecision();
	}

    handleDecision() {
        // Stop early if cooldown is still active
        if (this.isOnCooldown) return;

        if(oneInXChance(50)) {
            this.boss.stateMachine.change(BossStateName.Whipping);
        } else if(oneInXChance(50)) {
            //this.boss.stateMachine.change(BossStateName.Jumping);
        }
    }
}