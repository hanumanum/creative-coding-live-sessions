import P5 from 'p5';
import { TPoint, TWalls } from '../lib/types';
import { PALLETTES } from '../lib/colors';
import { getRandomNumber } from '../lib/math';
import { gardenChainBetween2Points2, gardenCircular } from '../lib/gardens';
import { getNRandomsFromArray, tail } from '../lib/arrays';
import { gardenChainBetween2Points, gardenCircularRandom } from '../lib/gardens';
import { drawVertex } from '../lib/drawers';

const walls: TWalls = {
    w: document.documentElement.clientWidth,
    h: document.documentElement.clientHeight,
    padding: 3
}

const center: TPoint = {
    x: walls.w / 2,
    y: walls.h / 2
}

const drawLightningRow = (p5: P5) => (points: TPoint[]) => {
    p5.beginShape()
    points.forEach(drawVertex(p5))
    p5.endShape()
}

const palette = PALLETTES.neorustic

export const lightning = (p5: P5) => {
    const minRot = 1
    const maxRot = 10
    const initialRadius = 400
    const random1 = getNRandomsFromArray(1)

    let rotationAngle = Math.PI
    let currentRadius = initialRadius
    let circlePoints = gardenCircular(center.x, center.y, currentRadius, Math.PI / 10, rotationAngle += 0.01)
    let cnt = Math.floor(getRandomNumber(minRot, maxRot))
    let clr = p5.color(palette[1])
    const someCirclePoints = random1(circlePoints)

    p5.setup = () => {
        const canvas = p5.createCanvas(walls.w, walls.h);
        canvas.parent("app");
        p5.frameRate(5)
        clr = p5.color("yellow")
    };

    p5.draw = () => {
        //currentRadius = initialRadius * p5.sin(p5.frameCount / 50)
        //circlePoints = gardenCircular(center.x, center.y, currentRadius, Math.PI / cnt, rotationAngle += 0.01)
        //someCirclePoints = random10(circlePoints)

        p5.background(0);
        p5.noFill()
        p5.stroke(clr)

        someCirclePoints.forEach((point, index, array) => {
            const lightningRowPoints = gardenChainBetween2Points2(center, point)
                //.map((p) => { return { x: p.x + getRandomNumber(-10, 10), y: p.y + getRandomNumber(-10, 10) } })

            drawLightningRow(p5)(lightningRowPoints)
            const p = tail(lightningRowPoints)
        })

        //outerCircle1.forEach((point) => p5.circle(point.x, point.y, 1))
        //outerCircle2.forEach((point) => p5.circle(point.x, point.y, 1))

    }
};
