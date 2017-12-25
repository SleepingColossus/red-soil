namespace Enemy {
    export interface Enemy extends Core.Body2d {
        maxHealth: number;
        currentHealth: number;
    }

    export function create(xBoundary: number, yBoundary: number): Enemy {
        function randomInRange(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const spawnOffset = 30;
        // select random edge
        const edge = randomInRange(1, 4);

        let position : Core.Point;

        if(edge == 1) { // top edge
            position = { x: randomInRange(0, xBoundary), y: -spawnOffset };
        } else if(edge == 2) { // bottom edge
            position = { x: randomInRange(0, xBoundary), y: yBoundary };
        } else if (edge == 3) { // left edge
            position = { x: -spawnOffset, y: randomInRange(0, yBoundary) };
        } else { // right edge
            position = { x: xBoundary , y: randomInRange(0, yBoundary) };
        }

        return {
            position: position,
            size: 30,
            speed: 0.2,
            maxHealth: 3,
            currentHealth: 3
        }
    }

    export function move(e: Enemy, p: Player.Player) {
        if(e.position.x < p.position.x) {
            e.position.x += e.speed;
        } else if(e.position.x > p.position.x) {
            e.position.x -= e.speed;
        }

        if(e.position.y < p.position.y) {
            e.position.y += e.speed;
        } else if(e.position.y > p.position.y) {
            e.position.y -= e.speed;
        }
    }

    export function isAlive(e: Enemy): boolean {
        return e.currentHealth > 0;
    }

    export function damage(e: Enemy, amount: number) {
        e.currentHealth -= amount;
    }
}
