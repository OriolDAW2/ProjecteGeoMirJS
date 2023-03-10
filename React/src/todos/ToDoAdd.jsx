import React from 'react';
import { useForm } from '../hooks/useForm';
import { useDispatch } from 'react-redux';
import { addtodo } from '../slices/todosSlice';

export const ToDoAdd = () => {

    const { formState, onInputChange, onResetForm } = useForm({
        id: 0,
        text: "",
        done: true,
    });
    const {id, text, done} = formState;
    
    //const { todos } = useSelector(state => state.todos)
    //console.log(todos)
    const dispatch = useDispatch();
    
    const onFormSubmit = (event) => {
        event.preventDefault();
        if (text.length <= 1) return;
    
        const newTodo = {
          id: new Date().getTime(),
          text: text,
          done: false
        };
    
        onResetForm();
        //handle(newTodo)
        console.log("Abans del dispatch");
        dispatch(addtodo(newTodo));
    };

    return (
        <div className="py-9 pl-9">
            <div className="w-1/3">
                <form onSubmit={onFormSubmit}>
                    <label className="text-gray-600">Text</label>
                    <input
                        value={text}
                        name="text"
                        placeholder="Escriu alguna tasca"
                        onChange={onInputChange} 
                        className="w-300 px-4 py-3 border-2 border-gray-300 rounded-sm outline-none focus:border-blue-400">
                    </input>
                    <div className="py-9">
                        <button
                            type="submit"
                            value="Add"
                            className="flex-in-line p-2 ml-2 border-2 rounded text-green-400 border-green-600 hover:text-white hover:bg-green-500">
                            Afegir Tasca
                        </button>
                    </div>
                </form>
            </div>
        </div>
  
    )
}