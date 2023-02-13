import React, { useCallback, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext';

export const PlaceGrid = ({place, deletePlace}) => {
  let { userEmail, setUserEmail, authToken, setAuthToken } = useContext(UserContext);

    return (
    <>
        <div className=''>
        <p>@{place.author.name}</p>
        <h2>{place.name}</h2>
            <img src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} alt={place.name} height="400"width="300"/>
            <div className=''>
                {place.description}     
            </div>
            <div id=''>
                {(userEmail == place.author.email ) &&  
                <Link className="" to={"/places/edit/" +place.id}><i className="">Editar</i></Link>}

                {(userEmail == place.author.email ) &&
                <button className="" onClick={(e) => {deletePlace(e,place.id);}}><i className="">Eliminar</i></button>}

                <Link className="" to={"/places/" +place.id}><i className="">Ver Place</i></Link>
            </div>
        </div>
    </>
  )
}

