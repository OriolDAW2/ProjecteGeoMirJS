import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import './css/places.css';

export default function Place() {
    const { id } = useParams();
    let { authToken, setAuthToken } = useContext(UserContext);
    let [ places, setPlaces] = useState([]);

    const getPlaces = async () => {
    
      // Enviam dades a l'API i recollim resultat
      try {
        const data = await fetch("https://backend.insjoaquimmir.cat/api/places", {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authToken,
  
          },
          method: "GET",
        });
  
        const resposta = await data.json();
        if (resposta.success === true) {
          setAuthToken(authToken);
          setPlaces(resposta.data);
          console.log(resposta.data);
        }else 
          console.log("La resposta no ha triomfat");
      } catch {
        console.log("Error");
        alert("catch");
      }
    };

    useEffect(() => {
      getPlaces();
    }, [])

    return (
      places.map ( (p) => {
        <div>{p.id}</div>
      })

    );
  }