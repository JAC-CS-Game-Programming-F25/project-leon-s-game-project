import Particle from "../../../lib/Particle.js";
import DamageCollider from "./DamageCollider.js";
import { getRandomNumber, getRandomPositiveInteger } from "../../../lib/Random.js";
import Vector from "../../../lib/Vector.js";
import { debugOptions } from "../../globals.js";


export default class FirePillarCollider extends DamageCollider {
    constructor(x,y, width, height, lifetime = 0.1, source = null) {
        super(x,y,width, height, null, lifetime, source);
        this.fireParticles = [];
        this.fire = new Vector(getRandomNumber(100,0),-100);
        this.fireXCounter = new Vector(0,0);
    }
    

    update(dt) {
        super.update(dt);
        let spawnX = this.position.x + getRandomPositiveInteger(0,this.dimensions.x);
        let spawnY = this.position.y + getRandomPositiveInteger(0,this.dimensions.y);
        this.fireParticles.push(new Particle(spawnX,spawnY));

        spawnX = this.position.x + getRandomPositiveInteger(0,this.dimensions.x);
        spawnY = this.position.y + getRandomPositiveInteger(0,this.dimensions.y);
        this.fireParticles.push(new Particle(spawnX,spawnY));

        spawnX = this.position.x + getRandomPositiveInteger(0,this.dimensions.x);
        spawnY = this.position.y + getRandomPositiveInteger(0,this.dimensions.y);
        this.fireParticles.push(new Particle(spawnX,spawnY));
        
        this.fireParticles.forEach(particle => {
            particle.applyForce(this.fire, dt);
            particle.update(dt);
        });
        this.fireParticles = this.fireParticles.filter(p => p.isAlive);
    }

    render(context) {
        this.fireParticles.forEach(particle => {
            particle.render(context, '#d05019ff');
        });
        if (debugOptions.bossCollision && this.source?.isBoss) {
            this.renderDebug(context);
        }
    }
}