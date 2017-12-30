namespace SpriteSheet {

    export namespace SpriteIds {
        export const Player = "player";
        export const Projectile = "projectile";
        export const Grass = "grass";

        export const Ant = "ant";
        export const Frog = "frog";
        export const Bug = "bug";
    }

    export interface Sprite {
        srcX: number,
        srcY: number,
        w: number,
        h: number
    }

    export interface AnimatedSprite {
        sprites: Array<Sprite>;
        numberOframes: number;
        currentFrame: number;
        animationInterval: number;
        animationCounter: number;
    }

    export interface SpriteSheet {
        image: HTMLImageElement
        sprites: { [id: string]: Sprite }
        animatedSprites: { [id: string]: AnimatedSprite }
    }

    export function create(imageId: string): SpriteSheet {
        return {
            image: <HTMLImageElement>document.querySelector(imageId),
            sprites: {
                [SpriteIds.Player]: { srcX: col(0), srcY: row(0), w: 20, h: 20 },
                [SpriteIds.Projectile]: { srcX: col(2), srcY: row(0), w: 8, h: 8 },
                [SpriteIds.Grass] : { srcX: col(1), srcY: row(0), w: 30, h: 30 }
            },
            animatedSprites: {
                [SpriteIds.Ant]: {
                    numberOframes: 2,
                    currentFrame: 0,
                    animationInterval: 500,
                    animationCounter: 0,
                    sprites: [
                        { srcX: col(0), srcY: row(2), w: 30, h: 30 },
                        { srcX: col(1), srcY: row(2), w: 30, h: 30 },
                        { srcX: col(2), srcY: row(2), w: 30, h: 30 },
                        { srcX: col(3), srcY: row(2), w: 30, h: 30 },
                        { srcX: col(0), srcY: row(3), w: 30, h: 30 },
                        { srcX: col(1), srcY: row(3), w: 30, h: 30 },
                        { srcX: col(2), srcY: row(3), w: 30, h: 30 },
                        { srcX: col(3), srcY: row(3), w: 30, h: 30 },
                        { srcX: col(0), srcY: row(4), w: 30, h: 30 },
                        { srcX: col(1), srcY: row(4), w: 30, h: 30 },
                        { srcX: col(2), srcY: row(4), w: 30, h: 30 },
                        { srcX: col(3), srcY: row(4), w: 30, h: 30 },
                        { srcX: col(0), srcY: row(5), w: 30, h: 30 },
                        { srcX: col(1), srcY: row(5), w: 30, h: 30 },
                        { srcX: col(2), srcY: row(5), w: 30, h: 30 },
                        { srcX: col(3), srcY: row(5), w: 30, h: 30 },
                    ]
                },
                [SpriteIds.Frog]: {
                    numberOframes: 2,
                    currentFrame: 0,
                    animationInterval: 500,
                    animationCounter: 0,
                    sprites: [
                        { srcX: col(0), srcY: row(6), w: 30, h: 30 },
                        { srcX: col(1), srcY: row(6), w: 30, h: 30 },
                        { srcX: col(2), srcY: row(6), w: 30, h: 30 },
                        { srcX: col(3), srcY: row(6), w: 30, h: 30 },
                        { srcX: col(0), srcY: row(7), w: 30, h: 30 },
                        { srcX: col(1), srcY: row(7), w: 30, h: 30 },
                        { srcX: col(2), srcY: row(7), w: 30, h: 30 },
                        { srcX: col(3), srcY: row(7), w: 30, h: 30 },
                        { srcX: col(0), srcY: row(8), w: 30, h: 30 },
                        { srcX: col(1), srcY: row(8), w: 30, h: 30 },
                        { srcX: col(2), srcY: row(8), w: 30, h: 30 },
                        { srcX: col(3), srcY: row(8), w: 30, h: 30 },
                        { srcX: col(0), srcY: row(9), w: 30, h: 30 },
                        { srcX: col(1), srcY: row(9), w: 30, h: 30 },
                        { srcX: col(2), srcY: row(9), w: 30, h: 30 },
                        { srcX: col(3), srcY: row(9), w: 30, h: 30 },
                    ]
                },
                [SpriteIds.Bug]: {
                    numberOframes: 2,
                    currentFrame: 0,
                    animationInterval: 500,
                    animationCounter: 0,
                    sprites: [
                        { srcX: col(0), srcY: row(10), w: 30, h: 30 },
                        { srcX: col(1), srcY: row(10), w: 30, h: 30 },
                        { srcX: col(2), srcY: row(10), w: 30, h: 30 },
                        { srcX: col(3), srcY: row(10), w: 30, h: 30 },
                        { srcX: col(0), srcY: row(11), w: 30, h: 30 },
                        { srcX: col(1), srcY: row(11), w: 30, h: 30 },
                        { srcX: col(2), srcY: row(11), w: 30, h: 30 },
                        { srcX: col(3), srcY: row(11), w: 30, h: 30 },
                        { srcX: col(0), srcY: row(12), w: 30, h: 30 },
                        { srcX: col(1), srcY: row(12), w: 30, h: 30 },
                        { srcX: col(2), srcY: row(12), w: 30, h: 30 },
                        { srcX: col(3), srcY: row(12), w: 30, h: 30 },
                        { srcX: col(0), srcY: row(13), w: 30, h: 30 },
                        { srcX: col(1), srcY: row(13), w: 30, h: 30 },
                        { srcX: col(2), srcY: row(13), w: 30, h: 30 },
                        { srcX: col(3), srcY: row(13), w: 30, h: 30 },
                    ]
                }
            }
        }
    }

    export function incrementFrame(s: AnimatedSprite, deltaTime: number): void {
        s.animationCounter += deltaTime;

        if(s.animationCounter >= s.animationInterval) {
            s.animationCounter = 0;
            s.currentFrame++;

            if(s.currentFrame >= s.numberOframes) {
                s.currentFrame = 0;
            }
        }
    }

    export function getSprite(s: AnimatedSprite, spriteIndex: number): Sprite {
        return s.sprites[spriteIndex * 2 + s.currentFrame];
    }

    // size of individual sprites in sheet
    const cellSize = 30;

    // get x coordinate for column
    function col(colNumber: number): number {
        return colNumber * cellSize;
    }

    // get y coordinate for row
    function row(rowNumber: number): number {
        return rowNumber * cellSize;
    }
}
