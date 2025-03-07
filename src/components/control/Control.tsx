import { IControlType } from './types';
import style from './Control.module.scss';
const Control = ({ tool, setTool }: IControlType) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTool(e.target.value);
  };

  return (
    <div style={{ position: 'absolute', top: 0 }}>
      <div>
        <input
          type="radio"
          id="cursor"
          name="control"
          value="cursor"
          checked={tool === 'cursor'}
          onChange={handleOnChange}
        />
        <label className={style.label} htmlFor="cursor">
          Взаимодействие
        </label>
      </div>

      <div>
        <input
          type="radio"
          id="shape"
          name="control"
          value="shape"
          checked={tool === 'shape'}
          onChange={handleOnChange}
        />
        <label className={style.label} htmlFor="shape">
          Добавление
        </label>
      </div>
    </div>
  );
};

export default Control;
