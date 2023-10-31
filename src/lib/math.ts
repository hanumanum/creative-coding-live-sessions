import { makeRandomPoint } from './makers';
import { TPoint, TSquare, TWalls } from './types';

export const getRandomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}

export const isPointInSquare = (point: TPoint) => (square: TSquare) => {
    const half = square.size / 2
    const x1 = square.x - half
    const x2 = square.x + half
    const y1 = square.y - half
    const y2 = square.y + half

    return x1 < point.x && point.x < x2 && y1 < point.y && point.y < y2
}

export const isSquaresColliding = (square1: TSquare) => (square2: TSquare) => {
    if (square1.id === square2.id)
        return false

    const ofset = 1
    const size1 = square1.size + ofset + square1.valocity
    const size2 = square2.size + ofset + square2.valocity

    const x1 = square1.x - size1 / 2
    const x2 = square2.x - size2 / 2
    const y1 = square1.y - size1 / 2
    const y2 = square2.y - size2 / 2

    return x1 < x2 + size2 && x1 + size1 > x2 && y1 < y2 + size2 && y1 + size1 > y2
}


export const seekFreeRandomPoint = (walls: TWalls, squares: TSquare[]): TPoint => {
    const newPoint = makeRandomPoint(walls.w, walls.h)
    const insideAny = squares.some(isPointInSquare(newPoint))
    return insideAny ? seekFreeRandomPoint(walls, squares) : newPoint
}

export const scanForFreePoints = (walls: TWalls, squares: TSquare[], step: number): TPoint[] | null => {
    const ponts = []
    for (let y = 0; y < walls.h; y += step) {
        for (let x = 0; x < walls.w; x += step) {
            const insideAny = squares.some(isPointInSquare({ x, y }))
            if (!insideAny) {
                ponts.push({ x, y })
                break
            }
        }
    }
    return ponts
}