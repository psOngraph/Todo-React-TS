import React, { useRef } from "react";

import "./styles.css";

interface Props {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  handleAddTask: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ task, setTask, handleAddTask }) => {

  const inputRef=useRef<HTMLInputElement>(null)

  return (
    <form className="input" onSubmit={(e)=>{handleAddTask(e);
    inputRef.current?.blur()
    }}>
      <input
        ref={inputRef}
        className="input__box"
        type="input"
        placeholder="Enter Todo"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="input_submit" type="submit">
        GO
      </button>
    </form>
  );
};

export default InputField;
