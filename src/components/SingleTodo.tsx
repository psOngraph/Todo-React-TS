import React, { useRef, useState, useEffect } from "react";
import { Todo } from "../models/model";
import "./styles.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
  index: number;
};
const SingleTodo = ({ todo, setTodos, todos, index }: Props) => {
  const [editTodo, setEditTodo] = useState<Todo>(todo);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: Number) => {
    setTodos(
      todos.map(
        (data): Todo =>
          data.id === id ? { ...data, isDone: !data.isDone } : data
      )
    );
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((data) => data.id !== id));
  };
  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setTodos(
      todos.map(
        (data): Todo =>
          data.id === todo.id ? { ...data, task: editTodo.task } : data
      )
    );
    setIsEdit(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEdit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={handleEdit}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {isEdit ? (
            <input
              ref={inputRef}
              className="todos__single--text"
              value={editTodo.task}
              onChange={(e) => setEditTodo({ ...todo, task: e.target.value })}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.task}</s>
          ) : (
            <span className="todos__single--text">{todo.task}</span>
          )}
          <div>
            <span className="icon">
              <AiFillEdit
                onClick={() => {
                  if (!isEdit && !todo.isDone) {
                    setIsEdit(!isEdit);
                  }
                }}
              />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
