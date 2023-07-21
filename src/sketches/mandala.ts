import P5 from 'p5';
import { PALLETTES, getRandomColorFrom } from '../lib/colors';

const centerX = 450
const centerY = 450
let angle = 0


const rotateAround = (p5: P5, x: number, y: number, angle: number, callback: Function) => {
    p5.translate(x, y);
    p5.rotate(angle);
    callback();
    p5.rotate(-angle);
    p5.translate(-x, -y);

}

const ellipseAndRect = (p5: P5, radius1: number, radius2: number, w: number, h: number) => {
    p5.strokeWeight(1);
    p5.ellipse(0, 0, radius1, radius2);
    p5.rect(0, 0, w, h);
}


export const mandala = (p5: P5) => {


    p5.setup = () => {
        const canvas = p5.createCanvas(900, 900);
        canvas.parent("app");
        p5.background("black");
        p5.angleMode(p5.DEGREES);
        p5.textSize(200);
        p5.noFill();
        p5.strokeWeight(5);
    };

    p5.draw = () => {

        p5.stroke(getRandomColorFrom(PALLETTES.rainbow));

        rotateAround(p5, centerX, centerY, angle, () => {
            //p5.text("Ա", 0, 0)
            //ellipseAndRect(50, 100, 25, 25)
            ellipseAndRect(p5, 50, 160, 250, 250)
        })

        rotateAround(p5, centerX, centerY, angle, () => {
            ellipseAndRect(p5, 300, 50, 60, 60)
        })

        angle += 45

        p5.circle(centerX, centerY, 450)
        //p5.circle(centerX, centerY, 650)
        p5.circle(centerX, centerY, 850)
    }

};