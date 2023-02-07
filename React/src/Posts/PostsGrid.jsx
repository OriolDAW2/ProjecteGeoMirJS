import React, { useContext, useState, useEffect, useCallback } from 'react'
import { UserContext } from "../userContext";
import { PostGrid } from "./PostGrid";

export default function PostsGrid () {
  let { userEmail, setUserEmail, authToken, setAuthToken } = useContext(UserContext);
  let [posts, setPosts] = useState([]);
  let [refresh, setRefresh] = useState(false);
  
  const sendPostGrid = async () => {
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts", {
          headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken
          },
          method: "GET",
      })
      const resposta = await data.json();
          console.log(resposta);
          if (resposta.success === true) {
              setPosts(resposta.data)
              console.log(resposta);
          }else{
              alert(resposta.message);
          }

    }catch {
      console.log(data);
      alert("Catch");
    }
  }

  const deletePost = async (e,id) =>{
    e.preventDefault();
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id, {
          headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken
          },
          method: "DELETE",
      })

      const resposta = await data.json();
          console.log(resposta);
          if (resposta.success === true) {
              setRefresh(!refresh);
              console.log("Post Eliminat");
          }else{
              alert(resposta.message);
          }

    }catch {
      console.log(data);
      alert("Catch");
    }
  }
  useEffect(() => {sendPostGrid();}, [refresh]);

  return (
    <>
        <div className=''>
          { posts.map ( (post)=> ( 
              (post.visibility.name == 'public' || userEmail == post.author.email) &&  
              (<PostGrid post={post} deletePost={deletePost} />)
          ) ) }
          
        </div>  
    </>
  )
}