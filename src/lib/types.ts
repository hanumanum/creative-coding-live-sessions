import { Vector } from 'p5';
export type TPoint = {
    x: number;
    y: number;
}

export type TWalls = {
    w: number,
    h: number,
    padding: number
}

export type TEllipse = TPoint & {
    radius1: number;
    radius2: number;
    color: string;
}


export type TMovableBasic = {
    position: Vector,
    velocity: Vector,
    acceleration?: Vector
}

export type TMovableCircle = TMovableBasic & {
    color: string,
    size: number,
    fill: boolean
    move: () => TMovableCircle
}


export type THidra = TMovableBasic & {
    firstAnchor: TPoint[],
    firstControl: TPoint[],
    secondControl: TPoint[],
    secondAnchor: TPoint[],
    color: string,
    move?: () => THidra
}

export type TSquare = {
    id: number,
    x: number,
    y: number,
    color: string,
    size: number,
    stop: boolean;
    valocity: number;
}

export type TCharPoint = TPoint & { char: string }

export type TLetterPoint = TCharPoint & { 
        size: number, 
        dx: number,
        dy: number
    }