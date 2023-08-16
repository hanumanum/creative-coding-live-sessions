//https://docs.godotengine.org/en/stable/tutorials/math/vector_math.html
//https://natureofcode.com/book/chapter-1-vectors/

import P5, { Vector } from 'p5';
import { TMovable, TPoint } from '../lib/types';
import { PALLETTES, getRandomColorFrom } from '../lib/colors';
import { garden_random } from '../lib/gardens';
import { circularArray } from '../lib/data.structures';

const w = document.documentElement.clientWidth
const h = document.documentElement.clientHeight
const padding = 50

const length = 1000
const palette = PALLETTES.cyber

export const vectors = (p5: P5) => {
    p5.setup = () => {
        const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        canvas.parent("app");
    };

    p5.draw = () => {
        p5.background("black");
        p5.noFill()
    }
};