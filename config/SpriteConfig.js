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