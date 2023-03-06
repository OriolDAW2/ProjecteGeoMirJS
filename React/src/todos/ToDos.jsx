import React from "react";
import { useEffect, useState, useReducer } from "react";
import { ToDo } from "./ToDo";
import { ToDoAdd } from "./ToDoAdd";
import { todosReducer } from "./todoReducer";

// Estat inicial del reducer. Buit
const initialState = [];
const init = () => {
  // Si localstorage tornes null tornariem un array buit
  return JSON.parse(localStorage.getItem("todos")) || [];
};

export const ToDos = () => {
  const [todos, dispatchTodos] = useReducer(todosReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewToDo = (todo) => {
    console.log("Afegeixo");
    console.log({ todo });

    todo.id = new Date().getTime()

    const action = {
      type: "Add Todo",
      payload: todo
    };

    console.log(todo)
    dispatchTodos(action);
  };

  const handleDeleteToDo = (id) => {
    console.log("AQui arribo " + id);
    dispatchTodos({
      type: "Del Todo",
      payload: id
    });
  };

  const handleToggleTodo = (id) => {
    dispatchTodos({
      type: "Toggle Todo",
      payload: id
    });
  };

  console.log(todos);

  return (
    <>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <ToDoAdd handleNewToDo={handleNewToDo} />
          <div>
            {todos.map((todo) => (
              <ToDo
                key={todo.id}
                todo={todo}
                handleDeleteToDo={handleDeleteToDo}
                handleToggleTodo={handleToggleTodo}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};