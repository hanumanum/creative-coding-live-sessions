//https://en.wikipedia.org/wiki/Truchet_tiles
//https://en.wikipedia.org/wiki/Trax_(game)
//TODO: create also a truchet tiles with 3 options, like the trax game

import P5 from 'p5';
import { TPoint, TWalls } from '../lib/types';
import { gardenGreed } from '../lib/gardens';
import { getRandomNumber } from '../lib/math';
import { pickRandomColor } from '../lib/colors';
import { PALLETTES } from '../lib/colors';
import { drawPoint } from '../lib/drawers';

const walls: TWalls = {
    w: document.documentElement.clientWidth,
    h: document.documentElement.clientHeight,
    padding: 3
}

const gridSize = 50

enum ETruchetTrianglesOrientation {
    topLeft,
    topRight,
    bottomRight,
    bottomLeft
}

enum ETruchetArcsOrientation {
    topLeft,
    topRight,
}

type TTruchetTile = {
    x: number,
    y: number,
    size: number,
    color: string
}


type TTruchetTileTriangle = TTruchetTile & {
    orientation: ETruchetTrianglesOrientation
}

type TTruchetTileArcs = TTruchetTile & {
    orientation: ETruchetArcsOrientation,
    strokeWeight: number
}

const pushPop = (p5: P5) => (fn: Function) => {
    p5.push()
    fn()
    p5.pop()
}

const drawTruchetTriangle = (p5: P5) => (tile: TTruchetTileTriangle) => {
    const draw = () => {
        p5.noStroke()
        p5.fill(tile.color)

        if (tile.orientation === ETruchetTrianglesOrientation.topRight) {
            p5.triangle(tile.x, tile.y, tile.x + tile.size, tile.y, tile.x, tile.y + tile.size)
            return
        }

        if (tile.orientation === ETruchetTrianglesOrientation.topLeft) {
            p5.triangle(tile.x, tile.y, tile.x + tile.size, tile.y, tile.x + tile.size, tile.y + tile.size)
            return
        }

        if (tile.orientation === ETruchetTrianglesOrientation.bottomLeft) {
            p5.triangle(tile.x, tile.y, tile.x + tile.size, tile.y + tile.size, tile.x, tile.y + tile.size)
            return
        }

        if (tile.orientation === ETruchetTrianglesOrientation.bottomRight) {
            p5.triangle(tile.x + tile.size, tile.y, tile.x + tile.size, tile.y + tile.size, tile.x, tile.y + tile.size)
            return
        }

    }

    pushPop(p5)(draw)
}

const drawTruchetArcs = (p5: P5) => (tile: TTruchetTileArcs) => {
    const draw = () => {
        p5.stroke(tile.color)
        p5.noFill()

        p5.strokeWeight(tile.strokeWeight)

        if (tile.orientation === ETruchetArcsOrientation.topLeft) {
            p5.arc(tile.x, tile.y, tile.size, tile.size, 0, p5.HALF_PI)
            p5.arc(tile.x + tile.size, tile.y + tile.size, tile.size, tile.size, p5.PI, p5.PI + p5.HALF_PI)
            return
        }

        if(tile.orientation === ETruchetArcsOrientation.topRight){
            p5.arc(tile.x + tile.size, tile.y, tile.size, tile.size, p5.HALF_PI, p5.PI)
            p5.arc(tile.x, tile.y + tile.size, tile.size, tile.size, p5.PI + p5.HALF_PI, p5.TWO_PI)
        }

    }

    pushPop(p5)(draw)
}
const randomTriangleTiles = (p: TPoint): TTruchetTileTriangle => {
    return {
        x: p.x,
        y: p.y,
        size: gridSize,
        color: PALLETTES.blueorange[0],
        orientation: Math.floor(getRandomNumber(0, 4))
    }
}

const randomArcTiles = (p: TPoint): TTruchetTileArcs => {
    return {
        x: p.x,
        y: p.y,
        size: gridSize,
        color: PALLETTES.blueorange[4],
        strokeWeight: 4,
        orientation: Math.floor(getRandomNumber(0, 2))
    }
}

 
const nextTOrientation = (tile) => {
    return {
        ...tile,
        orientation: (tile.orientation + 1) % 2
    }
} 



const grid = gardenGreed(walls.w, walls.h, gridSize, gridSize)
let tiles = grid.map(randomArcTiles)
let points = [...grid]

export const truchet_tiles = (p5: P5) => {
    p5.setup = () => {
        const canvas = p5.createCanvas(walls.w, walls.h);
        canvas.parent("app");
        p5.frameRate(1)
    };

    p5.draw = () => {
        

        p5.background(0, 200);
        p5.stroke("white")

        const tiles = grid.map(randomArcTiles)
        //tiles = tiles.map(nextTOrientation)

        tiles.forEach(drawTruchetArcs(p5))
        //grid.forEach(drawPoint(p5))

        //p5.noLoop()

    }

    p5.mouseClicked = () => {

    }

};
