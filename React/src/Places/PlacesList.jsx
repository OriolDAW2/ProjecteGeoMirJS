import { useState, useContext, useEffect } from 'react';
import { UserContext } from "../userContext";
import PlaceList from './PlaceList';

import '../App.css'

export default function PlacesList () {
  let { userEmail, setUserEmail, authToken, setAuthToken } = useContext(UserContext);
  let [ places, setPlaces] = useState([]);

  const getPlaces = async () => {
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places", {
          headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + authToken
          },
          method: "GET",
      })
      const resposta = await data.json();
      console.log(resposta);
      if (resposta.success === true) {
        setAuthToken(authToken);
        setPlaces(resposta.data)
        console.log(resposta.data);
      }else{
          alert(resposta.message);
      }

    }catch {
      console.log(data);
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

  useEffect(() => { 
    getPlaces(); 
  }, []);

  return (
    <>
      
      <table id=''>
        <tbody>
          <tr id=''>
            <th>Id</th>
            <th>description</th>
            <th>Author</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Visibility</th>
            <th></th>
          </tr>       
          {places.map((place) => (
              (place.visibility.name == 'public' || userEmail == place.author.email) &&  
              (<tr  key={places.id}><PlaceList place={place} deletePlace={deletePlace}/></tr>)
          ))}
        </tbody>
      </table>

    </>
  )
}