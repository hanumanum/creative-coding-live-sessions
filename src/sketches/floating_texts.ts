//https://fonter.am/en/fonts/free-sans

import P5 from 'p5';
import { TPoint, TWalls } from '../lib/types';
import { gardenRandom, gardenCircular, gardenEpicycloid, gardenSpiral, gardenGreed } from '../lib/gardens';
import { drawPoint } from '../lib/drawers';
import { getRandomNumber } from '../lib/math';

type TCharPoint = TPoint & { char: string }
type TNullify = (item: any) => any

const DEBUG_MODE = false

const pontsHandPicked = [
    {
        "x": 1827,
        "y": 925
    },
    {
        "x": 1775,
        "y": 921
    },
    {
        "x": 1723,
        "y": 915
    },
    {
        "x": 1671,
        "y": 907
    },
    {
        "x": 1635,
        "y": 897
    },
    {
        "x": 1585,
        "y": 878
    },
    {
        "x": 1533,
        "y": 859
    },
    {
        "x": 1473,
        "y": 837
    },
    {
        "x": 1422,
        "y": 816
    },
    {
        "x": 1373,
        "y": 794
    },
    {
        "x": 1298,
        "y": 770
    },
    {
        "x": 1233,
        "y": 755
    },
    {
        "x": 1165,
        "y": 751
    },
    {
        "x": 1124,
        "y": 775
    },
    {
        "x": 1086,
        "y": 812
    },
    {
        "x": 1057,
        "y": 840
    },
    {
        "x": 1026,
        "y": 867
    },
    {
        "x": 993,
        "y": 888
    },
    {
        "x": 945,
        "y": 900
    },
    {
        "x": 895,
        "y": 873
    },
    {
        "x": 864,
        "y": 886
    },
    {
        "x": 838,
        "y": 908
    },
    {
        "x": 796,
        "y": 927
    },
    {
        "x": 749,
        "y": 929
    },
    {
        "x": 702,
        "y": 906
    },
    {
        "x": 661,
        "y": 880
    },
    {
        "x": 610,
        "y": 872
    },
    {
        "x": 546,
        "y": 880
    },
    {
        "x": 505,
        "y": 847
    },
    {
        "x": 466,
        "y": 802
    },
    {
        "x": 418,
        "y": 757
    },
    {
        "x": 359,
        "y": 735
    },
    {
        "x": 290,
        "y": 730
    },
    {
        "x": 235,
        "y": 738
    },
    {
        "x": 187,
        "y": 712
    },
    {
        "x": 162,
        "y": 661
    },
    {
        "x": 139,
        "y": 611
    },
    {
        "x": 105,
        "y": 563
    },
    {
        "x": 55,
        "y": 508
    },
    {
        "x": 18,
        "y": 459
    },
    {
        "x": 1856,
        "y": 601
    },
    {
        "x": 1788,
        "y": 583
    },
    {
        "x": 1729,
        "y": 576
    },
    {
        "x": 1657,
        "y": 548
    },
    {
        "x": 1619,
        "y": 485
    },
    {
        "x": 1564,
        "y": 493
    },
    {
        "x": 1523,
        "y": 528
    },
    {
        "x": 1481,
        "y": 545
    },
    {
        "x": 1433,
        "y": 550
    },
    {
        "x": 1369,
        "y": 551
    },
    {
        "x": 1303,
        "y": 537
    },
    {
        "x": 1247,
        "y": 504
    },
    {
        "x": 1189,
        "y": 476
    },
    {
        "x": 1131,
        "y": 482
    },
    {
        "x": 1082,
        "y": 497
    },
    {
        "x": 1044,
        "y": 521
    },
    {
        "x": 1017,
        "y": 540
    },
    {
        "x": 982,
        "y": 567
    },
    {
        "x": 939,
        "y": 598
    },
    {
        "x": 882,
        "y": 620
    },
    {
        "x": 807,
        "y": 619
    },
    {
        "x": 720,
        "y": 593
    },
    {
        "x": 645,
        "y": 555
    },
    {
        "x": 574,
        "y": 545
    },
    {
        "x": 512,
        "y": 571
    },
    {
        "x": 460,
        "y": 591
    },
    {
        "x": 405,
        "y": 609
    },
    {
        "x": 348,
        "y": 633
    },
    {
        "x": 290,
        "y": 661
    },
    {
        "x": 234,
        "y": 684
    },
    {
        "x": 199,
        "y": 612
    },
    {
        "x": 181,
        "y": 540
    },
    {
        "x": 147,
        "y": 474
    },
    {
        "x": 110,
        "y": 418
    },
    {
        "x": 47,
        "y": 377
    },
    {
        "x": 17,
        "y": 322
    },
    {
        "x": 1894,
        "y": 197
    },
    {
        "x": 1861,
        "y": 235
    },
    {
        "x": 1825,
        "y": 269
    },
    {
        "x": 1786,
        "y": 307
    },
    {
        "x": 1742,
        "y": 348
    },
    {
        "x": 1688,
        "y": 384
    },
    {
        "x": 1608,
        "y": 396
    },
    {
        "x": 1531,
        "y": 378
    },
    {
        "x": 1461,
        "y": 362
    },
    {
        "x": 1400,
        "y": 373
    },
    {
        "x": 1361,
        "y": 390
    },
    {
        "x": 1319,
        "y": 353
    },
    {
        "x": 1269,
        "y": 357
    },
    {
        "x": 1218,
        "y": 380
    },
    {
        "x": 1173,
        "y": 398
    },
    {
        "x": 1099,
        "y": 399
    },
    {
        "x": 1040,
        "y": 367
    },
    {
        "x": 982,
        "y": 335
    },
    {
        "x": 924,
        "y": 347
    },
    {
        "x": 874,
        "y": 376
    },
    {
        "x": 834,
        "y": 407
    },
    {
        "x": 774,
        "y": 434
    },
    {
        "x": 694,
        "y": 401
    },
    {
        "x": 621,
        "y": 366
    },
    {
        "x": 581,
        "y": 382
    },
    {
        "x": 537,
        "y": 404
    },
    {
        "x": 477,
        "y": 427
    },
    {
        "x": 417,
        "y": 415
    },
    {
        "x": 366,
        "y": 369
    },
    {
        "x": 337,
        "y": 323
    },
    {
        "x": 298,
        "y": 276
    },
    {
        "x": 234,
        "y": 278
    },
    {
        "x": 196,
        "y": 314
    },
    {
        "x": 199,
        "y": 371
    },
    {
        "x": 242,
        "y": 405
    },
    {
        "x": 299,
        "y": 377
    },
    {
        "x": 360,
        "y": 260
    },
    {
        "x": 391,
        "y": 200
    },
    {
        "x": 439,
        "y": 163
    },
    {
        "x": 507,
        "y": 150
    },
    {
        "x": 588,
        "y": 150
    },
    {
        "x": 640,
        "y": 160
    },
    {
        "x": 694,
        "y": 183
    },
    {
        "x": 709,
        "y": 121
    },
    {
        "x": 669,
        "y": 95
    },
    {
        "x": 605,
        "y": 84
    },
    {
        "x": 541,
        "y": 84
    },
    {
        "x": 475,
        "y": 84
    },
    {
        "x": 425,
        "y": 104
    },
    {
        "x": 356,
        "y": 114
    },
    {
        "x": 283,
        "y": 96
    },
    {
        "x": 215,
        "y": 73
    },
    {
        "x": 167,
        "y": 79
    },
    {
        "x": 107,
        "y": 108
    },
    {
        "x": 53,
        "y": 163
    },
    {
        "x": 20,
        "y": 174
    },
    {
        "x": 925,
        "y": 128
    }
]

