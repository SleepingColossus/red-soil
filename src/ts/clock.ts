namespace Clock {
    export interface Clock {
        timeOfLastFrame: number,
        deltaTime: number,
    }

    export function create(): Clock {
        return {
            timeOfLastFrame: Date.now(),
            deltaTime: 0
        }
    }

    export function update(clock: Clock) : void {
        var now = Date.now();
        clock.deltaTime = now - clock.timeOfLastFrame;
        clock.timeOfLastFrame = now;
    }
}
