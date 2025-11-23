import { getRandomNumber,getRandomPositiveNumber } from './Random.js';
import Vector from './Vector.js';

export default class Particle {
	constructor(x, y) {
		this.position = new Vector(x,y);
		this.velocity = new Vector(50,getRandomNumber(50,100));
		this.acceleration = new Vector(0,0);
		this.startRadius = 1;
		this.radius = this.startRadius;
		this.lifetime = 1500;
		this.life = this.lifetime;
		this.isAlive = true;
	}

	applyForce(force, dt) {
		this.acceleration.add(force,dt);
	}

	update(dt) {
		this.velocity.add(this.acceleration, dt);
		this.position.add(this.velocity,dt);

		this.life--;

		this.radius = this.startRadius * (this.life / this.lifetime);

		if (this.life <= 0) {
			this.isAlive = false;
		}
	}

	render(context) {
		context.save();
		context.fillStyle = '#1b2e4a';
		context.globalAlpha = this.life/this.lifetime;
		context.globalCompositeOperation = "lighter";

		context.beginPath();

		context.arc(
			this.position.x,
			this.position.y,
			this.radius,
			0,
			Math.PI * 2);

		context.closePath();

		context.fill();
		context.restore();
	}
}
