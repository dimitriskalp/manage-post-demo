import {usePostContext} from "../contexts/PostContextProvider.jsx";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import axiosClient from "../axios-client.js";

export default function Posts() {
  const { posts, loading, fetchPosts} = usePostContext();

  useEffect(() => {
    fetchPosts('posts');
  }, []);

  const likePost = post => {
    axiosClient.post(`/posts/${post}/like`)
      .then(() => {
        fetchPosts()
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h2>Posts</h2>
        <Link to="/post/create" className="btn-add">Create Post</Link>
      </div>
      {loading &&
        <div className="loading-overlay" id="loading-overlay">
          <div className="spinner"></div>
        </div>
      }

      {!loading &&
      <div className="post-container animated fadeInDown">
        {Object.keys(posts).map((key) => (

          <div key={key.id} className="post">
            <div className="post-content">
              <h2>{posts[key].title}</h2>
              <p>{posts[key].body}</p>
            </div>
            <button onClick={ev => likePost(posts[key].id)} className="like-button">Like</button>
          </div>
        ))}
      </div>
      }
    </div>
  )
}
