import P5 from 'p5';
import { TEllipse, TMovableCircle, TPoint, THidra, TSquare } from './types';
import { PALLETTES, getRandomColorFrom } from './colors';
import { getNRandomsFromArray } from './utils';
import { circularArray } from './data.structures';

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

export const drawHidra = (p5: P5, fill: boolean) => (hidra: THidra) => {

    (fill) ? p5.fill("white") : p5.noFill()
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
    (index % 7 === 0)
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

export const drawWeb = (p5: P5, dist: number = 60)   => (point: TPoint, index: number, array: TPoint[]) => {
    const color = getRandomColorFrom(PALLETTES.rainbow)
    p5.stroke(color)
    let randomPoints = getNRandomsFromArray(array.length / 50)(array)
    randomPoints = randomPoints.filter((p) => p5.dist(p.x, p.y, point.x, point.y) < dist)

    randomPoints.forEach(p => {
        p5.line(point.x, point.y, p.x, p.y)
    })
    p5.noLoop()
}


export const drawWebDinamic = (p5: P5, dist: number = 60)   => (point: TPoint, index: number, array: TPoint[]) => {
    const color = getRandomColorFrom(PALLETTES.rainbow)
    p5.stroke(color)
    let randomPoints = getNRandomsFromArray(array.length / 50)(array)
    randomPoints = randomPoints.filter((p) => p5.dist(p.x, p.y, point.x, point.y) < dist)

    randomPoints.forEach(p => {
        p5.line(point.x, point.y, p.x, p.y)
    })
    //p5.noLoop()
}


export const drawBuildings = (p5: P5) => (point: TPoint, index: number, array: TPoint[]) => {
    p5.stroke(p5.sin(p5.frameCount / 20) * (index % 11) * 20 + 100)
    p5.strokeWeight(index % 7)
    p5.point(point.x, point.y)
}

export const drawChars = (p5: P5) => (point: TPoint, index: number, array: TPoint[]) => {
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

export const drawRandomRect = (p5: P5) => (point: TPoint, index: number, array: TPoint[]) => {
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
    p5.circle(point.x, point.y, p5.random(5, 20))

    p5.noLoop()

}

//TODO: rename this function
export const drawSquareEsim = (p5: P5, PALETTE: string[]) => (square: TSquare): void => {
    p5.push()
    p5.stroke(square.color)
    p5.noFill()
    p5.rect(square.x, square.y, square.size, square.size)

    if (square.size > 50) {
        const randOffset = Math.sin(Date.now() / 1000 + square.id) * square.size //getRandomNumber(0, square.size)
        p5.fill(square.color)
        p5.rect(square.x, square.y, randOffset, randOffset)

        const step = square.size / PALETTE.length
        for (let i = PALETTE.length - 1; i >= 0; i--) {
            p5.fill(PALETTE[i])
            p5.rect(square.x, square.y, step * i, step * i)
        }

    }
    p5.ellipse(square.x, square.y, 2, 2)

    p5.pop()
}


const makeSubSquares = (PALETTE: string[]) => (square: TSquare): TSquare[] => {
    const newSize = square.size / 3
    const recSquares = []

    if (Math.random() > 0.4) {
        const lt = { ...square }
        lt.size = newSize
        lt.color = getRandomColorFrom(PALETTE)
        lt.x = square.x - newSize / 2
        lt.y = square.y - newSize / 2
        recSquares.push(lt)
    }

    if (Math.random() > 0.4) {
        const lb = { ...square }
        lb.size = newSize
        lb.color = getRandomColorFrom(PALETTE)
        lb.x = square.x - newSize / 2
        lb.y = square.y + newSize / 2
        recSquares.push
    }

    if (Math.random() > 0.5) {
        const rt = { ...square }
        rt.size = newSize
        rt.color = getRandomColorFrom(PALETTE)
        rt.x = square.x + newSize / 2
        rt.y = square.y - newSize / 2
        recSquares.push(rt)
    }

    if (Math.random() > 0.5) {
        const rb = { ...square }
        rb.size = newSize
        rb.color = getRandomColorFrom(PALETTE)
        rb.x = square.x + newSize / 2
        rb.y = square.y + newSize / 2
        recSquares.push(rb)
    }

    return recSquares
}

export const drawSquare = (p5: P5, PALETTE: string[]) => (square: TSquare): void => {
    if (square.size < 10)
        return

    p5.push()
    /*     p5.translate(square.x, square.y)
        p5.rotate(Math.random()/10)
     */    //p5.noStroke()
    p5.stroke("black")
    p5.fill(square.color)
    p5.rect(square.x, square.y, square.size, square.size)
    p5.pop()

    const subsquares = makeSubSquares(PALETTE)(square)

    for (let subs of subsquares) {
        drawSquare(p5, PALETTE)(subs)
    }


}