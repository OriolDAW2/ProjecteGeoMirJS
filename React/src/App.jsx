import { useState } from 'react'
import { UserContext } from "./userContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./About";
// import Places from "./Places/Places";

import PlacesList from './Places/PlacesList';
import PostsList from './Posts/PostsList';
import PlaceAdd from "./Places/PlaceAdd";
import PostAdd from "./Posts/PostAdd";
import PlaceEdit from "./Places/PlaceEdit";
import PostEdit from "./Posts/PostEdit";
import Place from './Places/Place';
import Post from './Posts/Post';
import Index from './Index';
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import LoginRegister from './auth/LoginRegister'
import PlacesMenu from "./Places/PlacesMenu";
import PostsMenu from "./Posts/PostsMenu";
import PlacesGrid from "./Places/PlacesGrid";
import PostsGrid from "./Posts/PostsGrid";


import './App.css'

const App = () => {
  let [authToken, setAuthToken] = useState("");
  let [userEmail, setUserEmail] = useState("");

  return (
    <>
      <UserContext.Provider value = {{ authToken, setAuthToken, userEmail, setUserEmail }}
      
      >
        {authToken ? (
          <>
            <Header />
            <Routes>
              {/* <Route path="/places" element={<Places />} /> */}
              <Route path="/" element={<Index />} />
              <Route path="/places" element={<> <PlacesMenu /><PlacesList /> </>} />
              <Route path="/posts" element={<> <PostsMenu /><PostsList /> </>} />
              <Route path="/places/add" element={<> <PlacesMenu /><PlaceAdd /> </>} />
              <Route path="/posts/add" element={<> <PostsMenu /><PostAdd /> </>} />
              <Route path="/places/:id" element={<> <PlacesMenu /><Place/> </>} />
              <Route path="/posts/:id" element={<> <PostsMenu /><Post/> </>} />
              <Route path="/places/edit/:id" element={<> <PlacesMenu /><PlaceEdit /> </>} />
              <Route path="/posts/edit/:id" element={<> <PostsMenu /><PostEdit /> </>} />
              <Route path="/about" element={<About />} />
              <Route path="/places/grid" element={<> <PlacesMenu /><PlacesGrid /> </>} />
              <Route path="/posts/grid" element={<> <PostsMenu /><PostsGrid /> </>} />
            </Routes>
            <Footer />
          </>
        ) : (
          <LoginRegister />
        )}
      </UserContext.Provider>
    </>
  );
}

export default App
