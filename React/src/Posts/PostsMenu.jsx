import "./css/menu.css";

export default function PostsMenu() {


    return (
        <>
            <div class="posts-menu">
                <ul>
                    <li className="entrada"><a href="#home">Afegir Entrada</a></li>
                    <li className="grid"><a href="#news">Grid</a></li>
                    <li className="llistar"><a href="#contact">Llista</a></li>
                </ul>
            </div>
        </>
      );
}