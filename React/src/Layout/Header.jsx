import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";

import './css/style.css'

export default function Header() {
  let { authToken, setAuthToken } = useContext(UserContext);

  return (
    <>
      <div class="header">
        <Link to="/about">About </Link>
        Token: <strong>{authToken}</strong>
      </div>
      <hr />
    </>
  );
}