import { useState } from 'react'
import { UserContext } from "./userContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./About";
import Places from "./Places/Places";
import Posts from "./Posts/Posts";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import LoginRegister from './auth/LoginRegister'

import './App.css'

function App() {
  let [authToken, setAuthToken] = useState("");

  return (
    <>
      <UserContext.Provider value = {{ authToken, setAuthToken }}
        // { authToken, setAuthToken } equival a  { authToken: authToken, setAuthToken:setAuthToken}
      >
        {authToken ? (
          <>
            <Header />
            <Routes>
              <Route path="/places" element={<Places />} />
              <Route path="/" element={<Posts />} />
              <Route path="/about" element={<About />} />
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
