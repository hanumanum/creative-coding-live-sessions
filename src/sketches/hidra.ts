//INCOMPLETE

import P5, { Vector } from 'p5';
import { TPoint, TMovableCircle, TWalls, THidra } from '../lib/types';
import { PALLETTES, getRandomColorFrom } from '../lib/colors';
import { getRandomNumber } from '../lib/math';
import { garden_circular } from '../lib/gardens';
import { bounceFromWalls } from '../lib/mutators.vector';
import { makeHidra } from '../lib/makers';
import { drawHidra, drawPoint } from '../lib/drawers';

const walls: TWalls = {
    w: document.documentElement.clientWidth,
    h: document.documentElement.clientHeight,
    padding: 3
}

let center: TPoint = {
    x: walls.w / 2,
    y: walls.h / 2
}

const length = 20
const palette = PALLETTES.greengray


export const hidra_world = (p5: P5) => {
    let hidras = Array.from({ length }, () => makeHidra(p5)(walls, palette, 20))
    const move = (hidra: THidra) => hidra.move()
    const bounce = bounceFromWalls(walls)
    const draw = drawHidra(p5)

    p5.setup = () => {
        const canvas = p5.createCanvas(walls.w, walls.h);
        canvas.parent("app");
        p5.frameRate(30)
        p5.background(0);
    };

    p5.draw = () => {
        p5.background(0, 20);
        //p5.noFill() //TODO: remove at the end
        
        hidras = hidras
            .map(move)
            .map(bounce)

        hidras.forEach(draw)
    }

};
