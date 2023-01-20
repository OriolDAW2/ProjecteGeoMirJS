import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function LoginRegister() {

  let [login, setLogin] = useState(true);

  return (
    <div className="App">
      {login ? <Login setLogin={setLogin} /> : <Register setLogin={setLogin} />}
    </div>
  );
}