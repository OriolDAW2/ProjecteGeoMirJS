import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../userContext';


export default function Place () {
  const { id } = useParams();
  let {userEmail,setUserEmail,authToken,setAuthToken } = useContext(UserContext)
  let [refresh,setRefresh] = useState(false)
  let [place, setPlaces] = useState({
    author:{name:""},
    body:"",
    latitude:"",
    longitude:"",
    file:{filepath:""}
  });
  
  const getPlace = async () => {
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
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
              Alert(resposta.message);
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
  useEffect(() => { getPlace();}, [refresh]);
  return (
    <div>
      <div>
        <img src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} alt={place.name} height="500"width="700"/>
        <h2>{place.name}</h2>
        <p>Autor: @{place.author.name}</p>
        <p>Latitud: {place.latitude}</p>
        <p>Longitud: {place.longitude}</p>
        <div className=''>
            <p>Missatge: </p>
            {place.body}     
        </div>
            <div id=''>
                {(userEmail == place.author.email ) &&  
                <Link className="" to={"/places/edit/" +place.id}><i className="">Editar</i></Link>}

                {(userEmail == place.author.email ) &&
                <button className='' onClick={(e) => {deletePlace(e,place.id);}}><i className="">Eliminar Place</i>
                </button>}
            </div>
      </div>
    </div>
  )
}
