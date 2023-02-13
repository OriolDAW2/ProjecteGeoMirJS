import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../userContext";
import '../App.css'
import { useNavigate, useParams } from "react-router-dom";

export default function PlaceEdit () {
    const { id } = useParams();
    let [formulari, setFormulari] = useState({});
    let { authToken,setAuthToken } = useContext(UserContext);
    let [places, setPlaces] = useState("");
    let navigate = useNavigate();

    const handleChange = (e) => {
      e.preventDefault();
      if (e.target.name==="upload")
        {
          console.log(e.target.files[0].name)
          setFormulari({
            ...formulari,
            [e.target.name] : e.target.files[0] 
  
  
          })
        }
      else {
            setFormulari({
              ...formulari,
              [e.target.name] : e.target.value
  
            })
        };
    }
    const getPlaceEdit = async() =>{
      
      try{
        const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authToken
          },
          method: "GET"

        })
        const resposta = await data.json();
        if (resposta.success === true){
          const { data } = resposta
          setFormulari({
            name: data.name,
            description: data.description,
            upload: "",
            latitude: data.latitude,
            longitude: data.longitude,
            visibility: data.visibility.id,

          })
        } 

        else{
          console.log(formulari)
          alert(resposta.message);
        } 
          
      }catch{
        console.log("Error");
        alert("Catch");
      }
      formAddPlace.reset(); 
    }
    const editPlace = async(e) => {

      e.preventDefault();

      let {description,upload,latitude,longitude,visibility}=formulari;
      console.log(formulari);
      var formData = new FormData();
      formData.append("description", description);
      formData.append("upload", upload);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("visibility", visibility);

      try{
        const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authToken
          },
          method: "PLACE",
          description: formData

        })
        const resposta = await data.json();
        if (resposta.success === true){
          console.log(resposta);
          alert("Place Editat");
        } 

        else{
          console.log(formulari)
          alert(resposta.message);
        } 
          
      }catch{
        console.log("Error");
        alert("Catch");
      }
      formAddPlace.reset(); 
    }
    useEffect(() => {
      editPlace();
      getPlaceEdit();
      navigator.geolocation.getCurrentPosition( (pos )=> {

        setFormulari({
    
    
          ...formulari,
          latitude :  pos.coords.latitude,
          longitude: pos.coords.longitude
      
        })
        
        console.log("Latitude:", pos.coords.latitude);
        console.log("Longitude:", pos.coords.longitude);
      });

    }, [])
  return (
    <div>
        <div className="">
          <form id="formAddPlace" className="">
            <div className=""><h3>Edit Place</h3></div>
            <div>
              <input type="text" placeholder="Description" id="description" name="description" value = { formulari.description } onChange={handleChange}/>
            </div>
            <div>
              <input type="number" placeholder="Latitude" id="latitude" name="latitude" value = { formulari.latitude } onChange={handleChange}/>
            </div>
            <div>
              <input type="number"placeholder="Longitude" id="longitude" name="longitude" value = { formulari.longitude } onChange={handleChange}/>
            </div>
            <div>
              <label>Visibility</label>
              <select value= {formulari.visibility } onChange={handleChange} id="visibility" name="visibility"  >
                <option  value="1" checked >Public</option>
                <option  value="3" >Private</option>
                <option  value="2" >Contacts</option>
              </select>
            </div>
            <div>
              <input type="file" placeholder="Upload" id="upload" name="upload" onChange={handleChange}/>
            </div>
            <button className="" onClick={(e) => {editPlace(e);}}>Edit Place</button>		
          </form>
        </div>		
    </div>
  )
}