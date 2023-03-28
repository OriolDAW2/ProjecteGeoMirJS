import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from '../userContext';
import { useFetch } from "../hooks/useFetch";
import editar from "../assets/editar.png";
import esborrar from "../assets/esborrar.png";

// Temporal
//import places from '../../json/places.json'
//import users from '../../json/users.json'
import { PlacesAdd } from "./PlacesAdd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PlaceGrid } from "./PlaceGrid";

export const PlacesGrid = () => {
  // Ho utilitzem per provar un refresc quan esborrem un element
  let [refresca, setRefresca] = useState(false);
  // Dades del context. Ens cal el token per poder fer les crides a l'api
  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);

  // només quan la vble d'estat refresca canvia el seu valor
  // refresca canviarà el valor quan fem alguna operació com delete
  // Crida a l'api. mètode GET
  const { data, error, loading} = useFetch("https://backend.insjoaquimmir.cat/api/places", {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + authToken,
    },
    method: "GET",
  })

  // Esborrar un element
  const deletePlace = (id, e) => {
    e.preventDefault();

    let confirma = confirm("Estas  segur?");

    if (confirma) {
      fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
        method: "DELETE",
      })
        .then((data) => data.json())
        .then((resposta) => {
          console.log("Posts:" + resposta);
          if (resposta.success == true) {
            console.log("OK");
            // provoca el refrescat del component i la reexecució de useEffect
            setRefresca(true);
          }
        });
    }
  };

  return (
    <>
      <div className="py-16 bg-gradient-to-br from-green-50 to-cyan-100">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="mb-12 space-y-2 text-center">
            <span className="block w-max mx-auto px-3 py-1.5 border border-green-200 rounded-full bg-green-100 text-green-600 text-4x1">
              Llistat de Llocs
            </span>
           </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {loading ? "Espera..." : <>{data.map((v) => {
              return (
            
                <>
                { v.visibility.id == 1 || v.author.email == usuari ? (<PlaceGrid  deletePlace={ deletePlace } key={v.id} v={v}/>) : <></> }
            
                </>
                )   
            })}</>}

           
          </div>
        </div>
      </div>
    </>
  );
};