//https://fonter.am/en/fonts/free-sans

import P5 from 'p5';
import { TWalls } from '../lib/types';
import { drawBuildings, drawChars, drawDiagonals, drawEntropy, drawItalic, drawLabirynthLines, drawLines, drawLinesToPoint, drawRandomRect, drawPoint, drawPointAndLines, drawRandomCircle, drawWeb } from '../lib/drawers';
import { circularArray } from '../lib/data.structures';
import { gardenText } from '../lib/gardens';

const walls: TWalls = {
    w: document.documentElement.clientWidth,
    h: document.documentElement.clientHeight,
    padding: 3
}

const text = "Մարդ"

const drawers = circularArray([
    //drawLines,
    drawLinesToPoint,
    drawPointAndLines,
    drawEntropy,
    drawRandomRect,
    drawBuildings,
    drawChars,
    drawItalic,
    drawRandomCircle,
    drawDiagonals,
    drawWeb,
    drawLabirynthLines
]
)

export const alphabets = (p5: P5) => {
    let currentFunction = (drawers.next())(p5)
    const points = []
    let mutatedPoints = []

    p5.setup = () => {
        const canvas = p5.createCanvas(walls.w, walls.h);
        canvas.parent("app");
        p5.frameRate(30)
        points.push(...gardenText(p5)(text, 340, 7, { x: 150, y: 550 }, walls))
        p5.background(0);
        mutatedPoints = points.map(p => { return { ...p } })
    };

    p5.draw = () => {
        p5.background(0);
        p5.stroke("white")

        p5.push()
        mutatedPoints.forEach(currentFunction)
        p5.pop()
        // mutatedPoints.forEach(drawers.next()(p5)) //TODO: it is good idea to use more then one drawer
    }

    p5.mouseClicked = () => {
        mutatedPoints = points.map(p => { return { ...p } })
        currentFunction = (drawers.next())(p5)
        p5.loop()
    }

};
