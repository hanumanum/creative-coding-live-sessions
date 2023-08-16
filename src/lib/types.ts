import { Vector } from 'p5';
export type TPoint = {
    x: number;
    y: number;
}

export type TEllipse = {
    radius1: number;
    radius2: number;
    color: string;
} & TPoint


export type TMovable = {
    position: Vector,
    velocity: Vector,
    acceleration: Vector,
    color: string,
    size: number,
    fill: boolean
    move: () => TMovable
}