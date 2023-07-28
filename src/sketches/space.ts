import P5 from 'p5';
import { PALLETTES, getRandomColorFrom } from '../lib/colors';
import { garden_circular, garden_greed, garden_random } from '../lib/gardens';
import { TEllipse, TPoint } from '../lib/types';
import { getRandomNumber } from '../lib/math';
import { ellipseFromPoint } from '../lib/utils';
import { drawEllipse, drawPoint } from '../lib/drawers';
import { changeColor, collapse, expand, tikkle } from '../lib/mutators';

const centerX = 450
const centerY = 450

const amglRad = ((2 * Math.PI) / 360) * 20
let points = garden_greed(900, 900, 100, 100);
points = points.concat(garden_circular(centerX, centerY, 300, amglRad))

let ellipses = points.map(ellipseFromPoint);

export const space = (p5: P5) => {
    const _drawPoint = drawPoint(p5);
    const _drawEllipse = drawEllipse(p5);


    p5.setup = () => {
        const canvas = p5.createCanvas(900, 900);
        canvas.parent("app");
        p5.background("black");
    };

    p5.draw = () => {
        p5.background("black");
        ellipses = ellipses
            //.map(moveToTop)
            .map(changeColor)
            .map(tikkle)

        if (p5.frameCount > 1000) {
            ellipses = ellipses.map(expand)
        }
        else if (p5.frameCount > 500) {
            ellipses = ellipses.map(collapse)
        }

        ellipses.forEach(_drawEllipse)
        //points.forEach(_drawPoint)
    }


};