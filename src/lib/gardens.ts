import { makeRandomPoint } from './makers';
import { TPoint, TWalls } from "./types";
import P5 from 'p5';
import { getRandomNumber } from './math';

export const gardenGreed = (w: number, h: number, stepW: number, stepH: number, startPoint: TPoint = { x: 0, y: 0 }): TPoint[] => {
    const points: TPoint[] = [];

    for (let y = startPoint.y; y < h; y += stepH) {
        for (let x = startPoint.x; x < w; x += stepW) {
            points.push({ x, y });
        }
    }

    return points;
}

export const gardenRandom = (count: number, w: number, h: number): TPoint[] => {
    return Array.from({ length: count }, () => makeRandomPoint(w, h));
}

export const gardenCircular = (x: number, y: number, radius: number, angle: number, rotationAngle: number = Math.PI / 6): TPoint[] => {
    const points: TPoint[] = [];

    for (let a = rotationAngle; a < 2 * Math.PI + rotationAngle; a += angle) {
        const _x = x + radius * Math.cos(a);
        const _y = y + radius * Math.sin(a);

        points.push({ x: _x, y: _y });
    }

    return points;
}

export const gardenCircularRandom = (x: number, y: number, radius: number, angle: number, rotationAngle: number = Math.PI / 6): TPoint[] => {
    const points: TPoint[] = [];
    const randomMultiplier = 50

    for (let a = rotationAngle; a < 2 * Math.PI + rotationAngle; a += angle) {
        const _x = x + (radius + Math.random() * randomMultiplier) * Math.cos(a);
        const _y = y + (radius + Math.random() * randomMultiplier) * Math.sin(a);

        points.push({ x: _x, y: _y });
    }

    return points;
}


export const gardenEpicycloid = (R: number, r: number, cx: number, cy: number): TPoint[] => {
    const points: TPoint[] = [];
    for (let th = 0; th < 60 * Math.PI; th += 0.05) {
        const px = (R + r) * Math.cos(th) - r * Math.cos((R + r) / r * th) + cx;
        const py = (R + r) * Math.sin(th) - r * Math.sin((R + r) / r * th) + cy;
        points.push({ x: px, y: py });
    }

    return points;
}


export const gardenButterfly = (cx: number, cy: number, zoom: number, p1: number): TPoint[] => {
    const points: TPoint[] = [];
    for (let th = 0; th < 12 * Math.PI; th += 0.01) {
        const px = Math.sin(th) * (Math.exp(Math.cos(th)) - p1 * Math.cos(4 * th) - Math.pow(Math.sin(th / 12), 5)) * zoom + cx;
        const py = -Math.cos(th) * (Math.exp(Math.cos(th)) - p1 * Math.cos(4 * th) - Math.pow(Math.sin(th / 12), 5)) * zoom + cy;
        points.push({ x: px, y: py });
    }

    return points;
}

export const gardenText = (p5: P5) => (text: string, fontSize: number, gridSize: number, center: TPoint, walls: TWalls): TPoint[] => {
    const points: TPoint[] = []

    p5.background(0);
    p5.textSize(fontSize);
    p5.fill(255)
    p5.textSize(fontSize)
    p5.text(text, center.x, center.y)

    p5.loadPixels()
    //TODO: optimize this, use center and boundaries of text 
    for (let y = 0; y < walls.h; y += gridSize) {
        for (let x = 0; x < walls.w; x += gridSize) {
            let px = p5.get(x, y)
            if (px[0] > 127) {
                points.push({ x, y })
            }
        }
    }
    //p5.background(0)

    return points;
}


export const gardenSpiral = (cx: number, cy: number, radius: number, angle: number): TPoint[] => {
    const points: TPoint[] = [];

    for (let a = 0; a < 2 * Math.PI * radius; a += angle) {
        const _x = cx + a * Math.cos(a);
        const _y = cy + a * Math.sin(a);

        points.push({ x: _x, y: _y });
    }

    return points;
}


export const gardenChainBetween2Points = (p1: TPoint, p2: TPoint): TPoint[] => {
    const TPoint: TPoint[] = [p1]
    const iterations = 100

    let nextPoint = {
        x: getRandomNumber(p1.x, p2.x),
        y: getRandomNumber(p1.y, p2.y)
    }


    for (let i = 0; i < iterations; i++) {
        TPoint.push(nextPoint)

        nextPoint = {
            x: getRandomNumber(nextPoint.x, p2.x),
            y: getRandomNumber(nextPoint.y, p2.y)
        }
    }
    TPoint.push(p2)
    return TPoint;

}