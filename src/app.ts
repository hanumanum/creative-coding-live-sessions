import P5 from "p5";
import "p5/lib/addons/p5.dom";
import "./styles.scss";
import { hidra_world } from './sketches/hidra';
import { vectors } from "./sketches/vectors";
import { sacred_geometry } from './sketches/sacred.geometry';
import { alphabets } from './sketches/alphabet';
import { truchet_tiles } from './sketches/truchet.tiles';
import { square_packing } from './sketches/square.packing';
import { mandala } from './sketches/mandala';
import { butterfly_curve } from './sketches/parametric_equations_butterfly';
import { epicycloid } from "./sketches/parametric_equations_epicycloid";
import { square_recursive } from "./sketches/square.packing.recursion";
import { floatingTexts } from "./sketches/floating_texts";
import { alphabets_web } from './sketches/alphabet_web';
import { alphabetsSpielArt } from "./sketches/alphabets.SPIELART";
import { alphabetsSpielArt_Draft } from './sketches/alphabets.SPIELART.draft';

new P5(alphabetsSpielArt);