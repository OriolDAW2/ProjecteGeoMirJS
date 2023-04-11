import React from "react";
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useEffect } from "react";
import { PostGrid } from "./PostGrid";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../slices/posts/thunks";
import { Paginate } from "./comments/pages/Paginate";

export const PostsGrid = () => {
  const { usuari, email, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const { posts = [], page, isLoading=true, error="" } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts(page, authToken));
  }, [page]);

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
            {isLoading ? "Espera..." : <>{posts.map((v) => {
              return (
            
                <>
                { v.visibility.id == 1 || v.author.email == usuari ? (<PostGrid key={v.id} v={v}/>) : <></> }
            
                </>
                )   
            }
            
            )}</>}
          </div>
          <Paginate/>
        </div>
      </div>
    </>
  );
};