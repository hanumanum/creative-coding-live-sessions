//https://docs.godotengine.org/en/stable/tutorials/math/vector_math.html
//https://natureofcode.com/book/chapter-1-vectors/

import P5, { Vector } from 'p5';
import { TPoint, TMovableCircle } from '../lib/types';
import { PALLETTES, pickRandomColor } from '../lib/colors';
import { getRandomNumber } from '../lib/math';
import { bounceFromWalls, fillIf, toPoint } from '../lib/mutators.vector';
import { makeMovabele, makeRandomPoint } from '../lib/makers';
import { drawMovable } from '../lib/drawers';

const walls = {
    w: document.documentElement.clientWidth,
    h: document.documentElement.clientHeight,
    padding: 3
}

const length = 1000
const palette = PALLETTES.cyber


export const vectors = (p5: P5) => {
    let focal = {
        x: 0, y: 0
    }
    let movables: TMovableCircle[] = Array.from({ length }, () => makeMovabele(p5)(walls)(palette))
    const move = (movable: TMovableCircle) => movable.move()
    
    const _bounceFromWalls = bounceFromWalls(walls)
    const _toPoint = toPoint(p5)
    const _drawMovable = drawMovable(p5)

    p5.setup = () => {
        const canvas = p5.createCanvas(walls.w, walls.h);
        canvas.parent("app");
    };

    p5.draw = () => {
        const _fillIf = fillIf(p5)(focal)
    
        p5.background(0, 100);
        p5.noFill()

        movables = movables
            .map(move)
            .map(_fillIf(100))
            .map(_bounceFromWalls)

        if (p5.frameCount % 500===0) {
            focal = makeRandomPoint(walls.w, walls.h)
            for(let i=0; i<p5.random(1, 10); i++){
                movables = movables
                .map(_toPoint(focal))

            }
        }

        movables.forEach(_drawMovable)
    }

};