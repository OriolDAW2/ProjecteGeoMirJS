import React, { useContext, useState, useEffect, useCallback } from 'react'
import { UserContext } from "../userContext";
import { PlaceGrid } from "./PlaceGrid";

export default function PlacesGrid () {
  let { userEmail, setUserEmail, authToken, setAuthToken } = useContext(UserContext);
  let [places, setPlaces] = useState([]);
  let [refresh, setRefresh] = useState(false);
  
  const sendPlaceGrid = async () => {
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places", {
          headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken
          },
          method: "GET",
      })
      const resposta = await data.json();
          console.log(resposta);
          if (resposta.success === true) {
              setPlaces(resposta.data)
              console.log(resposta);
          }else{
              alert(resposta.message);
          }

    }catch {
      console.log(data);
      alert("Catch");
    }
  }

  const deletePlace = async (e,id) =>{
    e.preventDefault();
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
          headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken
          },
          method: "DELETE",
      })

      const resposta = await data.json();
          console.log(resposta);
          if (resposta.success === true) {
              setRefresh(!refresh);
              console.log("Place Eliminat");
          }else{
              alert(resposta.message);
          }

    }catch {
      console.log(data);
      alert("Catch");
    }
  }
  useEffect(() => {sendPlaceGrid();}, [refresh]);

  return (
    <>
        <div className=''>
          { places.map ( (place)=> ( 
              (place.visibility.name == 'public' || userEmail == place.author.email) &&  
              (<PlaceGrid place={place} deletePlace={deletePlace} />)
          ) ) }
          
        </div>  
    </>
  )
}