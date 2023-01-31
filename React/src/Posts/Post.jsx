import { useParams } from 'react-router-dom';
import './css/posts.css';


export default function Post() {
    const { id } = useParams();

    return (
      <div>
        <section class="form-login-r">
          <h2>Post</h2>
          <div>ID: { id }</div>
        </section>
      </div>

    );
  }