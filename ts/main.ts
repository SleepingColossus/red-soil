const canvas = <HTMLCanvasElement>document.querySelector("#canvas");
const context : CanvasRenderingContext2D = canvas.getContext("2d");

interface Point {
    x: number;
    y: number;
}

interface Player {
    position: Point;
    size: number;
    speed: number
    draw: () => void
}

interface Projectile {
    position: Point,
    velocity: Point
}

function createProjectile(source: Point, destination: Point) : Projectile {
    let speed = 1; // prop on prjectile
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

function moveProjectile(p: Projectile) {
    p.position.x += p.velocity.x;
    p.position.y += p.velocity.y;
}


const player : Player = {
    position: {
        x: 20,
        y: 20
    },
    size: 20,
    speed: 1,
    draw: function() {
        context.fillStyle = "blue";
        context.fillRect(this.position.x, this.position.y, this.size, this.size)
    }
}

const keyboardState = {
    up: false, // 87
    left: false, //65
    down: false, // 83
    right: false, // 68
    fire: false // 32
}

window.addEventListener("keydown", (evt) => {
    switch(evt.keyCode) {
        case 87:
            keyboardState.up = true;
            break;
        case 65:
            keyboardState.left = true;
            break;
        case 83:
            keyboardState.down = true;
            break;
        case 68:
            keyboardState.right = true;
            break;
        case 32:
            keyboardState.fire = true;
            break;
    }
});

window.addEventListener("keyup", (evt) => {
    switch(evt.keyCode) {
        case 87:
            keyboardState.up = false;
            break;
        case 65:
            keyboardState.left = false;
            break;
        case 83:
            keyboardState.down = false;
            break;
        case 68:
            keyboardState.right = false;
            break;
        case 32:
            keyboardState.fire = false;
            break;
    }
});

const mouseState = {
    x: 0,
    y: 0
}

canvas.addEventListener("mousemove", (evt) => {
    mouseState.x = evt.pageX;
    mouseState.y = evt.pageY;
});

function drawLaserSight() {
    context.beginPath();
    context.moveTo(player.position.x + player.size / 2, player.position.y + player.size / 2);
    context.lineTo(mouseState.x, mouseState.y);
    context.strokeStyle = "red";
    context.stroke();
    context.closePath();
}

function movePlayer() {
    if(keyboardState.up) {
        player.position.y -= player.speed;
    }

    if(keyboardState.down) {
        player.position.y += player.speed;
    }

    if(keyboardState.left) {
        player.position.x -= player.speed;
    }

    if(keyboardState.right) {
        player.position.x += player.speed;
    }
}

let projectiles : Array<Projectile> = [];

function drawProjectile(p: Projectile) {
    context.fillStyle = "coral";
    context.fillRect(p.position.x, p.position.y, 5, 5);
}

function isProjectileOutOfBounds(p: Projectile) : boolean {
    return p.position.x < 0 ||
           p.position.x > canvas.width ||
           p.position.y < 0 ||
           p.position.y > canvas.height;
}

function main() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    movePlayer();
    if(keyboardState.fire) {
        let p = createProjectile(player.position, mouseState);
        projectiles.push(p);
    }

    player.draw();
    drawLaserSight();
    projectiles.forEach((p) => moveProjectile(p));
    projectiles.forEach((p) => drawProjectile(p));
    projectiles = projectiles.filter((p) => !isProjectileOutOfBounds(p))

    requestAnimationFrame(main);
}

main();
