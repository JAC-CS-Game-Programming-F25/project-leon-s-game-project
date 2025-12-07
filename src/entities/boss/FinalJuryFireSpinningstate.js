import BossStateName from "../../enums/BossStateName.js";
import FirePillarCollider from "../collidervariants/FirePillarCollider.js";
import FinalJuryState from "./FinalJuryState.js";

export default class FinalJuryFireSpinningstate extends FinalJuryState {
    constructor (boss) {
        super(boss);

        this.elapsedTime = 0;
        this.spinDuration = 5;

        // Multiple rings stored here
        this.rings = [];

        // Controls how often a NEW ring starts forming
        this.ringSpawnCooldown = 2.4;
        this.ringSpawnTimer = 0;

        // Density of each ring (smaller = more particles)
        this.angleStep = Math.PI / 50;

        this.maxRingRadius = 500; // rings get removed after reaching this

    }
    enter() {
        this.boss.currentAnimation = this.boss.finalJuryAnimations.spin;
        this.boss.currentAnimation.refresh();
        
        
        this.elapsedTime = 0;
        this.rings = [];
        this.ringSpawnTimer = 0;
    }

    update(dt) {
        super.update(dt);
        this.boss.currentAnimation.update(dt);

        this.elapsedTime += dt;
        this.ringSpawnTimer += dt;

        if (this.elapsedTime < this.spinDuration) {

            // Create new rings periodically
            if (this.ringSpawnTimer >= this.ringSpawnCooldown) {
                this.spawnNewRing();
                this.ringSpawnTimer = 0;
            }

            this.updateRings(dt);
            this.spawnRingParticles(dt);

        } else {
            this.boss.stateMachine.change(BossStateName.Idling);
        }
    }

    // Create a brand-new expanding ring
    spawnNewRing() {
        this.rings.push({
            radius: 50,
            growthRate: 40 + Math.random() * 40, // random variation
            angleOffset: Math.random() * Math.PI * 2
        });
        this.rings.push({
            radius: 150,
            growthRate: 40 + Math.random() * 40, // random variation
            angleOffset: Math.random() * Math.PI * 2
        });
        this.rings.push({
            radius: 250,
            growthRate: 40 + Math.random() * 40, // random variation
            angleOffset: Math.random() * Math.PI * 2
        });
    }

    updateRings(dt) {
        // Expand rings
        this.rings.forEach(r => {
            r.radius += r.growthRate * dt;
        });

        // Remove rings that have grown too large
        this.rings = this.rings.filter(r => r.radius < this.maxRingRadius);
    }

    spawnRingParticles(dt) {
        const cx = this.boss.position.x + this.boss.dimensions.x / 2;
        const cy = this.boss.position.y + this.boss.dimensions.y / 2;

        for (const ring of this.rings) {
            for (let angle = 0; angle < Math.PI * 2; angle += this.angleStep) {

                const finalAngle = angle + ring.angleOffset;

                const x = cx + Math.cos(finalAngle) * ring.radius;
                const y = cy + Math.sin(finalAngle) * ring.radius;

                this.boss.map.damageColliders.push(
                    new FirePillarCollider(x, y, 6, 6, 0.5, this.boss, 1)
                );
            }
        }
    }
}