import { SetStateAction, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import Shape from '../shape/Shape';
import { IFigureType, ICanvasPropsType } from './types';

const Canvas = ({ tool, stageRef }: ICanvasPropsType) => {
  const [figures, setFigures] = useState<Array<IFigureType>>([]);

  const handleOnClick = (e: Event) => {
    console.log(stageRef);
    if (tool === 'cursor') return;
    const stage = e.target.getStage();
    const stageOffset = stage.absolutePosition();
    const point = stage.getPointerPosition();
    setFigures((prev: SetStateAction<IFigureType[]>) => [
      ...prev,
      {
        id: Date.now().toString(36),
        width: 100,
        height: 100,
        type: 'rect',
        x: point.x - stageOffset.x,
        y: point.y - stageOffset.y,
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
