//INCOMPLETE

import P5 from 'p5';
import { TPoint, TWalls } from '../lib/types';
import { PALLETTES, getRandomColorFrom } from '../lib/colors';
import { gardenCircular } from '../lib/gardens';
import { drawCircle, drawConnectSome, drawPoint } from '../lib/drawers';
import { circularArray } from '../lib/data.structures';
import { rotateAround } from '../lib/utils';

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
const palette = PALLETTES.neorustic

const filters = circularArray([
    //(point: TPoint, index: number, array: TPoint[]): boolean => index < 8,
    (point: TPoint, index: number, array: TPoint[]): boolean => true // index >= 8 && index < 14,
   /* (point: TPoint, index: number, array: TPoint[]): boolean => index >= 14,
    (point: TPoint, index: number, array: TPoint[]): boolean => index >= 14 && index % 2 === 0,

    (point: TPoint, index: number, array: TPoint[]): boolean => index < 13 && index >= 9,
    (point: TPoint, index: number, array: TPoint[]): boolean => index < array.length / 2 && index % 2 === 0,
    (point: TPoint, index: number, array: TPoint[]): boolean => index <= array.length / 2 && index % 2 === 1,
    // (point: TPoint, index: number, array: TPoint[]): boolean => index >= array.length / 2 && index % 2 === 0,
    (point: TPoint, index: number, array: TPoint[]): boolean => index >= array.length / 2,
    (point: TPoint, index: number, array: TPoint[]): boolean => index % 2 === 0,



    (point: TPoint, index: number, array: TPoint[]): boolean => index % 2 === 0, //
    (point: TPoint, index: number, array: TPoint[]): boolean => index % 2 === 1, //
    //(point: TPoint, index: number, array: TPoint[]): boolean => point.y < center.y, //Almaz to top
    //(point: TPoint, index: number, array: TPoint[]): boolean => point.y > center.y, //Almaz to bottom
    (point: TPoint, index: number, array: TPoint[]): boolean => true, //All
    */
]
)

const clrs = circularArray(palette)

export const sacred_geometry = (p5: P5) => {
    let radius = 80
    let isLooping = true

    p5.setup = () => {
        const canvas = p5.createCanvas(walls.w, walls.h);
        canvas.parent("app");
        p5.frameRate(15)
        p5.background(0);
    };

    p5.draw = () => {
        const _drawCircle = drawCircle(p5)(radius)
        const _drawCircle2 = drawCircle(p5)(10)

        p5.background(0);
        const circle2 = gardenCircular(center.x, center.y, radius, Math.PI / 3)
        const circle3 = gardenCircular(center.x, center.y, radius * 2, Math.PI / 3)
        // const circle4 = garden_circular(0, 0, radius * 3, Math.PI / 6)
        const all = [center, ...circle2, ...circle3, /* ...circle4 */]

        const currentFiter = (p5.frameCount % 17 === 0) ? filters.next() : filters.same()
        const clr = (p5.frameCount % 5 === 0) ? clrs.next() : clrs.same();
        const filtered = all.filter(currentFiter)
       
        const reducer = (acc, curr, index, array) => {
            array.forEach((point) => {
                if(curr !== point){
                    acc.push([curr, point])
                }
                
            })
            
            return acc
        }
       
        const pairs = filtered.reduce(reducer, [])


        p5.noFill()
        p5.stroke("white")
        all.forEach(_drawCircle)
        //all.forEach(_drawCircle2)

        p5.stroke("white")
        p5.strokeWeight(2)
        //drawConnectSome(p5)(filtered)
        p5.stroke("red")
        filtered.forEach(drawPoint(p5))
        pairs.forEach((pair) => {
            p5.line(pair[0].x, pair[0].y, pair[1].x, pair[1].y)
        })


        p5.strokeWeight(1)
        p5.noStroke()
        p5.fill("white")
        p5.textSize(20);
        p5.text(filters.same(), 50, 50);

    }


    p5.mouseClicked = () => {
        (isLooping) ? p5.noLoop() : p5.loop()
        isLooping = !isLooping
    }

};
