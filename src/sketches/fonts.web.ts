//https://fonter.am/en/fonts/free-sans

import P5 from 'p5';
import { TPoint, TWalls } from '../lib/types';
import { drawBuildings, drawChars, drawDiagonals, drawEntropy, drawItalic, drawLabirynthLines, drawLines, drawLinesToPoint, drawRandomRect, drawPoint, drawPointAndLines, drawRandomCircle, drawWeb, drawWebDinamic } from '../lib/drawers';
import { circularArray } from '../lib/data.structures';
import { gardenText } from '../lib/gardens';

const walls: TWalls = {
    w: document.documentElement.clientWidth,
    h: document.documentElement.clientHeight,
    padding: 3
}

const findRight = (p5: P5) => (points: TPoint[]) => {
    return p5.max(points.map(point => point.x))
}

export const fontsWeb = (p5: P5) => {
    let y = walls.h - walls.h/3
    let paddings = 50
    let points = []
    let text = "_ "
    let typedText = ""
    let mutatedPoints = []
    let canvas

    const updatePoints = (y: number) => {
        points = []
        points.push(...gardenText(p5)(text, 500, 10, { x: paddings, y: y }, walls))
        mutatedPoints = points.map(p => { return { ...p } })
        p5.background(0)
    }

    p5.setup = () => {
        canvas = p5.createCanvas(walls.w, walls.h);
        canvas.parent("app");
        p5.frameRate(10)
        updatePoints(y)
    };

    p5.draw = () => {
        p5.background(0);
        p5.stroke("white")

        p5.push()
        mutatedPoints.forEach(drawWeb(p5,90))
        p5.pop()
        
    }

    p5.keyPressed = () => {
               
        if (p5.keyCode === p5.BACKSPACE) {
            text = text.slice(0, -1)
            updatePoints(y)
            p5.loop()
            return
        } 

        if (p5.key.length > 1) return

        text = text + p5.key
        if (findRight(p5)(points) > walls.w - paddings) {
            const words = text.split(" ")
            const tail = words[words.length-1]
            const body = words.splice(0, words.length-1)
            text =  body.join(" ") + "\n" + tail 
            y-=200
        }
        //console.log(text)
        updatePoints(y)
        p5.loop()
        //typedText += p5.key

        //p5.saveCanvas(canvas, "png")

    }

};
