import { useState } from 'react';
import { Layer, Stage } from 'react-konva';
import Shape from '../shape/Shape';
import { IFigureType, ICanvasPropsType } from './types';
import { KonvaEventObject } from 'konva/lib/Node';
import Konva from 'konva';

const Canvas = ({ tool, stageRef }: ICanvasPropsType) => {
  const [figures, setFigures] = useState<Array<IFigureType>>([]);
  var text = new Konva.Text({
    x: 10,
    y: 15,
    text: 'Simple Text',
    fontSize: 30,
    fontFamily: 'Calibri',
    fill: 'green',
  });
  const handleOnClick = (e: KonvaEventObject<MouseEvent>) => {
    if (tool === 'cursor') return;
    const stage = e.target.getStage();
    const stageOffset = stage && stage.absolutePosition();
    const point = stage && stage.getPointerPosition();
    setFigures((prev: Array<IFigureType | any>) => [
      ...prev,
      {
        id: Date.now().toString(36),
        width: 100,
        height: 100,
        type: 'rect',
        x: point && stageOffset && point.x - stageOffset.x,
        y: point && stageOffset && point.y - stageOffset.y,
        html: '',
        text: '',
      },
    ]);
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={tool === 'cursor'}
      onClick={handleOnClick}
      ref={stageRef}
    >
      <Layer>
        {figures.map((figure: IFigureType, i: number) => {
          return <Shape key={i} {...figure} stageRef={stageRef} tool={tool} />;
        })}
      </Layer>
    </Stage>
  );
};

export default Canvas;
