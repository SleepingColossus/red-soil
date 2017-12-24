const canvas = <HTMLCanvasElement>document.querySelector("#canvas");
const context : CanvasRenderingContext2D =
    (() => {
        let x = canvas.getContext("2d");
        if (x != null) {
            return x;
        } else {
            throw `Cannot get CanvasRenderingContext2D from element with id #${canvas}`
        }
    })();

const player : Player.Player = {
    position: {
        x: 20,
        y: 20
    },
    size: 20,
    speed: 1,
    reload: 500
}

window.addEventListener("keydown", (evt) => {
    InputManager.keyboardState[evt.keyCode] = true;
});

window.addEventListener("keyup", (evt) => {
    InputManager.keyboardState[evt.keyCode] = false;
});

canvas.addEventListener("mousemove", (evt) => {
    InputManager.updateMouseState(evt.pageX, evt.pageY);
});

let projectiles : Array<Projectile.Projectile> = [];

let timeOfLastFrame = Date.now();

function main() {
    let timeOfCurrentFrame = Date.now();
    let deltaTime = timeOfCurrentFrame - timeOfLastFrame;
    timeOfLastFrame = timeOfCurrentFrame;

    context.clearRect(0, 0, canvas.width, canvas.height);

    Player.move(player);
    player.reload -= deltaTime;
    if(InputManager.keyboardState[InputManager.controls.fire] && Player.canFire(player)) {
        let p = Projectile.create(player.position, InputManager.mouseState);
        player.reload = 500;
        projectiles.push(p);
    }

    Player.draw(player);
    Player.drawLaserSight(player);
    projectiles.forEach((p) => Projectile.move(p));
    projectiles.forEach((p) => Projectile.draw(p));
    projectiles = projectiles.filter((p) => !Projectile.isOutOfBounds(p))

    requestAnimationFrame(main);
}

main();
