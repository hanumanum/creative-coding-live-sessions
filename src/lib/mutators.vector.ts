import P5, { Vector } from 'p5';
import { TMovableBasic, TMovableCircle, TPoint, TWalls } from './types';

export const bounceFromWalls = (walls: TWalls) => <T extends TMovableBasic>(movable: T): T => {

    if (movable.position.x > walls.w - walls.padding || movable.position.x < walls.padding) {
        movable.velocity.x *= -1
    }

    if (movable.position.y > walls.h - walls.padding || movable.position.y < walls.padding) {
        movable.velocity.y *= -1
    }

    return movable
}


export const toPoint = (p5: P5) => (point: TPoint) => <T extends TMovableBasic>(movable: T): T => {
    const focalPoint = p5.createVector(point.x, point.y)
    const dir = Vector.sub(focalPoint, movable.position)
    const mag = movable.velocity.mag()

    movable.velocity
        .add(dir)
        .setMag(mag)

    return movable
}

export const fillIf = (p5: P5) => (focal: TPoint) => (dist: number) => (movable: TMovableCircle): TMovableCircle => {
    movable.fill = (p5.dist(movable.position.x, movable.position.y, focal.x, focal.y) < dist)
        ? true : false

    return movable
}
