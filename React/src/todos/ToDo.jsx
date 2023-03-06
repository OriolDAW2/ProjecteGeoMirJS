import React from 'react';

export const ToDo = ({todo, handleDeleteToDo, handleToggleTodo}) => {
  
    return (
        <div key={ todo.id } className="flex mb-4 items-center">
            { todo.done ?
                <p className="w-full text-green">
                    { todo.text }
                </p> :
                <p className="w-full line-through text-green">
                    { todo.text }
                </p>
            }
            { todo.done ?
                <button onClick={()=>{handleToggleTodo(todo.id)}} className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-400 border-gray-600 hover:bg-gray-500">
                    Fet
                </button> : 
                <button onClick={()=>{handleToggleTodo(todo.id)}} className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-400 border-gray-600 hover:bg-gray-500">
                    No Fet
                </button>
            }
            <button onClick={()=>{handleDeleteToDo(todo.id)}} className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-400 border-red-600 hover:text-white hover:bg-red-500">
                Remove
            </button>
        </div>
    )
}
