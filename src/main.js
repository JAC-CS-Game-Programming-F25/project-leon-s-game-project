import GameStateName from "./enums/GameStateName.js";
import Game from "../lib/Game.js";
import {
    canvas,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    context,stateMachine
} from './globals.js'
import PlayState from "./states/PlayState.js";

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.setAttribute('tabindex', '1');

document.body.prepend(canvas);

// mapDefinitions initialized here:
const mapDefinition = await fetch('./config/tilemap.json').then((response) =>
    response.json()
);

stateMachine.add(GameStateName.Play, new PlayState(mapDefinition));

stateMachine.change(GameStateName.Play);

const game = new Game(stateMachine, context, canvas.width, canvas.height);

game.start();

canvas.focus();