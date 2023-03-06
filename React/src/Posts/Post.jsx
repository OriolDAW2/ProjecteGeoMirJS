import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../usercontext";
import { postMarkReducer } from "./marks/postMarkReducer";
import { useReducer } from "react";
import { useLocation } from "react-router-dom";
import "leaflet/dist/leaflet.css";

import "../App.css";
import { Icon } from "leaflet";

import { Marker, Popup, MapContainer, TileLayer, useMap } from "react-leaflet";
import { PostsMenu } from "./PostsMenu";
import { CommentAdd } from "./comments/CommentAdd";
import { CommentsList } from "./comments/CommentsList";
// import { MarkerLayer, Marker } from "react-leaflet-marker";

// Estat inicial del reducer. Buit
const initialState = [];
const init = () => {
  // Si localstorage tornes null tornariem un array buit
  return JSON.parse(localStorage.getItem("marks")) || [];
};

export const Post = ({}) => {
  const [marks, dispatchMarks] = useReducer(postMarkReducer, initialState, init);
  const { pathname } = useLocation();

  useEffect(() => {
    localStorage.setItem("marks", JSON.stringify(marks));
  }, [marks]);

  const { id } = useParams();

  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);

  let [post, setPost] = useState({});

  // Emprem isLoading, per rendertizar només quan ja s'ha carregat el place
  let [isLoading, setIsLoading] = useState(true);
  let [liked, setLiked] = useState(false);
  let [likes, setLikes] = useState(0);

  const unlike = async () => {
    setLiked(false);
    console.log("Not Liked");
    const data = await fetch(
      "https://backend.insjoaquimmir.cat/api/posts/" + id + "/likes",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
        method: "DELETE",
      }
    );
    const resposta = await data.json();
    if (resposta.success == true) {
      setLiked(false);
      setLikes(likes - 1);
    }
  };
  const like = async () => {
    try {
      const data = await fetch(
        "https://backend.insjoaquimmir.cat/api/posts/" + id + "/likes",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
          },
          method: "POST",
        }
      );
      const resposta = await data.json();

      if (resposta.success == true) {
        setLiked(true);
        setLikes(likes + 1);
      } else {
        setLiked(false);
        console.log("Epp, algo ha passat ");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const test_like = async () => {
    try {
      const data = await fetch(
        "https://backend.insjoaquimmir.cat/api/posts/" + id + "/likes",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
          },
          method: "POST",
        }
      );
      const resposta = await data.json();

      console.log(resposta);
      if (resposta.success == true) {
        setLiked(false);
        console.log("Not Liked");
        const data = await fetch(
          "https://backend.insjoaquimmir.cat/api/posts/" + id + "/likes",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + authToken,
            },
            method: "DELETE",
          }
        );
        const resposta = await data.json();
      } else {
        setLiked(true);
        console.log("Liked");
      }
    } catch (e) {
      console.log("oeoeoeoe");
      console.log(e);
    }
  };
  const getPost = async () => {
    try {
      const data = await fetch(
        "https://backend.insjoaquimmir.cat/api/posts/" + id,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
          },
          method: "GET",
        }
      );
      const resposta = await data.json();

      // Faria falta control·lar possible error

      console.log(resposta.data);
      // En aquest punt omplim l'array,  resposta. data
      // no és un array, és un objecte retornat per l'api
      // per tant, hem de crear un array, d'un sol element
      // per a que el .map del jsx pugui iterar l'únic
      // element
      setPost(resposta.data);
      setLikes(resposta.data.likes_count);
      console.log(resposta.data.likes_count);
      console.log(post);
      // Ara podem dir que ja s'ha carregat place i es pot renderitzar
      setIsLoading(false);

      // Actualitzem la vble d'estat places
      //setPlaces(resposta.data);
      // Canvia el valor de refresca
      // provocarà que entri a useEffect
      // al fer el rendertizat
      //setRefresca(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleNewMark = (post) => {
    console.log("Afegeixo");
    console.log({ post });

    const mark = {
      id: new Date().getTime(),
      body: post.body,
      link: pathname,
    }

    const action = {
      type: "Add Mark",
      payload: mark,
    };

    console.log(mark)
    dispatchMarks(action);
  };

  // Sempre necessari, o al actualitzar l'state torna a executar-ho i entra
  // en bucle
  useEffect(() => {
    getPost();
    test_like();
  }, []);

  const position = [43.92853, 2.14255];

  const deletePost = (id, e) => {
    e.preventDefault();

    let confirma = confirm("Estas  segur?");

    if (confirma) {
      fetch("https://backend.insjoaquimmir.cat/api/posts/" + id, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
        method: "DELETE",
      })
        .then((data) => data.json())
        .then((resposta) => {
          console.log(resposta);
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
      {/* PlacesShow { id } */}

      {/* Només es renderitza quan isLoading es false */}
      {isLoading ? (
        "Espera...."
      ) : (
        <>
          <div className="md:grid md:grid-col-1 md:grid-flow-row gap-4 md:mx-auto p-6 justify-center dark:bg-gray-900 dark:text-gray-100">
            <div className="relative overflow-hidden bg-no-repeat bg-cover col-span-1 ">
              <img
                src={
                  "https://backend.insjoaquimmir.cat/storage/" +
                  post.file.filepath
                }
                alt=""
                className=" col-span-1 w-200 h-96 items-center"
              />

              <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-40 transition duration-300 ease-in-out bg-white"></div>
            </div>

            <div className="max-w-xl">
              {/* <h2 className="bg-blue-300 col-span-1 text-xl font-semibold">
                {post.name}
              </h2> */}
              <span className="bg-blue-200 col-span-1 block pb-2 text-sm dark:text-gray-400">
                Enviada per: {post.author.name}
              </span>
              <span className="self-center   px-9 bg-gray-200 col-span-2 text-x2 font-semibold">
                Latitud: {post.latitude}{" "}
              </span>
              <span className="self-center px-7 bg-gray-200 text-x2 font-semibold">
                Longitud: {post.longitude}
              </span>

              <div className="bg-orange-100 py-3 text-x2 font-semibold">
                Cos
              </div>
              <p className=" bg-yellow-100">{post.body}</p>
              <div className="mt-10 h-12 max-h-full md:max-h-screen">
                {/* <MapContainer  style={{ height: 280 }} center={[43.92853, 2.14255]} zoom={12} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[43.92853, 2.14255]}>
    <Popup>
       { position }. 
    </Popup>
  </Marker>
</MapContainer> */}

                {post.author.email === usuari ? (
                  <>
                    <Link
                      to={"/posts/edit/" + id}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-10 px-4 h-10 md:h-10 uppercase"
                    >
                      {" "}
                      Editar{" "}
                    </Link>
                    <a
                      href="#"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                      onClick={(e) => deletePost(id, e)}
                    >
                      {" "}
                      Esborrar
                    </a>
                  </>
                ) : (
                  <></>
                )}
                <a href="#"
                  onClick={() => handleNewMark(post)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase">
                  Desa
                </a>
                {liked ? (
                  <a
                    href="#"
                    onClick={(e) => unlike(id, e)}
                    className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                  >
                    - 👍 {likes}
                  </a>
                ) : (
                  <a
                    href="#"
                    onClick={(e) => like(id, e)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                  >
                    + 👍 {likes}
                  </a>
                )}
                {/* <ReviewAdd id={place.id}/> */}
                <CommentsList
                  id={post.id}
                  comments_count={post.comments_count}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
