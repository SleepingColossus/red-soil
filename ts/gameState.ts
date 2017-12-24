namespace GameState {
    export interface GameState {
        player: Player.Player;
        projectiles: Array<Projectile.Projectile>;
        clock: Clock.Clock;
    }

    export function create() : GameState {
        return {
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
            clock: Clock.create()
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

        gameState.projectiles.forEach((p) => Projectile.move(p));
        gameState.projectiles =
            gameState.projectiles.filter((p) => !Projectile.isOutOfBounds(p, xBoundary, yBoundary));
    }

}
