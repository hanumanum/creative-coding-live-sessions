//https://fonter.am/en/fonts/free-sans

import P5 from 'p5';
import { TLetterPoint, TPoint, TWalls } from '../lib/types';
import { circularArray } from '../lib/data.structures';
import { PALLETTES, getRandomColorFrom } from '../lib/colors';
const armenian = ["Ա", "Բ", "Գ", "Դ", "Ե", "Զ", "Է", "Ը", "Թ", "Ժ", "Ի", "Լ", "Խ", "Ծ", "Կ", "Հ", "Ձ", "Ղ", "Ճ", "Մ", "Յ", "Ն", "Շ", "Ո", "Չ", "Պ", "Ջ", "Ռ", "Ս", "Վ", "Տ", "Ր", "Ց", "Ւ", "Փ", "Ք", "և", "Օ", "Ֆ"]
const futhark = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛋ", "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛚ", "ᛜ", "ᛟ", "ᛞ"]
const latin = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const greek = ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω"];
const hebrew = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת", "ך", "ם", "ן", "ף", "ץ"]
const sanskrit = ["अ", "ब", "ग", "द", "इ", "ज", "ह", "त", "ई", "क", "ल", "म", "न", "ञ", "ओ", "प", "र", "ष", "त", "उ", "फ", "च", "य", "व"];

const dividers = [/* 1,  2,*/ 4, 8, 16, 24, /*, 32 , 64 */]

const alphabets = {
    armenian,
    futhark,
    latin,
    greek,
    hebrew,
    sanskrit
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


const makeLetterCloud = (count: number) => (alphabet: string[]): TLetterPoint[] => {
    return Array.from({ length: count }, () => {
        return {
            x: Math.random() * walls.w,
            y: Math.random() * walls.h,
            char: alphabet[Math.floor(Math.random() * alphabet.length)],
            size: Math.random() * 20,
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 2 - 1,
        }
    })
}

const moveLetter = (p5: P5) => (letter: TLetterPoint): TLetterPoint => {
    return {
        ...letter,
        x: letter.x + letter.dx,
        y: letter.y + letter.dy,
    }
}

const drawLetter = (p5: P5) => (letter: TLetterPoint) => {
    p5.push()
    p5.noStroke()
    p5.fill("white")
    p5.textSize(letter.size)
    p5.text(letter.char, letter.x, letter.y)
    p5.pop()
}


const drawMandala = (p5: P5) => (center: TPoint) => (divider: number) => (char: string) => (color1: string) => (size: number) => {
    p5.push()
    p5.noFill()
    p5.strokeWeight(5)
    p5.translate(center.x, center.y)

    p5.textSize(Math.sin(Date.now() / 500) * 100 + size)
    for (let a = 0; a < 2 * Math.PI; a += 2 * Math.PI / divider) {
        p5.rotate(a)
        p5.stroke(color1)
        p5.text(char, -100, -50);
        p5.circle(0, 0, 2)
       
        

    }

    p5.pop()

}

export const alphabetsSpielArt = (p5: P5) => {
    const palette = PALLETTES.rainbow
    const currentAlphabet = circularArray(alphabets.sanskrit)
    //let letterCloud = makeLetterCloud(1000)([...alphabets.armenian, ...alphabets.futhark, ...alphabets.latin, ...alphabets.greek, ...alphabets.hebrew])
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
        const color1 = getRandomColorFrom(palette)
        const color2 = getRandomColorFrom(palette)
        p5.background(0)

        /* letterCloud = letterCloud
            .map(moveLetter(p5))

        letterCloud.forEach(drawLetter(p5))
 */
        drawMandala(p5)(center)(divider)(char)("white")(400)


        if(p5.frameCount % 120 === 0){
            char = currentAlphabet.next()
        }

        if(p5.frameCount % 120 === 0){
            divider = p5.random(dividers)
        }

        p5.push()
        p5.fill("white")
        p5.textSize(100);
        p5.text(char, 50, 150);
        p5.pop()

        //p5.noLoop()
    }

    p5.mouseClicked = () => { }


    p5.keyPressed = () => {
        if (p5.keyCode === p5.RIGHT_ARROW) {
            char = currentAlphabet.next()

        }

        if (p5.keyCode === p5.UP_ARROW) {
            if (divider == 1)
                divider = 2
            else
                divider *= 2

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
