import P5 from 'p5';
import { TPoint, TSquare, TWalls } from '../lib/types';
import { PALLETTES, pickRandomColor } from '../lib/colors';
import { gardenCircular, gardenGreed, gardenRandom } from '../lib/gardens';
import { getRandomNumber, isPointInSquare, scanForFreePoints, seekFreeRandomPoint } from '../lib/math';
import { drawSquareEsim } from '../lib/drawers';
import { growSquare, stopSquares } from '../lib/mutators';
import { makeSquare } from '../lib/makers';

const walls: TWalls = {
    w: document.documentElement.clientWidth,
    h: document.documentElement.clientHeight,
    padding: 3
}

const PALETTE = PALLETTES.orangebrown //PALLETTES.orangebrown


const centrizePoint = (p5: P5, walls: TWalls) => (point: TPoint, squares: TSquare[]): TPoint => {
    const _point = { ...point }

    let xLeft = p5.max(squares
        .filter((square) => square.size > 30)
        .map((square) => square.x + square.size / 2)
        .filter((coord) => coord < _point.x)
    )
    //xLeft = (xLeft === -Infinity) ? 0 : xLeft

    let xRight = p5.min(squares
        .filter((square) => square.size > 30)
        .map((square) => square.x - square.size / 2)
        .filter((coord) => coord > _point.x))
    //  xRight = (xRight === Infinity) ? walls.w : xRight

    /*     let yLeft = p5.max(squares
            .map((square) => square.y + square.size / 2)
            .filter((coord) => coord < _point.x)
        )
        yLeft = (yLeft === -Infinity) ? 0 : yLeft
    
        let yRight = p5.min(squares
            .map((square) => square.y - square.size / 2)
            .filter((coord) => coord > _point.x))
        yRight = (yRight === Infinity) ? walls.h : yRight
     */

    point.x = (xLeft + xRight) / 2
    //    point.y = (yLeft + yRight) / 2

    return point
}

export const square_packing = (p5: P5) => {
    const allSuqare = walls.w * walls.h
    const _makeSquare = makeSquare(PALETTE)
    const _drawSquare = drawSquareEsim(p5, PALETTE)
    const _centrizePoint = centrizePoint(p5, walls)

    const points: TPoint[] = [...gardenGreed(walls.w, walls.h, 250, 250)].map((point) => {
        return {
            ...point,
            x: point.x + getRandomNumber(-20, 20),
            y: point.y + getRandomNumber(-20, 20)
        }
    })
    /*...garden_greed(walls.w, walls.h, 250, 250)
     garden_greed(walls.w, walls.h, 300, 300)  
    garden_circular(walls.w / 2, walls.h / 2, 400, Math.PI / 5) 
    garden_greed(walls.w, walls.h, 250, 250) //garden_random(20, walls.w, walls.h)
    */

    let squares = points.map(_makeSquare)

    p5.setup = () => {
        const canvas = p5.createCanvas(walls.w, walls.h);
        canvas.parent("app");
        p5.rectMode(p5.CENTER)
    };

    p5.draw = () => {
        p5.background(0, 30);

        squares = stopSquares(walls)(squares)
            .map(growSquare)



        /* for (let i = 0; i < 10; i++) {
            const newRandomPoint = seekFreeRandomPoint(walls, squares)
            squares.push(_makeSquare(newRandomPoint))
        } */

        const filledSqare = squares.reduce((acc, square) => acc + Math.pow(square.size, 2), 0)
        if (filledSqare / allSuqare > 0.1 && filledSqare / allSuqare < 0.9) {
            for (let i = 0; i < 1; i++) {
                const newRandomPoint = seekFreeRandomPoint(walls, squares)
                //const centeredPoint = _centrizePoint(newRandomPoint, squares)
                squares.push(_makeSquare(newRandomPoint))
            }
        }


        if (filledSqare / allSuqare > 0.7 && filledSqare / allSuqare < 0.9) {
            const newPoints = scanForFreePoints(walls, squares, 20)
            if (newPoints)
                squares = squares.concat(newPoints.map(_makeSquare))
        }


        squares.forEach(_drawSquare)

    }

    p5.mouseClicked = () => {

    }

};
