import FinalJuryState from "./FinalJuryState.js";

export default class FinalJuryIdlingState extends FinalJuryState {
    constructor(boss) {
        super (boss);
    }

    enter() {
		this.boss.velocity.x = 0;
		this.boss.velocity.y = 0;

		this.boss.currentAnimation = this.boss.finalJuryAnimations.idle;
	}

    update(dt) {
		super.update(dt);
		this.handleDecision();
	}

    handleDecision() {
        
    }
}