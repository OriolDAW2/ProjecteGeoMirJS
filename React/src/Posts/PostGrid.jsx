import React, { useCallback, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext';

export const PostGrid = ({post, deletePost}) => {
  let { userEmail, setUserEmail, authToken, setAuthToken } = useContext(UserContext);

    return (
    <>
        <div className=''>
        <p>@{post.author.name}</p>
        <h2>{post.name}</h2>
            <img src={"https://backend.insjoaquimmir.cat/storage/" + post.file.filepath} alt={post.name} height="400"width="300"/>
            <div className=''>
                {post.body}     
            </div>
            <div id=''>
                {(userEmail == post.author.email ) &&  
                <Link className="" to={"/posts/edit/" +post.id}><i className="">Editar</i></Link>}

                {(userEmail == post.author.email ) &&
                <button className="" onClick={(e) => {deletePost(e,post.id);}}><i className="">Eliminar</i></button>}

                <Link className="" to={"/posts/" +post.id}><i className="">Ver Post</i></Link>
            </div>
        </div>
    </>
  )
}

