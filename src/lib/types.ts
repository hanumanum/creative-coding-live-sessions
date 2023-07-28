export type TPoint = {
    x: number;
    y: number;
}

export type TEllipse = {
    radius1: number;
    radius2: number;
    color: string;
} & TPoint
