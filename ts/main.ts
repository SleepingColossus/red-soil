const canvas = <HTMLCanvasElement>document.querySelector("#canvas");
const context : CanvasRenderingContext2D = canvas.getContext("2d");

class Point {
    x: number;
    y: number;
}

interface Player {
    position: Point;
    size: number;
    speed: number
    draw: () => void
}

const player : Player = {
    position: {
        x: 20,
        y: 20
    },
    size: 20,
    speed: 1,
    draw: function() {
        context.fillRect(this.position.x, this.position.y, this.size, this.size)
    }
}

const keyboardState = {
    up: false, // 87
    left: false, //65
    down: false, // 83
    right: false // 68
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

function main() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    movePlayer();

    player.draw();
    drawLaserSight();

    requestAnimationFrame(main);
}

main();
