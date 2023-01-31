
import './css/posts.css';

export default function PostEdit() {

    
    return (
      <div>
        <section class="form-login-r">
          <h2>Editar Post</h2>
          <textarea class="controls" type="text" name="body" placeholder="Mensaje"/>
          <input class="controls" type="text" name="latitude" placeholder="Latitud"/>
          <input class="controls" type="text" name="longitude" placeholder="Longitud"/>
          <input class="controls" type="file" name="file"/>
          <div hidden class="errors" id="password"></div>
          <div hidden class="errors" id="errors"></div>
          <input class="buttons" type="submit" name="" value="Crear Post"/>
        </section>
      </div>

    );
  }