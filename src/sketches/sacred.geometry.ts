//INCOMPLETE

import P5, { Vector } from 'p5';
import { TPoint, TMovableCircle, TWalls, THidra } from '../lib/types';
import { PALLETTES, getRandomColorFrom } from '../lib/colors';
import { getRandomNumber } from '../lib/math';
import { garden_circular } from '../lib/gardens';
import { bounceFromWalls } from '../lib/mutators.vector';
import { makeHidra } from '../lib/makers';
import { drawConnectAll, drawHidra, drawConnectSome } from '../lib/drawers';
import { circularArray } from '../lib/data.structures';

let isLooping = true
const walls: TWalls = {
    w: document.documentElement.clientWidth,
    h: document.documentElement.clientHeight,
    padding: 3
}
const center = {
    x: walls.w / 2,
    y: walls.h / 2
}

const length = 50
const palette = PALLETTES.fullrainbow
const radius = 180

const filters = circularArray([
    (point: TPoint, index: number, array: TPoint[]): boolean => Math.random() > 0.5, //Random
    (point: TPoint, index: number, array: TPoint[]): boolean => index < array.length / 2 && index % 2 === 0,
    (point: TPoint, index: number, array: TPoint[]): boolean => index <= array.length / 2 && index % 2 === 1,
    (point: TPoint, index: number, array: TPoint[]): boolean => index >= array.length / 2 && index % 2 === 0,
    (point: TPoint, index: number, array: TPoint[]): boolean => index >= array.length / 2,
    (point: TPoint, index: number, array: TPoint[]): boolean => index % 2 === 0,
 
    (point: TPoint, index: number, array: TPoint[]): boolean => index % 2 === 0, //
    (point: TPoint, index: number, array: TPoint[]): boolean => index % 2 === 1, //
    (point: TPoint, index: number, array: TPoint[]): boolean => point.y < center.y, //Almaz to top
    (point: TPoint, index: number, array: TPoint[]): boolean => point.y > center.y, //Almaz to bottom
    (point: TPoint, index: number, array: TPoint[]): boolean => true, //All
    
 ]
)

const drawCircle = (p5: P5) => (radius: number) => (point: TPoint) => {
    p5.strokeWeight(1)
    p5.circle(point.x, point.y, radius)
}


export const sacred_geometry = (p5: P5) => {
    const _drawCircle = drawCircle(p5)(radius)

    p5.setup = () => {
        const canvas = p5.createCanvas(walls.w, walls.h);
        canvas.parent("app");
        p5.frameRate(1)
        p5.background(0);
    };

    p5.draw = () => {

        p5.background(0);
        //p5.translate(center.x, center.y)
        //p5.rotate(p5.frameCount / 0.1)

        const circle2 = garden_circular(center.x, center.y, radius, Math.PI / 3)
        const circle3 = garden_circular(center.x, center.y, radius * 2, Math.PI / 3)
        const all = [center, ...circle2, ...circle3]

        const currentFiter  = filters.next()
        const filtered = all.filter(currentFiter)

        p5.noFill()
        p5.stroke(getRandomColorFrom(palette))
        all.forEach(_drawCircle)
        
        p5.stroke(getRandomColorFrom(palette))
        p5.strokeWeight(5)
        drawConnectSome(p5)(filtered)

        p5.strokeWeight(1)
        p5.noStroke()
        p5.fill("white")
        p5.textSize(20);
        p5.text(currentFiter, 50, 50);

    }


    p5.mouseClicked = () => {
        (isLooping) ? p5.noLoop() : p5.loop()
        isLooping = !isLooping
    }

};
