import P5 from 'p5';
import { PALLETTES, pickRandomColor } from './colors';
import { TEllipse, TPoint } from './types';
import { getRandomNumber } from './math';
export const rotateAround = (p5: P5, x: number, y: number, angle: number, callback: Function) => {
    p5.translate(x, y);
    p5.rotate(angle);
    callback();
    p5.rotate(-angle);
    p5.translate(-x, -y);
}


export const ellipseFromPoint = (point: TPoint): TEllipse => {
    return {
        ...point,
        radius1: getRandomNumber(10, 70),
        radius2: getRandomNumber(10, 70),
        color: pickRandomColor(PALLETTES.rainbow)
    }
}

