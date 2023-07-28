import P5 from 'p5';
import {TEllipse, TPoint} from './types';
export const drawEllipse = (p5: P5) => (ellipse: TEllipse) => {
    p5.strokeWeight(1);
    p5.fill(ellipse.color);
    p5.ellipse(ellipse.x, ellipse.y, ellipse.radius1, ellipse.radius2);
}

export const drawPoint = (p5: P5) => (point: TPoint) => {
    p5.stroke("white");
    p5.strokeWeight(5);
    p5.point(point.x, point.y);
}