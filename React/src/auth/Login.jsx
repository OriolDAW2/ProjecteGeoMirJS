import React from 'react'
import { useState } from 'react';
import { useContext } from "react";
import { UserContext } from '../userContext';
import './css/login.css'

export default function Login({setLogin}) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let {authToken, setAuthToken} = useContext(UserContext);
  
  const sendLogin = async (e) => {
    e.preventDefault();
  
    // Enviam dades a l'API i recollim resultat
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      const resposta = await data.json();
      document.getElementById('errors').hidden = false;
      document.getElementById('errors').innerHTML = resposta['message'];
      if (resposta.success === true) 
        setAuthToken(resposta.authToken);
      else 
        console.log("La resposta no ha triomfat");

      console.log("He enviat les Dades:  " + email + "/" + password);
    } catch {
      console.log("Error");
      alert("catch");
    }
  };
  return (
    <div>
       <section class="form-login">
        <h5>Formulario Login</h5>
        <input class="controls" type="text" name="email" onChange={(input) => {setEmail(input.target.value);}} placeholder="Correo Electronico"/>
        <input class="controls" type="password" name="password" onChange={(input) => {setPassword(input.target.value);}} placeholder="Contraseña"/>
        <div hidden class="errors" id="errors"></div>
        <input class="buttons" type="submit" name="" onClick={(input) => {sendLogin(input);}} value="Ingresar"/>
        <button onClick={() => {setLogin(false);}}>¿Ya tienes cuenta?</button>
        <p><a href="#">¿Olvidastes tu Contraseña?</a></p>
      </section>
    </div>
  )
}

