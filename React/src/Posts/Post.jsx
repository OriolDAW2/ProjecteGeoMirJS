import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../userContext';
import { CommentsList } from './comments/CommentsList';

export default function Post () {
  const { id } = useParams();
  let {userEmail,setUserEmail,authToken,setAuthToken } = useContext(UserContext)
  let [refresh,setRefresh] = useState(false)
  let [post, setPosts] = useState({
    author:{name:""},
    body:"",
    latitude:"",
    longitude:"",
    file:{filepath:""}
  });
  
  const getPost = async () => {
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id, {
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
              Alert(resposta.message);
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
  useEffect(() => { getPost();}, [refresh]);
  return (
    <div>
      <div>
        <img src={"https://backend.insjoaquimmir.cat/storage/" + post.file.filepath} alt={post.name} height="500"width="700"/>
        <h2>{post.name}</h2>
        <p>Autor: @{post.author.name}</p>
        <p>Latitud: {post.latitude}</p>
        <p>Longitud: {post.longitude}</p>
        <div className=''>
            <p>Missatge: </p>
            {post.body}     
        </div>
            <div id=''>
                {(userEmail == post.author.email ) &&  
                <Link className="" to={"/posts/edit/" +post.id}><i className="">Editar</i></Link>}

                {(userEmail == post.author.email ) &&
                <button className='' onClick={(e) => {deletePost(e,post.id);}}><i className="">Eliminar Post</i>
                </button>}
            </div>
      </div>
      <div className=''><CommentsList id={post.id}/></div>
    </div>
  )
}
