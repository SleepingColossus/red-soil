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
