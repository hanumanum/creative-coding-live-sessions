//https://fonter.am/en/fonts/free-sans

import P5 from 'p5';
import { TPoint, TWalls } from '../lib/types';
import { circularArray } from '../lib/data.structures';
import { PALLETTES, pickRandomTuple } from '../lib/colors';
import { gardenRandom } from '../lib/gardens';
import { drawPoint } from '../lib/drawers';

const walls: TWalls = {
    w: document.documentElement.clientWidth,
    h: document.documentElement.clientHeight,
    padding: 3
}

const center: TPoint = {
    x: walls.w / 2,
    y: walls.h / 2
}

const Armenian = ["Ա", "Բ", "Գ", "Դ", "Ե", "Զ", "Է", "Ը", "Թ", "Ժ", "Ի", "Լ", "Խ", "Ծ", "Կ", "Հ", "Ձ", "Ղ", "Ճ", "Մ", "Յ", "Ն", "Շ", "Ո", "Չ", "Պ", "Ջ", "Ռ", "Ս", "Վ", "Տ", "Ր", "Ց", "Ւ", "Փ", "Ք", "և", "Օ", "Ֆ"]
const Futhark = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛋ", "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛚ", "ᛜ", "ᛟ", "ᛞ"]
const Latin = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const Greek = ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω"];
const Hebrew = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת", "ך", "ם", "ן", "ף", "ץ"]
const Devanāgarī = ["अ", "ब", "ग", "द", "इ", "ज", "ह", "त", "ई", "क", "ल", "म", "न", "ञ", "ओ", "प", "र", "ष", "त", "उ", "फ", "च", "य", "व"];
const Arabic = ["ا", "ب", "ج", "د", "ه", "و", "ز", "ح", "ط", "ي", "ك", "ل", "م", "ن", "س", "ع", "ف", "ص", "ق", "ر", "ش", "ت", "ث", "خ", "ذ", "ض", "ظ", "غ", "ء", "ئ", "ؤ", "ى", "ة", "إ", "أ", "آ", "؟", "؛", "،", "ـ", "٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨"]

const alphabets = {
    Armenian,
    Futhark,
    Latin,
    Greek,
    Hebrew,
    Devanāgarī,
    Arabic
}

const dividers = [/*1, 2,*/ 4, 8, 16, 24, /*, 32 , 64 */]
const nextDivider = (divider: number): number => {
    if (divider >= 32)
        return 1

    if (divider === 1) {
        divider = 2
        return divider
    }

    divider *= 2
    return divider
}
const prevDivider = (divider: number): number => {
    if (divider <= 2) {
        divider = 1
        return divider
    }
    divider /= 2
    return divider
}

const printInfo = (p5: P5) => (char: string) => (divider: number) => (alphabet: string) => (size: number) => {
    p5.push()
    p5.noStroke()
    p5.fill("white")
    p5.textSize(size)
    p5.text(`Letter ${char}`, size, size * 2);
    p5.text(`Rotations ${divider}`, size, size * 3);
    p5.text(`Alphabet: ${alphabet}`, size, size * 4);
    p5.pop()
}

const drawLetterMandala = (p5: P5) => (center: TPoint) => (divider: number) => (char: string) => (colors: string[]) => (size: number) => {
    p5.push()
    p5.noFill()
    p5.strokeWeight(5)
    p5.translate(center.x, center.y)

    const osscilateSize = Math.sin(Date.now() / 500) * 100 + size
    const osscilateOffset = Math.cos(Date.now() / 500) * 100 + 100
    let i = 0

    p5.textSize(osscilateSize)
    for (let a = 0; a < 2 * Math.PI; a += 2 * Math.PI / divider) {
        p5.rotate(a)
        p5.stroke(colors[i % colors.length])
        p5.text(char, -osscilateOffset, -50);
        p5.circle(0, 0, 2)
        p5.rotate(-a)

        i++
    }

    p5.pop()

}

export const SPIELART_alphabetsMandala = (p5: P5) => {
    let palette = PALLETTES.fullrainbow
    let alphabetName = "Armenian"
    let currentAlphabet = circularArray(alphabets[alphabetName])
    let frameRate = 30
    let canvas
    let char = currentAlphabet.next()
    let divider = 4
    let colors = pickRandomTuple(palette)(2)

    p5.setup = () => {
        canvas = p5.createCanvas(walls.w, walls.h);
        canvas.parent("app");
        p5.frameRate(frameRate)
    };

    p5.draw = () => {

        p5.background(0)

        p5.push()
        p5.stroke(colors[0])
        const points = gardenRandom(200, walls.w, walls.h)
        points.forEach(drawPoint(p5))
        p5.pop()

        printInfo(p5)(char)(divider)(alphabetName)(25)

        p5.push()
        p5.translate(center.x, center.y)
        p5.rotate(p5.frameCount / 10)
        drawLetterMandala(p5)({ x: 0, y: 0 })(divider)(char)(colors)(400)
        p5.pop()

        p5.push()
        p5.stroke(colors[0])
        p5.noFill()
        p5.ellipse(center.x, center.y, 10, 10)
        p5.pop()

        if (p5.frameCount % 180 === 0) {
            alphabetName = p5.random(Object.keys(alphabets))
            char = p5.random(alphabets[alphabetName])
            divider = p5.random(dividers)
            colors = pickRandomTuple(palette)(2)
        }
    }

    p5.keyPressed = () => {
        colors = pickRandomTuple(palette)(2)

        if (p5.keyCode === p5.RIGHT_ARROW) {
            console.log(divider)
            divider = nextDivider(divider)
        }

        if (p5.keyCode === p5.LEFT_ARROW) {
            divider = prevDivider(divider)
        }

        if (p5.keyCode === p5.UP_ARROW) {
            char = currentAlphabet.next()
        }

        if (p5.key === "p") {
            p5.noLoop()
            p5.saveCanvas(canvas, "png")
            p5.loop()
        }
    }

};