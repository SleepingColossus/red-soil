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
}
