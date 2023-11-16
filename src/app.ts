import P5 from "p5";
import "p5/lib/addons/p5.dom";
import "./styles.scss";
import { hidraWorld } from './sketches/hidra.world';
import { floatingBubbles } from "./sketches/floating.bubbles";
import { sacredGeometry } from './sketches/sacred.geometry';
import { fontsGenerative } from './sketches/fonts.generative';
import { truchetTiles } from './sketches/truchet.tiles';
import { squarePacking } from './sketches/square.packing';
import { mandalaSimple } from './sketches/simple.mandala';
import { paremetricButterflyCurve } from './sketches/paremetric.butterfly.curve';
import { parametricEpicycloidCurve } from "./sketches/parametric.epicycloid.curve";
import { squarePackingRecursive } from "./sketches/square.packing.recursion";
import { fontsWeb } from './sketches/fonts.web';
import { SPIELART_alphabetsMandala } from "./sketches/SPIELART.alphabets";
import { SPIELART_floatingTexts } from "./sketches/SPIELART.floating_texts";

import { space } from "./sketches/simple.space";

new P5(truchetTiles);