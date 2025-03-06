import { MutableRefObject, RefObject } from 'react';

export interface IShapeProps {
  id: Date;
  width: number;
  height: number;
  x: number;
  y: number;
  tool: string;
  html: string;
  text: string;
  stageRef: RefObject<MutableRefObject<null>>;
}
