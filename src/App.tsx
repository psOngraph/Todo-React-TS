import React, { useState } from "react";
import "./App.css";

import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./models/model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      setTodos([...todos, { id: Date.now(), task, isDone: false }]);
      setTask("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log(source, destination);
    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    let add,
      active = todos,
      complete = completedTodos;

    if (source.droppableId === "TodoList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    if (destination.droppableId === "TodoList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading"> Taskify</span>
        <InputField
          handleAddTask={handleAddTask}
          task={task}
          setTask={setTask}
        />

        <TodoList
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
          todos={todos}
          setTodos={setTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