const frameRate = 5
const textSize = 60
const textColor = "white"

const walls: TWalls = {
    w: document.documentElement.clientWidth,
    h: document.documentElement.clientHeight,
    padding: 3
}

const nullify: TNullify = (item) => {
    return {
        ...item,
        char: null
    }
}

const makeCharPoint = (char: string) => (point: TPoint): TCharPoint => {
    return {
        ...point,
        char
    }
}
const makeCharsRow = (points: TPoint[]): TCharPoint[] => {
    const _makeCharPoint = makeCharPoint(null)
    return points.map(_makeCharPoint)
}

const shiftCharsLeft = (array: any[], shift: number): any[] => {
    for (let i = 0; i < array.length; i++) {
        if (i - shift < 0)
            continue

        array[i - shift].char = array[i].char
        array[i] = nullify(array[i])
    }

    return array
}

const addCharToRow = (charsInRow: TCharPoint[], char: string): TCharPoint[] => {
    const _makeCharPoint = makeCharPoint(char)
    charsInRow = shiftCharsLeft(charsInRow, 1)

    const tailIndex = charsInRow.length - 1
    charsInRow[tailIndex] = _makeCharPoint({ x: charsInRow[tailIndex].x, y: charsInRow[tailIndex].y })

    return charsInRow
}

const printItem = (p5: P5) => (charPoint: TCharPoint, index: number, array: any[]) => {
    if (charPoint.char) {
        p5.fill(255)
        p5.textSize(textSize)
        p5.text(charPoint.char, charPoint.x, charPoint.y)
    }
    else {
        if (!DEBUG_MODE)
            return
        p5.fill(50)
        p5.textSize(1)
        p5.text(".", charPoint.x, charPoint.y)
    }
}

export const floatingTexts = (p5: P5) => {
    const characters = "I am a text".split("")
    const pushChar = (char: any) => characters.push(char)
    //const curve: { x: number, y: number }[] =  gardenEpicycloid(200, 111, walls.w/2, walls.h/2) //garden_circular(walls.w / 2, walls.h / 2, 400, 0.09)
    let typedText = []

    const curve_tmp = []

    const curve = pontsHandPicked.reverse()//gardenRandom(50, walls.w, walls.h) //(gardenSpiral(walls.w / 2, walls.h / 2, 50, 0.72)).slice(100, 15000)
    let charMatrix = makeCharsRow(curve)

    p5.setup = () => {
        const canvas = p5.createCanvas(walls.w, walls.h);
        canvas.parent("app");
        p5.frameRate(frameRate)
    };

    p5.draw = () => {
        p5.background(0);
        p5.fill(textColor)
        p5.textSize(textSize)

        p5.stroke(255)
        if (DEBUG_MODE)
            curve_tmp.forEach(drawPoint(p5))

        charMatrix.forEach(printItem(p5))

        charMatrix = (characters.length === 0) ? shiftCharsLeft(charMatrix, 1) : addCharToRow(charMatrix, characters.shift())

        p5.push()
        p5.textSize(10)
        p5.noStroke()
        p5.fill(255)
        p5.text(typedText.join(""), 10, walls.h - 10)
        p5.pop()
    }

    p5.keyPressed = () => {
        if (p5.keyCode === p5.ENTER) {
            typedText.forEach(pushChar)
            typedText = []
            return
        }

        if (p5.keyCode === p5.BACKSPACE) {
            typedText.pop()
            return
        }


        if (p5.key.length > 1) return

        typedText.push(p5.key)

    }

    p5.mousePressed = () => {
        if (DEBUG_MODE) {
            curve_tmp.push({ x: p5.mouseX, y: p5.mouseY })
            console.log(curve_tmp)
        }
    }

};
