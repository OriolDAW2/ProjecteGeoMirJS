import { startLoadingPosts, setError, setPosts, setPost, setLikes, setLiked, setPages } from "./postSlice";

export const getPosts = (page = 0, authToken) => {
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

        let url =
            page > 0
                ? "https://backend.insjoaquimmir.cat/api/posts?paginate=1&page=" + page
                : "https://backend.insjoaquimmir.cat/api/posts";

        const data = await fetch(url,  headers);
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
        
    };
}

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

        const data = await fetch(url,  headers  );
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
            dispatch (getPosts(0, authToken))
        }
    };
};

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
