import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { delplacemark } from '../../slices/placeMarkSlice';

const PlaceMark = ({ placeMark }) => {
    console.log(placeMark)
    const dispatch = useDispatch();
    return (
        
        <tr className="mb-4 items-center ">
            <td className="text-grey-darkest">{placeMark.name}</td>
            <td class="text-sm leading-5 text-gray-900">{placeMark.name}{placeMark.description}</td>
            <td>
                <Link
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    to={placeMark.ruta}
                >
                    VER
                </Link>
            </td>
            <td>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={(e) => {
                        dispatch(delplacemark(placeMark.id));
                    }}
                >
                    ELIMINAR
                </button>
            </td>
        </tr>
            
        
    );
};

export default PlaceMark