import { useState, useContext, useEffect } from 'react';
import { UserContext } from "../userContext";
import PostList from './PostList';

import '../App.css'

export default function PostsList () {
  let { userEmail, setUserEmail, authToken, setAuthToken } = useContext(UserContext);
  let [ posts, setPosts] = useState([]);

  const getPosts = async () => {
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts", {
          headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + authToken
          },
          method: "GET",
      })
      const resposta = await data.json();
      console.log(resposta);
      if (resposta.success === true) {
        setAuthToken(authToken);
        setPosts(resposta.data)
        console.log(resposta.data);
      }else{
          alert(resposta.message);
      }

    }catch {
      console.log(data);
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

  useEffect(() => { 
    getPosts(); 
  }, []);

  return (
    <>
      
      <table id=''>
        <tbody>
          <tr id=''>
            <th>Id</th>
            <th>Body</th>
            <th>Author</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Visibility</th>
          </tr>       
          {posts.map((post) => (
              (post.visibility.name == 'public' || userEmail == post.author.email) &&  
              (<tr  key={posts.id}><PostList post={post} deletePost={deletePost}/></tr>)
          ))}
        </tbody>
      </table>

    </>
  )
}