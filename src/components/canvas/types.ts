import { MutableRefObject } from 'react';

export interface IFigureType {
  id: Date;
  width: Number;
  height: Number;
  type: string;
  x: Number;
  y: Number;
  html: string;
  text: string;
}
export interface ICanvasPropsType {
  tool: string;
  stageRef: MutableRefObject<null>;
}
