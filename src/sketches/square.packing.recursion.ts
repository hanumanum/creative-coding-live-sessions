import P5 from 'p5';
import { TPoint, TSquare, TWalls } from '../lib/types';
import { PALLETTES, pickRandomColor } from '../lib/colors';
import { gardenCircular, gardenGreed, gardenRandom } from '../lib/gardens';
import { getRandomNumber, isPointInSquare, scanForFreePoints, seekFreeRandomPoint } from '../lib/math';
import { drawSquareEsim, drawSquare } from '../lib/drawers';
import { growSquare, stopSquares } from '../lib/mutators';
import { makeSquare } from '../lib/makers';

const walls: TWalls = {
    w: document.documentElement.clientWidth,
    h: document.documentElement.clientHeight,
    padding: 3
}

const PALETTE = PALLETTES.neorustic //PALLETTES.orangebrown


const squares: TSquare[] = [...gardenGreed(walls.w, walls.h, 200, 200)]
    .map((point) => { return { ...point, x: point.x + 100, y: point.y + 110 } })
    .map((point) => {
        return {
            id: 0,
            x: point.x,
            y: point.y,
            color: pickRandomColor(PALETTE),
            size: 200, //getRandomNumber(2,25),
            stop: false,
            valocity: 1// getRandomNumber(2, 10)
        }
    })

const square: TSquare = {
    id: 0,
    x: walls.w / 2,
    y: walls.h / 2,
    color: pickRandomColor(PALETTE),
    size: 500, //getRandomNumber(2,25),
    stop: false,
    valocity: 1// getRandomNumber(2, 10)
}


export const square_recursive = (p5: P5) => {

    p5.setup = () => {
        const canvas = p5.createCanvas(walls.w, walls.h);
        canvas.parent("app");
        p5.rectMode(p5.CENTER)
        p5.background(0);
    };

    p5.draw = () => {
        const square = squares.shift()
        drawSquare(p5, PALETTE)(square)

        if(squares.length===0){
            p5.noLoop()
        }
    
    }

    p5.mouseClicked = () => {

    }

};
