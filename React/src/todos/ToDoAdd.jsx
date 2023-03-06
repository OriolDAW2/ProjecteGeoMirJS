import React from 'react';
import { useForm } from '../hooks/useForm';

export const ToDoAdd = ({handleNewToDo}) => {

    const { formState, onInputChange, onResetForm } = useForm({
        id: 0,
        text: "",
        done: true,
    });
    const {id, text, done} = formState;

    return (
        <div className="py-9 pl-9">
            <div className="w-1/3">
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
                        onClick={()=>{handleNewToDo(formState); onResetForm();}}
                        className="flex-in-line p-2 ml-2 border-2 rounded text-green-400 border-green-600 hover:text-white hover:bg-green-500">
                        Afegir Tasca
                    </button>
                </div>
            </div>
        </div>
  
    )
}