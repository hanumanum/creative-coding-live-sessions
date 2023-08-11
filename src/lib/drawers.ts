import P5 from 'p5';
import { TEllipse, TPoint } from './types';
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
