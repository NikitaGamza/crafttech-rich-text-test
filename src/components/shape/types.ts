import { MutableRefObject } from 'react';

export interface IShapeProps {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
  tool: string;
  html: string;
  text: string;
  stageRef: MutableRefObject<null> | null;
}
