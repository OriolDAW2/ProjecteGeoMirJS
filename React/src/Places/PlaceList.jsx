import React, { useCallback, useContext, useState } from 'react';
import { UserContext } from '../userContext';
import { Link } from 'react-router-dom';

export default function PlaceList ({place, deletePlace}) {
  let { userEmail, setUserEmail, authToken, setAuthToken } = useContext(UserContext);

  return (
    <>
        <td>{place.id}</td>
        <td>{place.description}</td>
        <td>{place.author.name}</td>
        <td>{place.latitude}</td>
        <td>{place.longitude}</td>
        <td>{place.visibility.name}</td>
        <td><Link className="" to={"/places/" +place.id}><i className=""></i></Link></td>
        <td><i className=""></i></td> : <td/>
        <Link className="" to={"/places/" +place.id}><i className="">Ver Place</i></Link>

        {(userEmail == place.author.email ) &&  
          <td><Link className="" to={"/places/edit/" +place.id}><i className="">Editar</i></Link></td>
        }

        {(userEmail == place.author.email ) && 
          <td>
            <button className="" onClick={(e) => {deletePlace(e,place.id);}}><i className="">Eliminar</i></button>
          </td>
        }
    </>
  )
}
