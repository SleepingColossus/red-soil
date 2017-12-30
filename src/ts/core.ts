namespace Core {
    export interface Point {
        x: number;
        y: number;
    }

    export interface Body2d {
        position: Point;
        size: number;
        speed: number;
    }

    export function isColliding(point: Point, body: Body2d) : boolean {
        return point.x >= body.position.x
            && point.x <= body.position.x + body.size
            && point.y >= body.position.y
            && point.y <= body.position.y + body.size;
    }

    export namespace Directions {
        export const Up = "up";
        export const UpRight = "upright";
        export const Right = "right";
        export const DownRight = "downright";
        export const Down = "down";
        export const DownLeft = "downleft";
        export const Left = "left";
        export const UpLeft = "upleft";
    }

    // used to get sprite for given direction
    export const directionIndex = {
        [Directions.Up] : 0,
        [Directions.UpRight] : 1,
        [Directions.Right] : 2,
        [Directions.DownRight] : 3,
        [Directions.Down] : 4,
        [Directions.DownLeft] : 5,
        [Directions.Left] : 6,
        [Directions.UpLeft] : 7
    }

    export function randomInRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
