import { UserContext } from "../userContext";
import { useEffect, useContext } from "react";

export const useLogin = () => {

    let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);

    const checkAuthToken = () => {

        let token = localStorage.getItem("authToken") || ""
        if (token == ""){
            setAuthToken("");
        }else{
            fetch("https://backend.insjoaquimmir.cat/api/user",{
        
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //"Access-Control-Allow-Origin": "*"
            "Authorization": "Bearer " + token,  
        },
        method: "GET",
            }).then( data => data.json() )
            .then((resposta) => {
                if (resposta.success === true) {
                    setAuthToken(token);
                    console.log("Token Correcte: " + token);
                    setUsuari(resposta.user.email);
                }else{
                    setAuthToken("");
                }
            });
        }
    };

    const doLogin = (formState) =>  {
    
        console.log("Comprovant credencials....")
        // Enviam dades a l'aPI i recollim resultat
        fetch ("https://backend.insjoaquimmir.cat/api/login",{
            
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //"Access-Control-Allow-Origin": "*"  
            },
            method: "POST",
            body: JSON.stringify(formState)
        }
        ).then( data => data.json() )
        .then (resposta => { 
            
                console.log(resposta); 
                if (resposta.success == true )
                {
                    setAuthToken(resposta.authToken);
                    localStorage.setItem('authToken', resposta.authToken);
                    // setUsuari(resposta.user.email);
                    console.log(usuari)
                }
                else
                { 
                    setAuthToken("");
                    console.log(resposta)
                    alert(resposta.message);
                }
            } ) 
        .catch((data) => {
            console.log("Network error")
        });
    }

    useEffect(() => {
        checkAuthToken();
    })
    return {doLogin};
}