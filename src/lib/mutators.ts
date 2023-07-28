import {PALLETTES, getRandomColorFrom} from './colors';
import {TEllipse} from './types';
import {getRandomNumber} from './math';

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
        color: getRandomColorFrom(PALLETTES.rainbow)
    }
}

export const osscilate = (ellipse: TEllipse): TEllipse => {
    return {
        ...ellipse,
        radius1: ellipse.radius1 + Math.sin(Date.now()) * 10,
        radius2: ellipse.radius2 + Math.cos(Date.now()) * 10
    }
}

export const tikkle = (ellipse: TEllipse): TEllipse => {
    return {
        ...ellipse,
        x: ellipse.x + (Math.random() > 0.5 ? 2 : -2),
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
