namespace Player {
    export interface Player {
        position: Core.Point;
        size: number;
        speed: number
        reload: number // time in ms
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

    export function canFire(p: Player) {
        return p.reload <= 0;
    }
}
