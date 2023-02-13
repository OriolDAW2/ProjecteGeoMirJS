import { Link } from "react-router-dom";

import "./css/menu.css";

export default function PlacesMenu() {


    return (
        <>
            <div class="places-menu">
                <ul>
                    <li className="entrada"><Link to="/places/add">Afegir Entrada </Link></li>
                    <li className="grid"><Link to="/places/grid">Grid</Link></li>
                    <li className="llistar"><Link to="/places">Llistar</Link></li>
                </ul>
            </div>
        </>
      );
}