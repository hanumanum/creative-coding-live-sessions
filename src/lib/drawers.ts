import P5 from 'p5';
import { TEllipse, TMovableCircle, TPoint, THidra } from './types';
import { PALLETTES, getRandomColorFrom } from './colors';

export const drawEllipse = (p5: P5) => (ellipse: TEllipse) => {
    p5.strokeWeight(1);
    p5.fill(ellipse.color);
    p5.ellipse(ellipse.x, ellipse.y, ellipse.radius1, ellipse.radius2);
}

export const drawPoint = (p5: P5) => (point: TPoint) => {
    p5.strokeWeight(4);
    p5.point(point.x, point.y);
}

export const drawConnectAll = (p5: P5) => (points: TPoint[]) => {
    points.forEach((point, index) => {
        points.forEach((point2, index2) => {
            if (index !== index2) {
                p5.stroke(getRandomColorFrom(PALLETTES.rainbow))
                p5.line(point.x, point.y, point2.x, point2.y)
            }
        })
    })
}


export const drawVertex = (p5: P5) => (point: TPoint) => {
    p5.vertex(point.x, point.y);
}


export const drawMovable = (p5: P5) => (movable: TMovableCircle) => {
    p5.stroke(movable.color)
    movable.fill ? p5.fill(movable.color) : p5.noFill()
    p5.ellipse(movable.position.x, movable.position.y, movable.size)
}

export const drawHidra = (p5: P5) => (hidra: THidra) => {

    p5.stroke(hidra.color)
    hidra.firstAnchor.forEach((anchor1, index) => {
        const firstContr = p5.random(hidra.firstControl)
        const secondContr = p5.random(hidra.secondControl)
        const secondAnch = p5.random(hidra.secondAnchor)

        p5.bezier(anchor1.x, anchor1.y, firstContr.x, firstContr.y, secondContr.x, secondContr.y, secondAnch.x, secondAnch.y);

        (index % 7 === 0) ? p5.ellipse(secondAnch.x, secondAnch.y, 5) : null;
        (index % 7 === 0) ? p5.ellipse(anchor1.x, anchor1.y, 5) : null;
    })
}