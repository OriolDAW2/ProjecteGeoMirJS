import { startLoadingPosts, setError, setPosts, setPost, setLikes, setLiked, setPages, setFilter } from "./postSlice";
import { useNavigate } from "react-router-dom";

/**
 * Fetches a page of posts filtered by a given search criteria.
 * @param {string} authToken - The authentication token for the current user.
 * @param {number} [page=0] - The page number to fetch (defaults to 0).
 * @returns {Promise} - A promise that resolves when the API response is received.
 */
export const getPosts = (authToken, page = 0) => {
    return async (dispatch, getState) => {
        let filter = getState().posts.filter;
        dispatch(startLoadingPosts());

        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        let url =  page > 0 ? 
        "https://backend.insjoaquimmir.cat/api/posts?paginate=1&page=" + page 
        : 
        "https://backend.insjoaquimmir.cat/api/posts" ;

        let primsimbolo = page > 0 ? "&" : "?";

        let body = filter.body != "" ? "body="+filter.body : "";
        
        let author = filter.author != "" ? "author="+filter.author : "";
        
        if (body != "" && author != ""){
            url = url+primsimbolo+body+"&"+author;
        }

        else if (author != ""){
            url = url+primsimbolo+author;
        }

        else if (body != "" ){
            url = url+primsimbolo+body;
        }

        const data = await fetch(url, headers);
        const resposta = await data.json();

        if(resposta.success == true) {
            if (page > 0) {
                dispatch(setPosts(resposta.data.collection));
                dispatch(setPages(resposta.data.links));
                console.log(resposta.data.links);
            } else {
                dispatch(setPosts(resposta.data));
            }
        }else {
            setError(resposta.message);
        }
    }
}

/**
 * Creates a new post.
 * @param {Object} formulari - The form data for the new post.
 * @param {string} authToken - The authentication token for the current user.
 * @returns {Promise} - A promise that resolves when the API response is received.
 */
export const addPost = (formulari, authToken) => {
    return async (dispatch, getState) => {

    let { body, upload, latitude, longitude, visibility } = formulari;
    const formData = new FormData();
        
    formData.append("body", body);
    formData.append("upload", upload);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("visibility", visibility);

    const data = await fetch(
      "https://backend.insjoaquimmir.cat/api/posts/",
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + authToken,
        },
        method: "POST",
        body: formData,
      }
    );
    const resposta = await data.json();

    if (resposta.success == true) {
        console.log("Post Creat");
    } else {
        setError(resposta.message);
    }
  };
}

/**
 * Fetches a post from the API based on its ID and sets the corresponding data in the state.
 *
 * @param {string} id - The ID of the post to fetch.
 * @param {string} authToken - The authorization token required to access the API.
 * @returns {Promise<void>} A Promise that resolves when the post has been fetched and the state has been updated.
 */
export const getPost = (id, authToken) => {
    return async (dispatch, getState) => {

        dispatch(startLoadingPosts());

        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        const url = "https://backend.insjoaquimmir.cat/api/posts/" + id

        const data = await fetch(url, headers);
        const resposta = await data.json();

        if (resposta.success == true) {
            dispatch(setPost(resposta.data));
            dispatch(setLikes(resposta.data.likes_count));
            dispatch(testLikes(id, authToken));

        } else {
            dispatch(setError(resposta.message));
        }
    };
}

/**
 * Edits a post on the API based on the provided form data and post ID.
 *
 * @param {Object} formulari - The form data to be submitted for the post edit.
 * @param {string} authToken - The authorization token required to access the API.
 * @param {Object} post - The post object to be edited.
 * @returns {Promise<void>} A Promise that resolves when the post has been edited.
 */
export const editPost = (formulari, authToken, post) => {
    return async (dispatch, getState) => {

        let { body, upload, latitude, longitude, visibility } = formulari;
        const formData = new FormData();

        formData.append("body", body);
        formData.append("upload", upload);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("visibility", visibility);

        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/posts/" + post.id,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + authToken,
                },
                method: "POST",
                body: formData,
            }
        );
        const resposta = await data.json();

        if (resposta.success == true) {
            console.log("Post Editat");
        } else {
            setError(resposta.message);
        }
    };
}

/**
 * Deletes a post on the API based on the provided post object.
 *
 * @param {Object} post - The post object to be deleted.
 * @param {string} authToken - The authorization token required to access the API.
 * @returns {Promise<void>} A Promise that resolves when the post has been deleted and the state has been updated.
 */
export const delPost = (post, authToken) => {
    return async (dispatch, getState) => {

        dispatch(startLoadingPosts());

        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/posts/" + post.id,
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
            dispatch(getPosts(0, authToken))
        }
    };
};


/**
 * Tests if a post is liked by the current user and toggles the like accordingly.
 *
 * @param {string} id - The ID of the post to test.
 * @param {string} authToken - The authentication token for the current user.
 * @returns {Promise<void>} - A Promise that resolves when the like state has been updated.
 */
export const testLikes = (id, authToken) => {
    return async (dispatch, getState) => {
        
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "POST",
        };
        const url = "https://backend.insjoaquimmir.cat/api/posts/" + id + "/likes"

        const data = await fetch(url,  headers  );
        const resposta = await data.json();

        if (resposta.success == true) {
            dispatch(setLiked(false));
            console.log('liked False')
            const headers = {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authToken,
                },
                method: "DELETE",
            };
            const url = "https://backend.insjoaquimmir.cat/api/posts/" + id + "/likes"
    
            const data = await fetch(url,  headers  );
            const resposta = await data.json();

        } else {
            dispatch(setLiked(true));
            console.log("Liked");
        }
    };
}

/**
 * Likes a post by sending a POST request to the API.
 *
 * @param {string} id - The ID of the post to like.
 * @param {string} authToken - The authentication token for the current user.
 * @param {number} likes - The number of likes the post currently has.
 * @returns {Promise<void>} - A Promise that resolves when the like state has been updated.
 */
export const like = (id, authToken, likes) => {
    return async (dispatch, getState) => {

        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "POST",
        };
        const url = "https://backend.insjoaquimmir.cat/api/posts/" + id + "/likes"

        const data = await fetch(url,  headers  );
        const resposta = await data.json();

        if (resposta.success == true) {
            dispatch(setLiked(true));
            dispatch(setLikes(likes + 1));
        } else {
            dispatch(setLiked(false));
        }
    };
}

/**
 * Unlikes a post by sending a DELETE request to the API.
 *
 * @param {string} id - The ID of the post to unlike.
 * @param {string} authToken - The authentication token for the current user.
 * @param {number} likes - The number of likes the post currently has.
 * @returns {Promise<void>} - A Promise that resolves when the like state has been updated.
 */
export const unlike = (id, authToken, likes) => {
    return async (dispatch, getState) => {

        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "DELETE",
        };
        const url = "https://backend.insjoaquimmir.cat/api/posts/" + id + "/likes"

        const data = await fetch(url,  headers  );
        const resposta = await data.json();

        if (resposta.success == true) {
            dispatch(setLiked(false));
            dispatch(setLikes(likes - 1));
        }
    };
}