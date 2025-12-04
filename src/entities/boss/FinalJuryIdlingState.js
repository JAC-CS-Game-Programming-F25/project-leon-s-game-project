import { oneInXChance } from "../../../lib/Random.js";
import BossStateName from "../../enums/BossStateName.js";
import FinalJuryState from "./FinalJuryState.js";

export default class FinalJuryIdlingState extends FinalJuryState {
    constructor(boss) {
        super (boss);
    }

    enter() {
		this.boss.velocity.x = 0;
		this.boss.velocity.y = 0;

		this.boss.currentAnimation = this.boss.finalJuryAnimations.idle;
        this.isOnCooldown = true;
        
	}

    update(dt) {
		super.update(dt);
		this.handleDecision();
	}

    handleDecision() {
        if(oneInXChance(50)) {
            this.boss.stateMachine.change(BossStateName.Whipping);
        } else if(oneInXChance(50)) {
            this.boss.stateMachine.change(BossStateName.Jumping);
        }
    }
}