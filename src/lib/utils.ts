import P5 from 'p5';
export const rotateAround = (p5: P5, x: number, y: number, angle: number, callback: Function) => {
    p5.translate(x, y);
    p5.rotate(angle);
    callback();
    p5.rotate(-angle);
    p5.translate(-x, -y);
}