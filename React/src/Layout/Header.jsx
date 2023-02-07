import { useState, useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";

import './css/style.css'

export default function Header() {
  let { authToken, setAuthToken } = useContext(UserContext);
  let [ userName, setUserName] = useState('');
  let [ roles, setRoles ] = useState([]);

  const logout = async (e) => {
    e.preventDefault();
  
    // Enviam dades a l'API i recollim resultat
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/logout", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + authToken,

        },
        method: "POST",
      });

      const resposta = await data.json();
      if (resposta.success === true) 
        setAuthToken('');
      else 
        console.log("La resposta no ha triomfat");
    } catch {
      console.log("Error");
      alert("catch");
    }
  };

  const getUser = async () => {
  
    // Enviam dades a l'API i recollim resultat
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/user", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + authToken,

        },
        method: "GET",
      });

      const resposta = await data.json();
      if (resposta.success === true) {
        setUserName(resposta.user.name);
        setRoles(resposta.roles);
      } else {
        console.log("La resposta no ha triomfat");
      }
    } catch {
      console.log("Error");
      alert("catch");
    }
  };

  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
      <div className="header">
        <Link to="/">Inici </Link>
        <Link to="/posts">Posts </Link>
        <Link to="/places">Places </Link>
        <Link to="/about">About </Link>
        <div class="logout">
          <p>User: {userName} Role: { roles.map (  (v)=> ( 
          <span key={v}> {v} </span>
          ) ) }</p>
          <button class="button-logout" onClick = {(e) => {logout(e); }}> Log out</button> 
        </div>
      </div>
      <hr />
    </>
  );
}