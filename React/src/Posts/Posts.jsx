import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import './css/posts.css';

export default function Post() {
    const { id } = useParams();
    let { authToken, setAuthToken } = useContext(UserContext);
    let [ posts, setPosts] = useState([]);

    const getPosts = async () => {
    
      // Enviam dades a l'API i recollim resultat
      try {
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts", {
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
          setPosts(resposta.data);
          console.log(resposta.data);
        }else 
          console.log("La resposta no ha triomfat");
      } catch {
        console.log("Error");
        alert("catch");
      }
    };

    useEffect(() => {
      getPosts();
    }, [])

    return (
      posts.map ( (p) => {
        <div>{p.id}</div>
      })

    );
  }