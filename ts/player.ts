namespace Player {
    export interface Player {
        position: Core.Point;
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
