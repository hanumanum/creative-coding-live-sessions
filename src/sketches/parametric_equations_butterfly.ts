//https://en.wikipedia.org/wiki/Butterfly_curve_(transcendental)

import P5 from 'p5';
import { TPoint } from '../lib/types';
import { PALLETTES, getRandomColorFrom } from '../lib/colors';
import { garden_greed, garden_butterfly } from '../lib/gardens';
import { drawConnectAll, drawPoint, drawVertex } from '../lib/drawers';


export const butterfly_curve = (p5: P5) => {
    const garden = garden_greed(p5.windowWidth, p5.windowHeight, 150, 150);
    const _drawPoint = drawPoint(p5);
    const _drawVertex = drawVertex(p5)

    const cx = p5.windowWidth / 2
    const cy = p5.windowHeight / 2
    

    p5.setup = () => {
        const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        canvas.parent("app");
        p5.frameRate(1);
    };

    p5.draw = () => {
        p5.background("black");
        p5.noFill()

        let p1 = 0
        let zoom = 40
        garden.forEach((point) => {
    
            const buttefly_points = garden_butterfly(point.x, point.y, zoom, p1);

            p5.stroke(getRandomColorFrom(PALLETTES.rainbow))
            p5.beginShape()
            buttefly_points.forEach(_drawVertex);
            p5.endShape()

            p1 += 0.1
            zoom -= 1
        })

    }
};