import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from "../../userContext";


export const CommentAdd = ({ Refresh }) => {
  let { authToken, setAuthToken } = useContext(UserContext);
  let [addComment, setAddComment] = useState(true);
  const { id } = useParams();
  let [formulari, setFormulari] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    setFormulari({
      ...formulari,
      [e.target.name]: e.target.value
    });

  };

  const addComent = async (e) => {
    e.preventDefault();
    let { comment } = formulari;
    var formData = new FormData();
    console.log(comment);
    formData.append("comment", comment);

    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id + "/comments", {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
        },
        method: "POST",
        body: formData
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        console.log(resposta);
        Refresh();
        alert("Comentario Añadido");
      } else {
        console.log(resposta.message);
      }

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    addComent();

  }, []);
  return (
    <>
      <div className=''>
        <form id="formAddComment" className=''>
          <div className=''>
            <label htmlFor="comment">Afeigeix un nou comentari</label>
          </div>
          <div className='containerTextarea'>
            <textarea id="comment" name="comment" placeholder="Escribe tu commentario" value={formulari.comment} onChange={handleChange} />
          </div>
          <button className="" onClick={(e) => { addComent(e); setAddComment(false); } }> Crear Comentario</button>
        </form>
      </div>
    </>
  );
}