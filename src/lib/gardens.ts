import { getRandomNumber } from "./math";
import { TPoint, TWalls } from "./types";
import P5 from 'p5';

export const garden_greed = (w: number, h: number, stepW: number, stepH: number): TPoint[] => {
    const points: TPoint[] = [];

    for (let y = stepH / 2; y < h; y += stepH) {
        for (let x = stepH / 2; x < w; x += stepW) {
            points.push({ x, y });
        }
    }

    return points;
}

export const garden_random = (count: number, w: number, h: number): TPoint[] => {
    return Array.from({ length: count }, () => {
        return {
            x: getRandomNumber(0, w),
            y: getRandomNumber(0, h)
        }
    })
}

export const garden_circular = (x: number, y: number, radius: number, angle: number): TPoint[] => {
    const points: TPoint[] = [];

    for (let a = Math.PI / 6; a < 2 * Math.PI + Math.PI / 6; a += angle) {
        const _x = x + radius * Math.cos(a);
        const _y = y + radius * Math.sin(a);

        points.push({ x: _x, y: _y });
    }

    return points;
}

export const garden_epicycloid = (R: number, r: number, cx: number, cy: number): TPoint[] => {
    const points: TPoint[] = [];
    for (let th = 0; th < 60 * Math.PI; th += 0.05) {
        const px = (R + r) * Math.cos(th) - r * Math.cos((R + r) / r * th) + cx;
        const py = (R + r) * Math.sin(th) - r * Math.sin((R + r) / r * th) + cy;
        points.push({ x: px, y: py });
    }

    return points;
}


export const garden_butterfly = (cx: number, cy: number, zoom: number, p1: number): TPoint[] => {
    const points: TPoint[] = [];
    for (let th = 0; th < 12 * Math.PI; th += 0.01) {
        const px = Math.sin(th) * (Math.exp(Math.cos(th)) - p1 * Math.cos(4 * th) - Math.pow(Math.sin(th / 12), 5)) * zoom + cx;
        const py = -Math.cos(th) * (Math.exp(Math.cos(th)) - p1 * Math.cos(4 * th) - Math.pow(Math.sin(th / 12), 5)) * zoom + cy;
        points.push({ x: px, y: py });
    }

    return points;
}

export const textGarden = (p5: P5) => (text: string, fontSize: number, gridSize: number, center: TPoint, walls: TWalls): TPoint[] => {
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