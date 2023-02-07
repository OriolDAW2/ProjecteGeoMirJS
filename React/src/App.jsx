import { useState } from 'react'
import { UserContext } from "./userContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./About";
import Places from "./Places/Places";
import PostsList from './Posts/PostsList';
import PostAdd from "./Posts/PostAdd";
import PostEdit from "./Posts/PostEdit";
import Post from './Posts/Post';
import Index from './Index';
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import LoginRegister from './auth/LoginRegister'
import PostsMenu from "./Posts/PostsMenu";
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
              <Route path="/places" element={<Places />} />
              <Route path="/" element={<Index />} />
              <Route path="/posts" element={<> <PostsMenu /><PostsList /> </>} />
              <Route path="/posts/add" element={<> <PostsMenu /><PostAdd /> </>} />
              <Route path="/posts/:id" element={<> <PostsMenu /><Post/> </>} />
              <Route path="/posts/edit/:id" element={<> <PostsMenu /><PostEdit /> </>} />
              <Route path="/about" element={<About />} />
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
