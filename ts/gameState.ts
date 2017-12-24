namespace GameState {
    export interface GameState {
        clock: Clock.Clock;
        player: Player.Player;
        projectiles: Array<Projectile.Projectile>;
        enemies: Array<Enemy.Enemy>;
    }

    export function create() : GameState {
        return {
            clock: Clock.create(),
            player: {
                position: {
                    x: 250,
                    y: 250
                },
                size: 20,
                speed: 1,
                reload: 500
            },
            projectiles: [],
            enemies: [
                Enemy.create(20, 20)
            ]
        }
    }

    export function update(gameState: GameState, xBoundary: number, yBoundary: number): void {
        Clock.update(gameState.clock);
        Player.move(gameState.player);

        gameState.player.reload -= gameState.clock.deltaTime;
        if(InputManager.keyboardState[InputManager.controls.fire] && Player.canFire(gameState.player)) {
            let p = Projectile.create(gameState.player.position, InputManager.mouseState);
            gameState.player.reload = 500;
            gameState.projectiles.push(p);
        }

        gameState.projectiles =
            gameState.projectiles.filter((p) =>
                !Projectile.isOutOfBounds(p, xBoundary, yBoundary)
                && !p.destroyed
            );
        gameState.projectiles.forEach((p) => Projectile.move(p));

        gameState.projectiles.forEach((p) => {
            gameState.enemies.forEach((e) => {
                if(Core.isColliding(p.position, e))
                {
                    p.destroyed = true;
                    Enemy.damage(e, 1);
                }
            });
        });

        gameState.enemies = gameState.enemies.filter((e) => Enemy.isAlive(e));
        gameState.enemies.forEach((e) => Enemy.move(e, gameState.player))
    }
}
