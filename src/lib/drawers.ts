import P5 from 'p5';
import { TEllipse, TMovableCircle, TPoint, THidra } from './types';
import { PALLETTES, getRandomColorFrom } from './colors';
import { getNRandomsFromArray } from './utils';
import {circularArray} from './data.structures';

export const drawEllipse = (p5: P5) => (ellipse: TEllipse) => {
    p5.strokeWeight(1);
    p5.fill(ellipse.color);
    p5.ellipse(ellipse.x, ellipse.y, ellipse.radius1, ellipse.radius2);
}

export const drawCircle = (p5: P5) => (radius: number) => (point: TPoint) => {
    p5.strokeWeight(1)
    p5.circle(point.x, point.y, radius)
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

export const drawConnectSome = (p5: P5) => (points: TPoint[]) => {
    points.forEach((point, index) => {
        points.forEach((point2, index2) => {
            if (index !== index2 && index2) {
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


export const drawRandomCircle = (p5: P5) => (point: TPoint, index: number, array: TPoint[]) => {
    const color = getRandomColorFrom(PALLETTES.rainbow)
    p5.stroke(color)
    p5.noFill()

    const rad = p5.random(1, 20)
    p5.ellipse(point.x, point.y, rad, rad)
    p5.noLoop()
}

export const drawLabirynthLines = (p5: P5) => (point: TPoint, index: number, array: TPoint[]) => {
    p5.stroke("white")
    p5.fill("white");
    (p5.random() > 0.5)
        ?
        p5.line(point.x, point.y, point.x + p5.random(5, 10), point.y) :
        p5.line(point.x, point.y, point.x, point.y + p5.random(5, 10))
    p5.noLoop()
}

export const drawLines = (p5: P5) => (point: TPoint, index: number, array: TPoint[]) => {
    p5.stroke("white")
    p5.fill("white");
    (index % 3 === 0)
        ?
        p5.line(point.x, point.y, point.x + p5.random(5, 40), point.y) :
        p5.line(point.x, point.y, point.x, point.y + p5.random(5, 40))
    p5.noLoop()
}

export const drawDiagonals = (p5: P5) => (point: TPoint, index: number, array: TPoint[]) => {
    if (p5.random() > 0.4)
        return
    p5.stroke("white")
    p5.fill("white");
    const p = p5.random(5, 40)
    p5.line(point.x, point.y, point.x + p, point.y + p)
    //p5.line(point.x, point.y, point.x, point.y + p)
    //p5.line(point.x, point.y, point.x, point.y + p)
    p5.noLoop()
}

export const drawItalic = (p5: P5) => (point: TPoint, index: number, array: TPoint[]) => {
    point.x += p5.random(1, 20)
    drawPoint(p5)(point)
}

export const drawWeb = (p5: P5) => (point: TPoint, index: number, array: TPoint[]) => {
    const dist = 80;
    const color = getRandomColorFrom(PALLETTES.rainbow)
    p5.stroke(color)
    let randomPoints = getNRandomsFromArray(array.length / 50)(array)
    randomPoints = randomPoints.filter((p) => p5.dist(p.x, p.y, point.x, point.y) < dist)

    randomPoints.forEach(p => {
        p5.line(point.x, point.y, p.x, p.y)
    })
    p5.noLoop()
}

export const drawBuildings = (p5: P5) => (point: TPoint, index: number, array: TPoint[]) => {
    p5.stroke(p5.sin(p5.frameCount / 20) * (index % 11) * 20 + 100)
    p5.strokeWeight(index % 7)
    p5.point(point.x, point.y)
}

export const drawChars = (p5: P5) => (point: TPoint, index: number, array: TPoint[])  => {
    const text = "Մարդ"
    const textCircular = circularArray(text.split(""))
    
    if (index % 2 === 0)
        return
    p5.textSize(p5.random(2, 15));
    p5.noStroke()
    p5.fill(255)
    p5.text(textCircular.next(), point.x, point.y)
    p5.noLoop()
}

export const drawMove = (p5: P5) => (point: TPoint, index: number, array: TPoint[]) => {
    p5.noStroke()
    p5.fill(getRandomColorFrom(PALLETTES.mycustom2))
    p5.rect(point.x, point.y, 5, 5)
}

export const drawEntropy = (p5: P5) => (point: TPoint, index: number, array: TPoint[]) => {
    p5.noStroke()
    p5.fill(getRandomColorFrom(PALLETTES.pastel))
    p5.rect(point.x, point.y, p5.random(2, 5), p5.random(2, 5))
    point.x += p5.random(-0.5, 0.5)
    point.y += p5.random(-2, 2)
}

export const drawPointAndLines = (p5: P5) => {
    return (point: TPoint, index: number, array: TPoint[]) => {
        array.reverse()

        p5.noFill()
        if (p5.random() < 0.1) {

            p5.stroke("yellow")
            p5.strokeWeight(1)
            p5.circle(point.x, point.y, p5.random(5, 20))

            const linePoint = p5.random(array.filter((p) => p.x === point.x && Math.abs(p.y - point.y) < 200))

            p5.stroke("white")
            p5.strokeWeight(1)
            p5.line(point.x, point.y, linePoint.x, linePoint.y)
        }

        p5.noLoop()
    }
}

export const drawLinesToPoint = (p5: P5) => (point: TPoint, index: number, array: TPoint[]) => {
    if (p5.random() < 0.1) {
        p5.stroke("white")
        p5.line(point.x, point.y, p5.random(0, p5.width), p5.random(0, p5.height))

    }
    p5.fill("blue")
    p5.circle(point.x, point.y, p5.random(5, 4))

    p5.noLoop()

}