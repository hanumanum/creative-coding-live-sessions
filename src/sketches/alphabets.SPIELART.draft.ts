//https://fonter.am/en/fonts/free-sans

import P5 from 'p5';
import { TPoint, TWalls } from '../lib/types';
import { circularArray } from '../lib/data.structures';
import { PALLETTES, pickRandomTuple } from '../lib/colors';

const Armenian = ["Ա", "Բ", "Գ", "Դ", "Ե", "Զ", "Է", "Ը", "Թ", "Ժ", "Ի", "Լ", "Խ", "Ծ", "Կ", "Հ", "Ձ", "Ղ", "Ճ", "Մ", "Յ", "Ն", "Շ", "Ո", "Չ", "Պ", "Ջ", "Ռ", "Ս", "Վ", "Տ", "Ր", "Ց", "Ւ", "Փ", "Ք", "և", "Օ", "Ֆ"]
const Futhark = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛋ", "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛚ", "ᛜ", "ᛟ", "ᛞ"]
const Latin = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const Greek = ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω"];
const Hebrew = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת", "ך", "ם", "ן", "ף", "ץ"]
const Devanāgarī = ["अ", "ब", "ग", "द", "इ", "ज", "ह", "त", "ई", "क", "ल", "म", "न", "ञ", "ओ", "प", "र", "ष", "त", "उ", "फ", "च", "य", "व"];

const dividers = [1, 2, 4, 8, 16, 24, /*, 32 , 64 */]

const alphabets = {
    armenian: Armenian,
    futhark: Futhark,
    latin: Latin,
    greek: Greek,
    hebrew: Hebrew,
    sanskrit: Devanāgarī
}

const walls: TWalls = {
    w: document.documentElement.clientWidth,
    h: document.documentElement.clientHeight,
    padding: 3
}

const center: TPoint = {
    x: walls.w / 2,
    y: walls.h / 2
}


const printInfo = (p5: P5) => (char: string) => (divider: number) => (alphabet: string) => (size: number) => {
    p5.push()
    p5.fill("white")
    p5.textSize(size)
    p5.text(`Letter ${char}`, size, size * 2);
    p5.text(`Rotations ${divider}`, size, size * 3);
    p5.text(`Alphabet: ${alphabet}`, size, size * 4);
    p5.pop()
}

const drawMandala = (p5: P5) => (center: TPoint) => (divider: number) => (char: string) => (colors: string[]) => (size: number) => {
    p5.push()
    p5.noFill()
    p5.strokeWeight(5)
    p5.translate(center.x, center.y)

    const osscilateSize = Math.sin(Date.now() / 500) * 100 + size
    let i = 0

    p5.textSize(osscilateSize)
    for (let a = 0; a < 2 * Math.PI; a += 2 * Math.PI / divider) {
        p5.rotate(a)
        p5.stroke(colors[i % colors.length])
        p5.text(char, -100, -50);
        p5.circle(0, 0, 2)
        p5.rotate(-a)

        i++
    }

    p5.pop()

}

export const alphabetsSpielArt_Draft = (p5: P5) => {
    const palette = PALLETTES.fullrainbow
    let colorTuple = pickRandomTuple(PALLETTES.blueorange)(2)

    const currentAlphabet = circularArray(alphabets.sanskrit)
    const frameRate = 30
    let canvas
    let char = currentAlphabet.next()
    let divider = 1 //p5.random(dividers)


    p5.setup = () => {
        canvas = p5.createCanvas(walls.w, walls.h);
        canvas.parent("app");
        p5.frameRate(frameRate)
    };

    p5.draw = () => {
        p5.background(0)

        drawMandala(p5)(center)(divider)(char)(colorTuple)(400)
        printInfo(p5)(char)(divider)("Devanāgarī")(30)
    }


    p5.keyPressed = () => {
        if (p5.keyCode === p5.RIGHT_ARROW) {
            char = currentAlphabet.next()
            colorTuple = pickRandomTuple(PALLETTES.blueorange)(2)
        }

        if (p5.keyCode === p5.UP_ARROW) {
            if (divider == 1)
                divider = 2
            else
                divider *= 2
            
            colorTuple = pickRandomTuple(PALLETTES.blueorange)(2)
        }

        if (p5.keyCode === p5.DOWN_ARROW) {
            if (divider <= 2)
                divider = 1
            else
                divider /= 2

        }

        if (p5.key === "p") {
            p5.noLoop()
            p5.saveCanvas(canvas, "png")
            p5.loop()
        }

        p5.loop()
    }

};
