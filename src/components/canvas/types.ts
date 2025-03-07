import { MutableRefObject } from 'react';

export interface IFigureType {
  id: string;
  width: number;
  height: number;
  type: string;
  x: number;
  y: number;
  html: string;
  text: string;
  [Symbol.iterator](): typeof Symbol.iterator;
}
export interface ICanvasPropsType {
  tool: string;
  stageRef: MutableRefObject<null> | null;
}
