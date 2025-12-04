import { BossConfig } from "../../../config/BossConfig.js";
import BossStateName from "../../enums/BossStateName.js";
import FinalJuryState from "./FinalJuryState.js";

export default class FinalJuryJumpingState extends FinalJuryState {
    constructor(boss) {
		super(boss);
	}

    enter() {
        this.boss.velocity.y = BossConfig.jumpPower;
        this.boss.velocity.x = this.boss.facingRight ? BossConfig.maxSpeed : -BossConfig.maxSpeed;
        this.boss.currentAnimation = this.boss.finalJuryAnimations.jump;
        this.boss.isOnGround = false;
    }

    exit() {}

    update(dt) {
		super.update(dt);

		this.checkTransitions();
	}

    checkTransitions() {
		if (this.boss.velocity.y >= 0) {
      this.boss.stateMachine.change(BossStateName.Falling);
		}
	}
}