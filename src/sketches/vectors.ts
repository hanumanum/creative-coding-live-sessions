//https://docs.godotengine.org/en/stable/tutorials/math/vector_math.html
//https://natureofcode.com/book/chapter-1-vectors/

import P5, { Vector } from 'p5';
import { TPoint, TMovable } from '../lib/types';
import { PALLETTES, getRandomColorFrom } from '../lib/colors';
import { getRandomNumber } from '../lib/math';

const w = document.documentElement.clientWidth
const h = document.documentElement.clientHeight
const padding = 3

const length = 1000
const palette = PALLETTES.cyber

const makeMovabele = (p5: P5): TMovable => {
    const movable = {
        position: p5.createVector(getRandomNumber(padding, w - padding), getRandomNumber(padding, h - padding)),
        velocity: p5.createVector(0, 2),
        acceleration: p5.createVector(0, 0),
        color: getRandomColorFrom(palette),
        size: p5.random(1, 10),
        fill: false
    } as TMovable

    movable.move = () => {
        movable.position.add(movable.velocity)
        return movable
    }

    return movable
}

const bounceFromWalls = (movable: TMovable): TMovable => {
    if (movable.position.x > w - padding || movable.position.x < padding) {
        movable.velocity.x *= -1
    }

    if (movable.position.y > h - padding || movable.position.y < padding) {
        movable.velocity.y *= -1
    }

    return movable
}

export const vectors = (p5: P5) => {
    let focal = {
        x: 0, y: 0
    }
    let movables: TMovable[] = Array.from({ length }, () => makeMovabele(p5))
    const drawMovable = (movable: TMovable) => {
        p5.stroke(movable.color)
        movable.fill ? p5.fill(movable.color) : p5.noFill()
        p5.ellipse(movable.position.x, movable.position.y, movable.size)
    }
    const move = (movable: TMovable) => { return movable.move() }

    const toPoint = (point: TPoint) => (movable: TMovable) => {
        const focalPoint = p5.createVector(point.x, point.y)
        const dir = Vector.sub(focalPoint, movable.position)
        const mag = movable.velocity.mag()

        movable.velocity
            .add(dir)
            .setMag(mag)

        return movable
    }

    const fillIf = (dist:number) => (movable: TMovable): TMovable => {
        if(p5.dist(movable.position.x, movable.position.y, focal.x, focal.y) < dist) {
            movable.fill = true
        }
        else {
            movable.fill = false
        }
        return movable
    }

    p5.setup = () => {
        const canvas = p5.createCanvas(w, h);
        canvas.parent("app");

    };

    p5.draw = () => {
        p5.background("black");
        p5.noFill()

        movables = movables
            .map(fillIf(100))
            .map(bounceFromWalls)
            .map(move)

        if (p5.mouseIsPressed) {
            focal = { x: p5.mouseX, y: p5.mouseY }
            movables = movables
                .map(toPoint(focal))
        }

        movables.forEach(drawMovable)
    }

};