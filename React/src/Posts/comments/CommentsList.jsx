import React, { useState, useContext, useEffect, useCallback } from 'react';
import { UserContext } from "../../userContext";
import { useParams } from 'react-router-dom';
import { CommentAdd } from './CommentAdd';
import { Comment } from './Comment';


export const CommentsList = () => {
  const { id } = useParams();
  let { userEmail, setUserEmail, authToken, setAuthToken } = useContext(UserContext);
  let [addcomment, setAddComment] = useState(true);
  let [comments, setComments] = useState([]);
  let [refresh, setRefresh] = useState(false);

  const Refresh = () =>{
    setRefresh(!refresh);
  }

  const sendCommentsList = async (e) => {
    try{
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/"+id+"/comments", {
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
                setComments(resposta.data)
                console.log(resposta.data);
                resposta.data.map((v)=>{
                    if (v.user.email==userEmail){
                        setAddComment(false);
                    }
                })
          }else{
              alert(resposta.message);
          }

    }catch {
      alert("Catch");
    }
  }
  const deleteComment = async (e, commentid) =>{
    e.preventDefault();
    try{
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id +"/comments/"+commentid, {
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
                Refresh();
                setAddComment(true);
                console.log("Post Eliminado");
            }else{
                alert(resposta.message);
            }
  
      }catch {
        console.log(data);
        alert("Catch");
      }
  }
  
  useEffect(() => { 

    sendCommentsList();
    
  }, [refresh]);

  return (
    <>
        {comments.map((comment) => (
            <div  key={comments.id} > 
              {(userEmail == comment.user.email && addcomment==true)  }
              <Comment comment={comment} deleteComment={deleteComment}/>
            </div>
        ))}
        { addcomment == true && <CommentAdd Refresh={Refresh}/>}
    </>
  )
}