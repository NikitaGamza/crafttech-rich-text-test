import { MutableRefObject, RefObject } from 'react';

export interface IFigureType {
  id: Date;
  width: number;
  height: number;
  type: string;
  x: number;
  y: number;
  html: string;
  text: string;
}
export interface ICanvasPropsType {
  tool: string;
  stageRef: RefObject<MutableRefObject<null>>;
}
