import { setAdd, setError, setComments, setCommentsCount, startLoadingComments } from "./commentSlice";

/**
 * Fetches comments for a post.
 * @param {number} [page=0] - The page number to fetch comments for.
 * @param {string} id - The ID of the post to fetch comments for.
 * @param {string} authToken - The authorization token for the user making the request.
 * @param {string} [usuari=""] - The email of the user making the request.
 * @returns {Promise<void>} - A Promise that resolves when the comments have been fetched and dispatched.
 */
export const getComments = (page = 0, id, authToken, usuari="") => {
  return async (dispatch, getState) => {

      dispatch(startLoadingComments());

      const headers = {
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + authToken,
          },
          method: "GET",
      };
      const url = "https://backend.insjoaquimmir.cat/api/posts/" + id + "/comments"

      const data = await fetch(url,  headers  );
      const resposta = await data.json();

      if (resposta.success == true) 
      {
          dispatch(setComments(resposta.data));
          dispatch(setCommentsCount(resposta.data.length))
      }
      else {
          dispatch (setError(resposta.message));
      }

      resposta.data.map((v) => {
          if (v.user.email === usuari) {
              dispatch (setAdd(false));
              console.log("Te comment");
          }
      });
     
  };
}

/**
* Deletes a comment from a post.
* @param {Object} comment - The comment object to delete.
* @param {string} authToken - The authorization token for the user making the request.
* @returns {Promise<void>} - A Promise that resolves when the comment has been deleted and dispatched.
*/
export const delComment = (comment, authToken) => {
  return async (dispatch, getState) => {
      const data = await fetch(
          "https://backend.insjoaquimmir.cat/api/posts/" +
            comment.post.id +
            "/comments/" +
            comment.id,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
              },
              method: "DELETE",
            }
        );
        const resposta = await data.json();
  
        console.log(resposta);
        if (resposta.success == true) {
          dispatch (setAdd(true));
          // usuari no l'indiquem i per defecta estarà a ""
          dispatch (getComments(0,comment.post.id,authToken))
          const state = getState()
          dispatch (setCommentsCount(state.comments_count - 1));
        }
  };
};

/**
 * Add a comment to a post.
 * @param {number} post_id - The ID of the post to add the comment to.
 * @param {string} comment - The comment to add.
 * @param {string} authToken - The authentication token to use for the API request.
 * @returns {Promise<void>}
 */
export const addComment =  (post_id, comment, authToken) => {
  console.log(comment)
  return async (dispatch, getState) => {
      const data = await fetch(
          "https://backend.insjoaquimmir.cat/api/posts/" + post_id + "/comments",
          {
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  //'Content-type': 'multipart/form-data',
                  Authorization: "Bearer " + authToken,
              },
              method: "POST",
              body: JSON.stringify({ comment }),
          }
      );
      const resposta = await data.json();
      console.log(resposta);

      if (resposta.success == true) {
          dispatch (setAdd(false));
          console.log("Todo bien"); 
          dispatch(setComments(comment));
          dispatch (getComments(0, post_id, authToken));
          const state = getState();
          dispatch (setCommentsCount(state.commentsCount + 1));
      } else {
          setError(resposta.message);
      }
  };
};
