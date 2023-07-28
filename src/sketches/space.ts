import P5 from 'p5';
import { PALLETTES, getRandomColorFrom } from '../lib/colors';

const centerX = 450
const centerY = 450


export const space = (p5: P5) => {

    p5.setup = () => {
        const canvas = p5.createCanvas(900, 900);
        canvas.parent("app");
        p5.background("black");
    };

    p5.draw = () => {

    }
};