import Sprite from '../lib/Sprite.js';

export const playerSpriteConfig = {
    idle: [
        {x: 0, y: 0, width: 32, height: 32},
    ],
    run: [
        {x: 32, y: 0, width: 32, height: 32},
        {x: 64, y: 0, width: 32, height: 32},
    ],
    jump: [
        {x: 96, y: 0, width: 32, height: 32},
    ],
    fall: [
        {x: 128, y: 0, width: 32, height: 32},
    ],
	slash: [
		{x: 0, y: 32, width: 32, height: 32},
		{x: 32, y: 32, width: 32, height: 32},
        {x: 64, y: 32, width: 32, height: 32},
	],
	slasheffectL: [
		{x: 96, y: 32, width: 32, height: 32},
	],
	slasheffectR: [
		{x: 160, y: 32, width: 32, height: 32},
	],
	downslash: [
		{x: 0, y: 64, width: 32, height: 32},
		{x: 32, y: 64, width: 32, height: 32},
        {x: 64, y: 64, width: 32, height: 32},
	],
	downeffectL: [
		{x: 96, y: 64, width: 32, height: 32},
	],
	downeffectR: [
		{x: 160, y: 64, width: 32, height: 32},
	],
	bind: [
		{x:128, y: 32, width: 32, height: 32}
	],
	death: [
		{x:128, y: 64, width: 32, height: 32}
	],
}

export function loadPlayerSprites(spriteSheet, spriteConfig) {
	const sprites = {};

	for (const [animationName, frames] of Object.entries(spriteConfig)) {
		sprites[animationName] = frames.map(
			(frame) =>
				new Sprite(
					spriteSheet,
					frame.x,
					frame.y,
					frame.width,
					frame.height
				)
		);
	}

	return sprites;
}

export const finalJurySpriteConfig = {
	idle: [
		{x: 0, y: 0, width: 48, height: 64},
	],
	jump: [
		{x: 48, y: 0, width: 48, height: 64},
	],
	slam: [
		{x: 0, y: 64, width: 48, height: 64},
		{x: 48, y: 64, width: 48, height: 64},
		{x: 96, y: 64, width: 48, height: 64},
		{x: 144, y: 64, width: 48, height: 64},
	],
	whip: [
		{x: 0, y: 128, width: 48, height: 64},
		{x: 96, y: 0, width: 48, height: 64},
		{x: 144, y: 0, width: 48, height: 64},
		{x: 144, y: 0, width: 48, height: 64},
	],
	spin: [
		{x: 0, y: 128, width: 48, height: 64},
		{x: 48, y: 128, width: 48, height: 64},
		{x: 96, y: 128, width: 48, height: 64},
		{x: 144, y: 128, width: 48, height: 64},
	],
	slide: [
		{x: 48, y: 192, width: 64, height: 48},
	],
	stun: [
		{x: 112, y: 192, width: 48, height: 48},
	],
	slasheffectL: [
		{x: 0, y: 192, width: 48, height: 64},
	],
	slasheffectR: [
		{x: 160, y: 192, width: 48, height: 64},
	]
}

export function loadFinalJurySprites(spriteSheet, spriteConfig) {
	const sprites = {};

	for (const [animationName, frames] of Object.entries(spriteConfig)) {
		sprites[animationName] = frames.map(
			(frame) =>
				new Sprite(
					spriteSheet,
					frame.x,
					frame.y,
					frame.width,
					frame.height
				)
		);
	}

	return sprites;
}

export const UIspriteConfig = {
	healthbarspawn: [
		{x: 0, y: 0, width: 335, height: 142},
		{x: 0, y: 142, width: 335, height: 142},
		{x: 0, y: 284, width: 335, height: 142},
		{x: 0, y: 426, width: 335, height: 142},
		{x: 0, y: 568, width: 335, height: 142},
		{x: 0, y: 710, width: 335, height: 142},
	],
}
export const HealthbarMaskConfig = {
	mask: [
		{x: 0, y: 0, width: 170, height: 275}
	],
	breakanimation: [
		{x: 0, y: 275, width: 170, height: 275},
		{x: 0, y: 550, width: 170, height: 275},
		{x: 0, y: 825, width: 170, height: 275},
		{x: 0, y: 1100, width: 170, height: 275},
		{x: 0, y: 1375, width: 170, height: 275},
		{x: 0, y: 1650, width: 170, height: 275}
	],
	maskoutline: [
		{x: 0, y: 1925, width: 170, height: 275}
	],
}

export function loadUISprites(spriteSheet, spriteConfig) {
	const sprites = {};

	for (const [animationName, frames] of Object.entries(spriteConfig)) {
		sprites[animationName] = frames.map(
			(frame) =>
				new Sprite(
					spriteSheet,
					frame.x,
					frame.y,
					frame.width,
					frame.height
				)
		);
	}

	return sprites;
}
