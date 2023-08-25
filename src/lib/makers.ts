import P5 from 'p5';
import { THidra, TMovableCircle, TWalls } from './types';
import { getRandomColorFrom } from './colors';
import { getRandomNumber } from './math';
import { Vector } from 'p5';
import { garden_circular } from './gardens';

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
        firstAnchor: garden_circular(position.x, position.y, minRad, Math.PI),
        firstControl: garden_circular(position.x, position.y, minRad + 20, Math.PI / 2),
        secondControl: garden_circular(position.x, position.y, minRad + 40, Math.PI / 3),
        secondAnchor: garden_circular(position.x, position.y, minRad + 50, Math.PI / 6),
        color: getRandomColorFrom(palette),
        move: (): THidra => {
            hidra.position = hidra.position.add(hidra.velocity)

            return {
                ...hidra,
                firstAnchor: garden_circular(hidra.position.x, hidra.position.y, minRad, Math.PI),
                firstControl: garden_circular(hidra.position.x, hidra.position.y, minRad + 20, Math.PI / 2),
                secondControl: garden_circular(hidra.position.x, hidra.position.y, minRad + 40, Math.PI / 3),
                secondAnchor: garden_circular(hidra.position.x, hidra.position.y, minRad + 50, Math.PI / 6),
            } as THidra
        }
    }

    return hidra
}