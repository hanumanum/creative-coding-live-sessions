import { getRandomNumber } from "./math";
import { TPoint } from "./types";

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

    for (let a = 0; a < 2 * Math.PI - 0.1; a += angle) {
        console.log(a)
        const _x = x + radius * Math.cos(a);
        const _y = y + radius * Math.sin(a);

        points.push({ x: _x, y: _y });
    }

    return points;
}