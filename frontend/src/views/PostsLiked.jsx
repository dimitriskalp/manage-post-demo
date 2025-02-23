import {usePostContext} from "../contexts/PostContextProvider.jsx";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";

export default function PostsLiked() {
  const { posts, loading, fetchPosts} = usePostContext();

  useEffect(() => {
    fetchPosts('liked-posts');
  }, []);

  const unLikePost = post => {
    axiosClient.delete(`/posts/${post}/unlike`)
      .then(() => {
        fetchPosts('liked-posts');
      })
  }
  const unLikeAllPosts = () => {
    axiosClient.delete(`/liked-posts`)
      .then(() => {
        fetchPosts('liked-posts');
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h2>Liked Posts</h2>
        <button onClick={ev => unLikeAllPosts()} className="like-button">Unlike All</button>
      </div>
      {loading &&
        <div className="loading-overlay" id="loading-overlay">
          <div className="spinner"></div>
        </div>
      }

      {!loading && posts.length === 0 && (
        <h3 style={{ textAlign: "center", marginTop: "20px", color: "gray" }}>
          You haven't liked any posts yet.
        </h3>
      )}

      {!loading && posts.length > 0 &&
        <div className="post-container animated fadeInDown">
          {Object.keys(posts).map((key) => (

            <div className="post">
              <div className="post-content">
                <h2>{posts[key].title}</h2>
                <p>{posts[key].body}</p>
              </div>
              <button onClick={ev => unLikePost(posts[key].id)} className="like-button">Unlike</button>
            </div>
          ))}
        </div>
      }
    </div>
  )
}
