namespace Spawner {
    export interface Spawner {
        interval: number;
    }

    const defaultInterval = 3000;

    export function create(): Spawner {
        return {
            interval: defaultInterval
        };
    }

    export function ready(s: Spawner): boolean {
        return s.interval <= 0;
    }

    export function update(s: Spawner, deltaTime: number) : void {
        s.interval -= deltaTime;
    }

    export function reset(s: Spawner) : void {
        s.interval = defaultInterval;
    }
}
