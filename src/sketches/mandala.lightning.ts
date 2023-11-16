import P5 from 'p5';
import { TPoint, TWalls } from '../lib/types';
import { PALLETTES } from '../lib/colors';
import { getRandomNumber } from '../lib/math';
import { gardenCircular } from '../lib/gardens';
import { tail } from '../lib/arrays';
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

export const mandalaLightning = (p5: P5) => {
    const minRot = 1
    const maxRot = 10
    const initialRadius = 400

    /*     let outerCircle1 = gardenCircularRandom(center.x, center.y, initialRadius - 10, Math.PI / 100)
        let outerCircle2 = gardenCircularRandom(center.x, center.y, initialRadius + 40, Math.PI / 100)
     */
    let rotationAngle = Math.PI
    let currentRadius = initialRadius
    let circlePoints = gardenCircular(center.x, center.y, currentRadius, Math.PI / 10, rotationAngle += 0.01)
    let cnt = Math.floor(getRandomNumber(minRot, maxRot))
    let clr = p5.color(palette[1])

    p5.setup = () => {
        const canvas = p5.createCanvas(walls.w, walls.h);
        canvas.parent("app");
        p5.frameRate(30)
        clr = p5.color("yellow")
    };

    p5.draw = () => {
        currentRadius = initialRadius * p5.sin(p5.frameCount / 50)
        circlePoints = gardenCircular(center.x, center.y, currentRadius, Math.PI / cnt, rotationAngle += 0.01)

        if (currentRadius < 0) {
            cnt = Math.floor(getRandomNumber(minRot, maxRot))
        }

/*         if (p5.frameCount % 100 === 0) {
            outerCircle1 = gardenCircularRandom(center.x, center.y, initialRadius, Math.PI / 100)
            outerCircle2 = gardenCircularRandom(center.x, center.y, initialRadius + 50, Math.PI / 100)

        }
 */
        p5.background(0, 10);
        p5.noFill()


        circlePoints.forEach((point, index, array) => {
            const lightningRowPoints = gardenChainBetween2Points(center, point)
            drawLightningRow(p5)(lightningRowPoints)
            const p = tail(lightningRowPoints)
            p5.circle(p.x, p.y, 2)
            clr.setBlue(p5.sin(p5.frameCount / 10) * 255)
            p5.stroke(clr)

        })

        //outerCircle1.forEach((point) => p5.circle(point.x, point.y, 1))
        //outerCircle2.forEach((point) => p5.circle(point.x, point.y, 1))

    }
};
