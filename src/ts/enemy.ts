namespace Enemy {

    export enum EnemyType { Ant, Frog, Bug }

    function randomEnemyType(): EnemyType {
        let random = Core.randomInRange(1, 3);

        if(random == 1) {
            return EnemyType.Ant;
        } else if(random == 2) {
            return EnemyType.Frog;
        } else {
            return EnemyType.Bug;
        }
    }

    export interface Enemy extends Core.Body2d {
        maxHealth: number;
        currentHealth: number;
        velocity: Core.Point;
        type: EnemyType;
    }

    export function create(xBoundary: number, yBoundary: number): Enemy {

        const spawnOffset = 30;
        // select random edge
        const edge = Core.randomInRange(1, 4);

        let position : Core.Point;

        if(edge == 1) { // top edge
            position = { x: Core.randomInRange(0, xBoundary), y: -spawnOffset };
        } else if(edge == 2) { // bottom edge
            position = { x: Core.randomInRange(0, xBoundary), y: yBoundary };
        } else if (edge == 3) { // left edge
            position = { x: -spawnOffset, y: Core.randomInRange(0, yBoundary) };
        } else { // right edge
            position = { x: xBoundary , y: Core.randomInRange(0, yBoundary) };
        }

        return {
            position: position,
            size: 30,
            speed: 0.2,
            maxHealth: 3,
            currentHealth: 3,
            velocity: {x: 0, y: 0},
            type: randomEnemyType()
        }
    }

    export function move(e: Enemy, p: Player.Player) {
        if(e.position.x < p.position.x) {
            e.velocity.x = e.speed;
        } else if(e.position.x > p.position.x) {
            e.velocity.x = -e.speed;
        } else {
            e.velocity.x = 0;
        }

        if(e.position.y < p.position.y) {
            e.velocity.y = e.speed;
        } else if(e.position.y > p.position.y) {
            e.velocity.y = -e.speed;
        } else {
            e.velocity.y = 0;
        }

        function round(x: number) {
            var factor = 10;
            var tempNumber = x * factor;
            var roundedTempNumber = Math.round(tempNumber);
            return roundedTempNumber / factor;
        };

        e.position.x = round(e.position.x + e.velocity.x);
        e.position.y = round(e.position.y + e.velocity.y);
    }

    export function isAlive(e: Enemy): boolean {
        return e.currentHealth > 0;
    }

    export function damage(e: Enemy, amount: number) {
        e.currentHealth -= amount;
    }

    export function getDirection(e: Enemy): number {
        if(e.velocity.x == 0 && e.velocity.y < 0) {
            return Core.directionIndex[Core.Directions.Up];
        } else if(e.velocity.x > 0 && e.velocity.y < 0) {
            return Core.directionIndex[Core.Directions.UpRight];
        } else if(e.velocity.x > 0 && e.velocity.y == 0) {
            return Core.directionIndex[Core.Directions.Right];
        } else if(e.velocity.x > 0 && e.velocity.y > 0) {
            return Core.directionIndex[Core.Directions.DownRight];
        } else if(e.velocity.x == 0 && e.velocity.y > 0) {
            return Core.directionIndex[Core.Directions.Down];
        } else if(e.velocity.x < 0 && e.velocity.y > 0) {
            return Core.directionIndex[Core.Directions.DownLeft];
        } else if(e.velocity.x < 0 && e.velocity.y == 0) {
            return Core.directionIndex[Core.Directions.Left];
        } else {
            return Core.directionIndex[Core.Directions.UpLeft];
        }
    }
}
