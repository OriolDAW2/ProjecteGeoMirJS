import React from 'react'
import { useState } from 'react';
import './css/register.css'

export default function Register({setLogin}) {
  let [formulari, setFormulari] = useState({});

  const handleChange = (input) => {
    input.preventDefault();

    setFormulari({
      ...formulari,
      [input.target.name]: input.target.value
    });
  };
  const handleRegister = (input) => {
    input.preventDefault();
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

    fetch("https://backend.insjoaquimmir.cat/api/register", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      // Si els noms i les variables coincideix, podem simplificar
      body: JSON.stringify({ name, email, password })
    })
      .then((data) => data.json())
      .then((resposta) => {
        document.getElementById('errors').hidden = false;
        document.getElementById('errors').innerHTML = resposta['message'];
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
       <section class="form-login-r">
        <h5>Formulario Registro</h5>
        <input class="controls" type="text" name="name" onChange={handleChange} placeholder="Usuario"/>
        <input class="controls" type="text" name="email" onChange={handleChange} placeholder="Correo Electronico"/>
        <input class="controls" type="password" name="password" onChange={handleChange} placeholder="Contraseña"/>
        <input class="controls" type="password" name="password2" onChange={handleChange} placeholder="Confirmar Contraseña"/>
        <div hidden class="errors" id="password"></div>
        <div hidden class="errors" id="errors"></div>
        <input class="buttons" type="submit" name=""  onClick={(input) => {handleRegister(input);}} value="Registrar"/>
        <button onClick={() => {setLogin(true);}}>¿Ya tienes cuenta?</button>
      </section>
    </div>
  )
}

