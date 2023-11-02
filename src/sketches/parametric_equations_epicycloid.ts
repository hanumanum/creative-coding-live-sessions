//https://en.wikipedia.org/wiki/Epicycloid

import P5 from 'p5';
import { TPoint } from '../lib/types';
import { PALLETTES, pickRandomColor } from '../lib/colors';
import { gardenGreed, gardenEpicycloid, gardenCircular } from '../lib/gardens';
import { drawConnectAll, drawPoint, drawVertex } from '../lib/drawers';

export const epicycloid = (p5: P5) => {
    const _drawPoint = drawPoint(p5);
    const _drawVertex = drawVertex(p5)
    const _drawConnectAll = drawConnectAll(p5);

    let k = 0.1
    const cx = p5.windowWidth / 2
    const cy = p5.windowHeight / 2

    p5.setup = () => {
        const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        canvas.parent("app");
        p5.frameRate(10);
    };

    p5.draw = () => {
        const r = 50
        const R = r * k
        const epicycloid_points = gardenEpicycloid(R, r, cx, cy);
        const cirluclar_points = gardenCircular(cx, cy, R, Math.PI/4)


        p5.background("black");
        p5.stroke(pickRandomColor(PALLETTES.rainbow))
        p5.noFill()

        p5.beginShape()
        epicycloid_points.forEach(_drawVertex);
        p5.endShape()

        _drawConnectAll(cirluclar_points)

        k += 0.01

        p5.stroke("white")
        p5.textSize(20);
        p5.text(`k: ${k.toFixed(2)}`, 50, 50);
    }
};