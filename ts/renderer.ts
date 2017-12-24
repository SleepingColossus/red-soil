namespace Renderer {
    export interface Renderer {
        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
    }

    export function create(canvasId: string) : Renderer {
        let canvas = <HTMLCanvasElement>document.querySelector(canvasId);
        let context : CanvasRenderingContext2D =
            // force CanvasRenderingContext2D to be returned
            // instead of nullable context
            (() => {
                let x = canvas.getContext("2d");
                if (x != null) {
                    return x;
                } else {
                    throw `Cannot get CanvasRenderingContext2D from element with id #${canvas}`
                }
            })();

        return {
            canvas: canvas,
            context: context
        };
    }

    export function drawFrame(r: Renderer, gameState: GameState.GameState): void {
        clearFrame(r);
        drawPlayer(r, gameState.player);
        drawLaserSight(r, gameState.player);
        gameState.projectiles.forEach((p) => drawProjectile(r, p));
    }

    // private
    function clearFrame(r: Renderer): void {
        r.context.clearRect(0, 0, r.canvas.width, r.canvas.height);
    }

    function drawPlayer(r: Renderer, p: Player.Player): void {
        r.context.fillStyle = "blue";
        r.context.fillRect(p.position.x, p.position.y, p.size, p.size);
    }

    function drawLaserSight(r: Renderer, p: Player.Player): void {
        r.context.beginPath();
        r.context.moveTo(p.position.x + p.size / 2, p.position.y + p.size / 2);
        r.context.lineTo(InputManager.mouseState.x, InputManager.mouseState.y);
        r.context.strokeStyle = "red";
        r.context.stroke();
        r.context.closePath();
    }

    function drawProjectile(r: Renderer, p: Projectile.Projectile) {
        r.context.fillStyle = "coral";
        r.context.fillRect(p.position.x, p.position.y, 5, 5);
    }
}
