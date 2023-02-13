import React, { useCallback, useContext, useState } from 'react';
import { UserContext } from '../userContext';
import { Link } from 'react-router-dom';
import './css/postlist.css';

export default function PostList ({post, deletePost}) {
  let { userEmail, setUserEmail, authToken, setAuthToken } = useContext(UserContext);

  return (
    <>
        <td>{post.id}</td>
        <td>{post.body}</td>
        <td>{post.author.name}</td>
        <td>{post.latitude}</td>
        <td>{post.longitude}</td>
        <td>{post.visibility.name}</td>
        <td>{post.comments_count}</td>
        <td><i className=""></i></td> : <td/>
        <Link className="verpost" to={"/posts/" +post.id}><i className="">Ver Post</i></Link>

        {(userEmail == post.author.email ) &&  
          <td><Link className="button" to={"/posts/edit/" +post.id}><i className="">Editar</i></Link></td>
        }

        {(userEmail == post.author.email ) && 
          <td>
            <button className="button" onClick={(e) => {deletePost(e,post.id);}}><i className="">Eliminar</i></button>
          </td>
        }
    </>
  )
}
