import React, { useContext } from 'react'
import { useState } from 'react';
import { UserContext } from '../userContext';
import { useForm } from '../hooks/useForm';
import { useLogin } from '../hooks/useLogin';

export const Login = ({ setLogin }) => {

  // Implementem codi de gestió 
  let [ error, setError] = useState("");
   
  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);

  const { formState, onInputChange } = useForm({
    email: "",
    password: "",
    });
    const {email,password} = formState;

    const {doLogin} = useLogin();

    // UNA VEZ CREADO EL HOOK DEL TOKEN YA NO ME HACE FALTA EL CHECKLOGIN PORQUE YA LO HAGO AHI EN LA FUNCION DOLOGIN
  
//   const check_login = (e) =>  {

//     e.preventDefault();

//     console.log("Comprovant credencials....")
//     // Enviam dades a l'aPI i recollim resultat
//     fetch ("https://backend.insjoaquimmir.cat/api/login",{
        
//          headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             //"Access-Control-Allow-Origin": "*"  
//         },
//         method: "POST",
//         body: JSON.stringify({email: email, password: password})
//     }
//     ).then( data => data.json() )
//     .then (resposta => { 
        
//             console.log(resposta); 
//             if (resposta.success == true )
//             {
//                 setUsuari(email);
//                 console.log(usuari)
//                 setAuthToken(resposta.authToken);
 
//             }
//             else
//             { 
//                 console.log(resposta)
//                 setError(resposta.message);
//             }
//         } ) 
//     .catch((data) => {
//         setError("Network error")
//     });
//   }
  return (
    
   <section
   className="absolute top-1/2 left-1/2 mx-auto max-w-sm -translate-x-1/2 -translate-y-1/2 transform space-y-4 text-center">
   

    <div x-show="!isLoginPage" className="space-y-4">
                <header className="mb-3 text-2xl font-bold">Log in</header>
                <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Email or username" name="email" onChange={onInputChange} value={email} 
                        className="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                <div
                    className="flex w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="password" placeholder="Password" name="password" onChange={onInputChange} value={password}
                        className="my-3 w-full border-none bg-transparent outline-none" />
                    <a href="#" className="font-medium text-gray-400 hover:text-gray-500">FORGOT?</a>
                </div>
                { error ? (<div className="flex w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200 ">{error}</div>) : (<></>)  }
                <button onClick={ () => { doLogin(formState) }}
                    className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">
                    LOG IN
                </button>
            </div>

            {/* <div className="flex items-center space-x-4">
                <hr className="w-full border border-gray-300" />
                <div className="font-semibold text-gray-400">OR</div>
                <hr className="w-full border border-gray-300" />
            </div> */}

            <footer>
                {/* <div className="grid grid-cols-2 gap-4">
                    <a href="#"
                        className="rounded-2xl border-b-2 border-b-gray-300 bg-white py-2.5 px-4 font-bold text-blue-700 ring-2 ring-gray-300 hover:bg-gray-200 active:translate-y-[0.125rem] active:border-b-gray-200">GITHUB</a>
                    <a href="#"
                        className="rounded-2xl border-b-2 border-b-gray-300 bg-white py-2.5 px-4 font-bold text-blue-500 ring-2 ring-gray-300 hover:bg-gray-200 active:translate-y-[0.125rem] active:border-b-gray-200">GOOGLE</a>
                </div> */}

                <div className="mt-8 text-sm text-gray-400">
                    By signing in to ********, you agree to our
                    <a href="#" className="font-medium text-gray-500">Terms</a> and
                    <a href="#" className="font-medium text-gray-500">Privacy Policy</a>.
                </div>
                <div className="mt-8 text-sm text-gray-400">
                    <button onClick={ ()=> setLogin(false) } className="underline">Not registered ?</button>
                </div>
            </footer>
   </section>
    
    
    
    
    
  )
}