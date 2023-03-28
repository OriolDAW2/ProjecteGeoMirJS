import React from "react";
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { UserContext } from "../userContext";
import { addpostmark, ismarked } from "../slices/postMarkSlice";
import { CommentsList } from "./comments/CommentsList";
import { getPost, like, unlike, delPost, editPost } from "../slices/posts/thunks";

import "../App.css";
import "leaflet/dist/leaflet.css";

export const Post = () => {

  const { usuari, email, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const { post, page=0, error="", isLoading=true, likes, liked } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const { id } = useParams();
  const { pathname } = useLocation();
  const { postMarks, isMarked } = useSelector((state) => state.postMarks);

  const markPost = (event) => {
    event.preventDefault();
    if(post.body.lenght <= 1) return;

    const postMark = {
        id: post.id,
        body: post.body,
        ruta: pathname
    };

    console.log(postMark)
    dispatch(addpostmark(postMark))  
  };

  useEffect(() => {
    dispatch(getPost(id, authToken));
    dispatch(ismarked(id));
  }, []);

  return (
    <>
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
              <span className="bg-black-500 col-span-1 block pb-2 text-sm dark:text-gray-400">
                Enviada per: {post.author.name}
              </span>
              <span className="self-center px-9 bg-blue-400 col-span-2 text-x2 font-semibold">
                Latitud: {post.latitude}{" "}
              </span>
              <span className="self-center px-7 bg-blue-700 text-x2 font-semibold">
                Longitud: {post.longitude}
              </span>

              <div className="bg-black-100 py-3 text-x2 font-semibold">
                <h3>Cos</h3>
              </div>
              <p className=" bg-black-100">{post.body}</p>
              <div className="mt-10 h-12 max-h-full md:max-h-screen">
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
                      onClick={(e) => dispatch( delPost(post, authToken)) }
                    >
                      {" "}
                      Esborrar
                    </a>
                  </>
                ) : (
                  <></>
                )}
                {isMarked ? (
                  <a
                    href="#"
                    className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                  >
                    Desat
                  </a>
                ) : (
                  <a
                    href="#"
                    onClick={(e) => markPost(e)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                  >
                    Desar
                  </a>
                )}

                {liked ? (
                  <a
                    href="#"
                    onClick={(e) => dispatch(unlike(id, authToken, likes))}
                    className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                  >
                    - 👍 {likes}
                  </a>
                ) : (
                  <a
                    href="#"
                    onClick={(e) => dispatch(like(id, authToken, likes))}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                  >
                    + 👍 {likes}
                  </a>
                )}
                
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