import { PALLETTES, pickRandomColor } from './colors';
import { TEllipse, TSquare, TWalls } from './types';
import { getRandomNumber, isSquaresColliding } from './math';

export const moveToTop = (ellipse: TEllipse): TEllipse => {
    let newY = ellipse.y - getRandomNumber(1, 3)

    if (newY < 0)
        newY = 900

    return {
        ...ellipse,
        y: newY
    }
}

export const changeColor = (ellipse: TEllipse): TEllipse => {
    return {
        ...ellipse,
        color: pickRandomColor(PALLETTES.rainbow)
    }
}

export const osscilate = (ellipse: TEllipse): TEllipse => {
    return {
        ...ellipse,
        radius1: ellipse.radius1 + Math.sin(Date.now() * 10),
        radius2: ellipse.radius2 + Math.cos(Date.now() * 10)
    }
}

export const tikkle = (ellipse: TEllipse): TEllipse => {
    return {
        ...ellipse,
        x: ellipse.x + (Math.random() > 0.5 ? 5 : -5),
        y: ellipse.y + (Math.random() > 0.5 ? 5 : -5),
    }
}

export const collapse = (ellipse: TEllipse): TEllipse => {
    return {
        ...ellipse,
        x: ellipse.x + (ellipse.x > 450 ? -3 : 3),
        y: ellipse.y + (ellipse.y > 450 ? -3 : 3),
    }
}

export const expand = (ellipse: TEllipse): TEllipse => {
    return {
        ...ellipse,
        x: ellipse.x + (ellipse.x > 450 ? 3 : -3),
        y: ellipse.y + (ellipse.y > 450 ? 3 : -3),
    }
}

export const toCenter = (ellipse: TEllipse): TEllipse => {
    const x = ellipse.x > 900 || ellipse.x < 0 ? 450 : ellipse.x
    const y = ellipse.y > 900 || ellipse.y < 0 ? 450 : ellipse.y

    return {
        ...ellipse,
        x,
        y
    }
}


export const stopSquares = (walls: TWalls) => (squares: TSquare[]): TSquare[] => {
    for (let square1 of squares) {
        if (square1.stop)
            continue

        const half = square1.size / 2
        if (0 >= square1.x - half || walls.w <= square1.x + half || 0 >= square1.y - half || walls.h <= square1.y + half) {
            square1.stop = true
            continue
        }

        for (let square2 of squares) {
            if (square1.id === square2.id)
                continue
            if (isSquaresColliding(square1)(square2))
                square1.stop = true
        }
    }
    return squares
}


export const growSquare = (square: TSquare) => {
    const _square = { ...square }

    if (_square.stop)
        return _square
    _square.size += _square.valocity

    return _square
}