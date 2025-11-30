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

export function loadFinalJurySptites(spriteSheet, spriteConfig) {
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