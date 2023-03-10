import React from "react";
import { useEffect } from "react";
import { ToDo } from "./ToDo";
import { ToDoAdd } from "./ToDoAdd";
import { useDispatch, useSelector } from "react-redux";

// import { todosReducer } from "./todoReducer";

export const ToDos = () => {
  // const [todos, dispatchTodos] = useReducer(todosReducer, initialState, init);
  
  const { todos } = useSelector(state => state.todos)
  const dispatch = useDispatch(); 

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // const handleNewToDo = (todo) => {
  //   console.log("Afegeixo");
  //   console.log({ todo });

  //   todo.id = new Date().getTime()

  //   const action = {
  //     type: "Add Todo",
  //     payload: todo
  //   };

  //   console.log(todo)
  //   dispatchTodos(action);
  // };

  // const handleDeleteToDo = (id) => {
  //   console.log("AQui arribo " + id);
  //   dispatchTodos({
  //     type: "Del Todo",
  //     payload: id
  //   });
  // };

  // const handleToggleTodo = (id) => {
  //   dispatchTodos({
  //     type: "Toggle Todo",
  //     payload: id
  //   });
  // };

  // console.log(todos);

  return (
    <>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          {/* <ToDoAdd handle={handleNewToDo}/> */}
          <ToDoAdd />
          <div>
            {todos.length == 0 ? (
              <div></div>
            ) : (
              <></>
            )}
            {todos.map((todo) => (
              // <ToDo key={todo.id} todo={ todo } handleDelete={handleDeleteToDo} handleToggleTodo={handleToggleTodo } />
              <ToDo key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};