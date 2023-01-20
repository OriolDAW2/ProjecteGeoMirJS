import React from 'react'
import { useState } from 'react';
import './css/login.css'

export default function Login({setLogin}) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const sendLogin = (input) => {
    input.preventDefault();

    console.log("Comprovant credencials....");
    // Enviam dades a l'aPI i recollim resultat
    fetch("https://backend.insjoaquimmir.cat/api/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ email: email, password: password })
    })
      .then((data) => data.json())
      .then((resposta) => {
        console.log(resposta);
        if (resposta.success === true) {
          console.log(resposta.authToken);
        }
      })
      .catch((data) => {
        console.log(data);
        alert("Catch");
      });

    console.log("He enviat les Dades:  " + email + "/" + password);
  };
  return (
    <div>
       <section class="form-login">
        <h5>Formulario Login</h5>
        <input class="controls" type="text" name="email" onChange={(input) => {setEmail(input.target.value);}} placeholder="Correo Electronico"/>
        <input class="controls" type="password" name="password" onChange={(input) => {setPassword(input.target.value);}} placeholder="Contraseña"/>
        <input class="buttons" type="submit" name="" onClick={(input) => {sendLogin(input);}} value="Ingresar"/>
        <button onClick={() => {setLogin(false);}}>¿Ya tienes cuenta?</button>
        <p><a href="#">¿Olvidastes tu Contraseña?</a></p>
      </section>
    </div>
  )
}

