/// <reference path="core.ts" />
/// <reference path="player.ts" />
/// <reference path="projectile.ts" />
/// <reference path="inputManager.ts" />
/// <reference path="clock.ts" />
/// <reference path="enemy.ts" />
/// <reference path="spawner.ts" />
/// <reference path="gameState.ts" />
/// <reference path="spriteSheet.ts" />
/// <reference path="renderer.ts" />

const renderer = Renderer.create("#canvas", "#spritesheet");
const gameState = GameState.create(renderer.canvas.width, renderer.canvas.height);

window.addEventListener("keydown", (evt) => {
    InputManager.keyboardState[evt.keyCode] = true;
});

window.addEventListener("keyup", (evt) => {
    InputManager.keyboardState[evt.keyCode] = false;
});

renderer.canvas.addEventListener("mousemove", (evt) => {
    InputManager.updateMouseState(evt.pageX, evt.pageY);
});

function main() {
    GameState.update(gameState, renderer.canvas.width, renderer.canvas.height);
    Renderer.drawFrame(renderer, gameState);
    requestAnimationFrame(main);
}

main();
