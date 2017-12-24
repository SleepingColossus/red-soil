namespace Player {
    export interface Player {
        position: Point;
        size: number;
        speed: number
        reload: number // time in ms
    }

    export function drawLaserSight(p: Player) {
        context.beginPath();
        context.moveTo(p.position.x + p.size / 2, p.position.y + p.size / 2);
        context.lineTo(InputManager.mouseState.x, InputManager.mouseState.y);
        context.strokeStyle = "red";
        context.stroke();
        context.closePath();
    }

    export function move(p: Player) {
        if(InputManager.keyboardState[InputManager.controls.up]) {
            p.position.y -= p.speed;
        }

        if(InputManager.keyboardState[InputManager.controls.down]) {
            p.position.y += p.speed;
        }

        if(InputManager.keyboardState[InputManager.controls.left]) {
            p.position.x -= p.speed;
        }

        if(InputManager.keyboardState[InputManager.controls.right]) {
            p.position.x += p.speed;
        }
    }

    export function draw(p: Player) {
        context.fillStyle = "blue";
        context.fillRect(p.position.x, p.position.y, p.size, p.size);
    }

    export function canFire(p: Player) {
        return p.reload <= 0;
    }
}

namespace Projectile {
    export interface Projectile {
        position: Point,
        velocity: Point
    }

    export function create(source: Point, destination: Point) : Projectile {
        let speed = 10; // prop on prjectile
        let dx = destination.x - source.x;
        let dy = destination.y - source.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let moves = distance / speed;
        let velX = dx / moves;
        let velY = dy / moves;
        return {
            position: {x: source.x, y: source.y},
            velocity: {x: velX, y: velY}
        }
    }

    export function move(p: Projectile) {
        p.position.x += p.velocity.x;
        p.position.y += p.velocity.y;
    }

    export function draw(p: Projectile) {
        context.fillStyle = "coral";
        context.fillRect(p.position.x, p.position.y, 5, 5);
    }

    export function isOutOfBounds(p: Projectile) : boolean {
        return p.position.x < 0 ||
               p.position.x > canvas.width ||
               p.position.y < 0 ||
               p.position.y > canvas.height;
    }
}

namespace InputManager {
    export const mouseState = {
        x: 0,
        y: 0
    }

    export function updateMouseState(x: number, y: number) {
        mouseState.x = x;
        mouseState.y = y;
    }

    export const controls = {
        up:  87,
        left: 65,
        down: 83,
        right: 68,
        fire: 32
    }

    // dictionary of keycodes and booleans
    export const keyboardState : { [id: number] : boolean; } = {}
}

const canvas = <HTMLCanvasElement>document.querySelector("#canvas");
const context : CanvasRenderingContext2D = canvas.getContext("2d");

interface Point {
    x: number;
    y: number;
}

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
