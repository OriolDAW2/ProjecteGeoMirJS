import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";

import './css/style.css'

export default function Header() {
  let { authToken, setAuthToken } = useContext(UserContext);
  let [ userName, setUserName] = useState('');
  let [ roles, setRoles ] = useState([]);

  const logout = (e) => {
    e.preventDefault();
    fetch('https://backend.insjoaquimmir.cat/api/logout', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken,
      },
      method: 'POST',
    })
    .then((data) => data.json())
      .then((resposta) => {
        console.log(resposta);
        if (resposta.success === true) {
          console.log(resposta.authToken);
          setAuthToken('');
        }
      })
      .catch((data) => {
        console.log(data);
        alert("Catch");
      });
  };

  useEffect(() => {
      
    fetch('https://backend.insjoaquimmir.cat/api/user', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authToken,
    },
    method: 'GET'
  })
  .then((data) => data.json())
    .then((resposta) => {
      console.log(resposta);
      if (resposta.success === true) {
        console.log(resposta.user.name);
        setUserName(resposta.user.name);
        setRoles(resposta.roles);
      }
    })
    .catch((data) => {
      console.log(data);
      alert("Catch");
    });
  }, [])

  return (
    <>
      <div class="header">
        <Link to="/about">About </Link>
        Token: <strong>{authToken}</strong>
        <div class="logout">
          <button class="" onClick = {(e) => {
            logout(e);  
          }}> Log out</button> 
          <p>User: {userName} Role: { roles.map (  (v)=> ( 
          <span key={v}> {v} </span>
          ) ) }</p>
        </div>
      </div>
      <hr />
    </>
  );
}