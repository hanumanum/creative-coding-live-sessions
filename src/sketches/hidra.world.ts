import P5 from 'p5';
import { TWalls, THidra } from '../lib/types';
import { PALLETTES,  } from '../lib/colors';
import { bounceFromWalls } from '../lib/mutators.vector';
import { makeHidra } from '../lib/makers';
import { drawHidra, drawPoint } from '../lib/drawers';

const walls: TWalls = {
    w: document.documentElement.clientWidth,
    h: document.documentElement.clientHeight,
    padding: 3
}

const length = 20
const palette = PALLETTES.greengray

export const hidraWorld = (p5: P5) => {
    let hidras = Array.from({ length }, () => makeHidra(p5)(walls, palette, 10))
    const move = (hidra: THidra) => hidra.move()
    const bounce = bounceFromWalls(walls)
    const draw = drawHidra(p5, true)

    p5.setup = () => {
        const canvas = p5.createCanvas(walls.w, walls.h);
        canvas.parent("app");
        p5.frameRate(30)
        p5.background(0);
    };

    p5.draw = () => {
        p5.background(0, 20);
        p5.noFill()        
        hidras = hidras
            .map(move)
            .map(bounce)

        hidras.forEach(draw)
    }
};
