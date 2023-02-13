import React, { useState, useContext, useEffect, useCallback } from 'react';
import { UserContext } from '../../userContext';
import TimeAgo from 'react-timeago';


export const Comment = ({comment,deleteComment}) => {
    let { userEmail, setUserEmail, authToken, setAuthToken } = useContext(UserContext)

  return (
      <>
            <div className=''>
                <h3>Comentari de {comment.user.name}</h3>
                <p>{comment.comment}</p>
                <div className=''>
                    <TimeAgo date={comment.created_at} />
                </div>
                {(userEmail == comment.user.email)&& 
                    <button className='' onClick={(e) => {deleteComment(e,comment.id); }}>Eliminar Comment<i className=""></i></button>
                }
            </div>
      </>
  )
}