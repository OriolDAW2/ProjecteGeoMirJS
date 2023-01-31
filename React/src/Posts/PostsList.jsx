import { useParams } from 'react-router-dom';
import './css/posts.css';



export default function PostsList() {
    let { id } = useParams();

    return (
      <div>
        <section class="form-login-r">
          <h2>Posts</h2>
          <div>{ id }</div>
        </section>
      </div>

    );
  }