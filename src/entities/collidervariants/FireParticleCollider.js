// import Particle from "../../../lib/Particle.js";
// import { getRandomNumber } from "../../../lib/Random.js";
// import Vector from "../../../lib/Vector.js";
// import { debugOptions } from "../../globals.js";
// import DamageCollider from "./DamageCollider.js";

// export default class FireParticleCollider extends DamageCollider {
//     constructor(x,y, width, height, lifetime = 0.1, source = null) {
//         super(x,y,width, height, null, lifetime, source);
//         this.particle = new Particle(x,y);
//         this.fire = new Vector(getRandomNumber(100,0),-100);

//     }

//     update(dt) {
//         super.update(dt);

//         this.particle.applyForce(this.fire);
//         this.particle.update(dt);
//     }

//     render(context) {
//         this.particle.render(context, '#d05019ff');
//         if (debugOptions.bossCollision && this.source?.isBoss) {
//             this.renderDebug(context);
//         }
//     }
// }