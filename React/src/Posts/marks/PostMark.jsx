import React from 'react';
import { Link } from 'react-router-dom';

export const PostMark = ({mark, handleDeleteMark}) => {
  
    return (
        <div key={ mark.id } className="flex mb-4 items-center">
            <p className="w-full">
                { mark.body }
            </p>
            <Link to={mark.link} className="flex-no-shrink p-2 ml-2 border-2 rounded text-green-400 border-green-600 hover:text-white hover:bg-green-500">
                Ver Post
            </Link>
            <button onClick={()=>{handleDeleteMark(mark.id)}} className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-400 border-red-600 hover:text-white hover:bg-red-500">
                Remove
            </button>
        </div>
    )
}