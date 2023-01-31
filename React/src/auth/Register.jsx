import React from 'react'
import { useState } from 'react';
import { useContext } from "react";
import { UserContext } from '../userContext';
import './css/register.css'

export default function Register({setLogin}) {
  let [formulari, setFormulari] = useState({});
  let {authToken, setAuthToken} = useContext(UserContext);

  const handleChange = (e) => {
    e.preventDefault();

    setFormulari({
      ...formulari,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    document.getElementById('password').hidden = true;

    let { name, password, password2, email } = formulari;
    console.log(
      "He enviat les Dades:  " + name + "/" + email + "/" + password + "/" + password2
    );

    if(password !== password2){
      document.getElementById('password').hidden = false;
      document.getElementById('password').innerHTML = 'Els passwords han de coincidir';
      return false;
    }
  
    // Enviam dades a l'API i recollim resultat
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/register", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ name, email, password })
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
       <section class="form-login-r">
        <h5>Formulario Registro</h5>
        <input class="controls" type="text" name="name" onChange={handleChange} placeholder="Usuario"/>
        <input class="controls" type="text" name="email" onChange={handleChange} placeholder="Correo Electronico"/>
        <input class="controls" type="password" name="password" onChange={handleChange} placeholder="Contraseña"/>
        <input class="controls" type="password" name="password2" onChange={handleChange} placeholder="Confirmar Contraseña"/>
        <div hidden class="errors" id="password"></div>
        <div hidden class="errors" id="errors"></div>
        <input class="buttons" type="submit" name=""  onClick={(e) => {handleRegister(e);}} value="Registrar"/>
        <button onClick={() => {setLogin(true);}}>¿Ya tienes cuenta?</button>
      </section>
    </div>
  )
}

