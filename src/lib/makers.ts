import P5 from 'p5';
import { THidra, TMovableCircle, TWalls, TPoint, TSquare } from './types';
import { getRandomColorFrom } from './colors';
import { getRandomNumber } from './math';
import { Vector } from 'p5';
import { gardenCircular } from './gardens';


export const makeRandomPoint = (w: number, h: number): TPoint => {
    return {
        x: getRandomNumber(0, w),
        y: getRandomNumber(0, h)
    }
}

export const makeMovabele = (p5: P5) => (walls: TWalls) => (palette: string[]): TMovableCircle => {
    const movable = {
        position: p5.createVector(getRandomNumber(walls.padding, walls.w - walls.padding), getRandomNumber(walls.padding, walls.h - walls.padding)),
        velocity: p5.createVector(0, 5),
        acceleration: p5.createVector(0, 0),
        color: getRandomColorFrom(palette),
        size: p5.random(1, 10),
        fill: false
    } as TMovableCircle

    movable.move = () => {
        movable.position.add(movable.velocity)
        return movable
    }

    return movable
}

export const makeHidra = (p5: P5) => (walls: TWalls, palette: string[], minRad: number): THidra => {
    const center = {
        x: getRandomNumber(0, walls.w),
        y: getRandomNumber(0, walls.h)
    }

    const position: Vector = p5.createVector(center.x, center.y)

    const hidra: THidra = {
        position: position,
        velocity: P5.Vector.random2D().setMag(p5.random(5, 25)),
        firstAnchor: gardenCircular(position.x, position.y, minRad, Math.PI),
        firstControl: gardenCircular(position.x, position.y, minRad + 20, Math.PI / 2),
        secondControl: gardenCircular(position.x, position.y, minRad + 40, Math.PI / 3),
        secondAnchor: gardenCircular(position.x, position.y, minRad + 50, Math.PI / 6),
        color: getRandomColorFrom(palette),
        move: (): THidra => {
            hidra.position = hidra.position.add(hidra.velocity)

            return {
                ...hidra,
                firstAnchor: gardenCircular(hidra.position.x, hidra.position.y, minRad, Math.PI),
                firstControl: gardenCircular(hidra.position.x, hidra.position.y, minRad + 20, Math.PI / 2),
                secondControl: gardenCircular(hidra.position.x, hidra.position.y, minRad + 40, Math.PI / 3),
                secondAnchor: gardenCircular(hidra.position.x, hidra.position.y, minRad + 50, Math.PI / 6),
            } as THidra
        }
    }

    return hidra
}

//TODO: rename this function
export const makeSquare = (PALETTE: string[]) => {
    let id = 0
    return (point: TPoint): TSquare => {
        return {
            id: id++,
            x: point.x,
            y: point.y,
            color: getRandomColorFrom(PALETTE),
            size: 1, //getRandomNumber(2,25),
            stop: false,
            valocity: 1// getRandomNumber(2, 10)
        }
    }
}
