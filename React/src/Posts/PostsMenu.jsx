import { Link } from "react-router-dom";

import "./css/menu.css";

export default function PostsMenu() {


    return (
        <>
            <div class="posts-menu">
                <ul>
                    <li className="entrada"><Link to="/posts/add">Afegir Entrada </Link></li>
                    <li className="grid"><Link to="/posts/grid">Grid</Link></li>
                    <li className="llistar"><Link to="/posts">Llistar</Link></li>
                </ul>
            </div>
        </>
      );
}