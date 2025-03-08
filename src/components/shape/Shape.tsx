import html2canvas from 'html2canvas';
import Konva from 'konva';
import {
  ChangeEventHandler,
  LegacyRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Circle, Group, Rect, Text } from 'react-konva';
import { Html } from 'react-konva-utils';
import HtmlText from '../htmlText/HtmlText';
import { IShapeProps } from './types';
import style from './Shape.module.scss';

const Shape = (props: IShapeProps) => {
  const { x, y, width, height, tool, html, id, text } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);

  const groupRef = useRef<Konva.Group>(null);
  const imageRef = useRef<Konva.Image | null>(null);
  const htmlRef: LegacyRef<HTMLDivElement> = useRef(null);
  const [fontSize, setFontSize] = useState('18');
  const [fontStyle, setFontStyle] = useState('normal');
  const [color, setColor] = useState('#000');
  const [figureColor, setFigureColor] = useState('#000');
  const [stroke, setStroke] = useState('#e4e');
  const [figureType, setFigureType] = useState('rect');
  const renderImage = async () => {
    const htmltext = document.getElementById(`htmltext_${id}`);
    if (htmltext) {
      const innerhtml = htmltext.innerHTML;
      if (innerhtml) {
        const canvas = await html2canvas(htmltext, {
          backgroundColor: 'rgba(0,0,0,0)',
        });
        const shape = new Konva.Image({
          x: 0,
          y: height / 2,
          scaleX: 1 / window.devicePixelRatio,
          scaleY: 1 / window.devicePixelRatio,
          image: canvas,
        });
        if (groupRef.current) {
          groupRef.current.add(shape);
        }
        imageRef.current = shape;
      } else return;
    } else return;
  };

  useEffect(() => {
    renderImage();
  }, []);

  const handleClick = () => {
    if (tool === 'shape') {
      return;
    } else {
      setIsEditing((prev) => !prev);
      if (imageRef.current) {
        if (isEditing) {
          imageRef.current.show();
        } else {
          imageRef.current.hide();
        }
      } else return;
    }
  };

  const handleInput: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Group x={x} y={y} onClick={handleClick} ref={groupRef} draggable>
        {value ? (
          <Text
            text={value}
            fontSize={Number(fontSize)}
            fontStyle={fontStyle}
            fill={color}
          />
        ) : figureType === 'rect' ? (
          <Rect
            stroke={stroke}
            width={width}
            height={height}
            fill={figureColor}
          />
        ) : (
          <Circle
            stroke={stroke}
            width={width}
            height={height}
            fill={figureColor}
          />
        )}
        {isEditing && (
          <Html>
            <div className={style.edit}>
              <h6 className={style.edit__head}>Параметры Текста</h6>
              <label htmlFor={`text__${id}`}>Введите текст</label>
              <textarea
                id={`text__${id}`}
                value={value}
                onChange={handleInput}
              />
              <label htmlFor={`fontSize__${id}`}>Размер шрифта</label>
              <input
                type="number"
                onChange={(e) => setFontSize(e.target.value)}
                id={`fontSize__${id}`}
                min={8}
                max={28}
                value={fontSize}
              />
              <label htmlFor={`style__${id}`}>Стиль текста</label>
              <select
                id={`style__${id}`}
                onChange={(e) => setFontStyle(e.target.value)}
              >
                <option selected={fontStyle === 'normal'} value="normal">
                  Обычный
                </option>
                <option selected={fontStyle === 'italic'} value="italic">
                  Курсив
                </option>
                <option selected={fontStyle === 'bold'} value="bold">
                  Жирный
                </option>
                <option
                  selected={fontStyle === 'italic bold'}
                  value="italic bold"
                >
                  Жирный и курсив
                </option>
              </select>
              <label htmlFor={`color__${id}`}>Выберите цвет</label>
              <input
                type="color"
                id={`color__${id}`}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className={style.edit}>
              <h6 className={style.edit__head}>Параметры фигуры</h6>
              <label htmlFor={`figureColor__${id}`}>Выберите цвет</label>
              <input
                type="color"
                id={`figureColor__${id}`}
                onChange={(e) => setFigureColor(e.target.value)}
              />
              <label htmlFor={`stroke__${id}`}>Выберите цвет контура</label>
              <input
                type="color"
                id={`stroke__${id}`}
                onChange={(e) => setStroke(e.target.value)}
              />
              <label htmlFor={`figureType__${id}`}>Фигура</label>
              <select
                id={`figureType__${id}`}
                onChange={(e) => setFigureType(e.target.value)}
              >
                <option selected={figureType === 'rect'} value="rect">
                  Квадрат
                </option>
                <option selected={figureType === 'circle'} value="circle">
                  Круг
                </option>
              </select>
            </div>
            <button onClick={() => setIsEditing(false)}>Закрыть</button>
          </Html>
        )}
      </Group>
      <Html>
        <HtmlText ref={htmlRef} html={html} id={id} />
      </Html>
    </>
  );
};

export default Shape;
