namespace Projectile {
    export interface Projectile {
        position: Core.Point,
        velocity: Core.Point
    }

    export function create(source: Core.Point, destination: Core.Point) : Projectile {
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
