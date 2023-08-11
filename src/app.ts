import P5 from "p5";
import "p5/lib/addons/p5.dom";
import "./styles.scss";
import { epicycloid } from './sketches/parametric_equations_epicycloid';
import { butterfly_curve } from './sketches/parametric_equations_butterfly';

new P5(butterfly_curve);