import {usePostContext} from "../contexts/PostContextProvider.jsx";
import {useEffect} from "react";
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
    <div className="container mt-5">
      <div className="row mb-5">
        <div className="col-md-6 col-sm-6 col-xs-12">
          <h2>Like Posts</h2>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12 text-end">
          <button onClick={ev => unLikeAllPosts()} className="btn btn-outline-danger fw-bold">Unlike All</button>
          {/*<Link to="/post/create" className="btn btn-success h-100 align-content-center fw-bold">Create Post</Link>*/}
        </div>
      </div>
      {loading &&
        <div className="loading-overlay" id="loading-overlay">
          <div className="spinner"></div>
        </div>
      }

      {!loading &&
        <div className="row">
          {posts.length === 0 &&
            <h3 className="warning">
              You haven't liked any posts yet.
            </h3>
          }
          {posts.length > 0 &&
            Object.keys(posts).map((key) => (
              <div key={posts[key].id} className="card p-3 shadow-lg border-0 rounded-4 mb-3">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="fw-bold">{posts[key].title}</h5>
                    <p className="text-muted">
                      {posts[key].body}
                    </p>
                  </div>
                  <div>
                    <button onClick={ev => unLikePost(posts[key].id)} className="btn btn-outline-danger fw-bold">Unlike</button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      }
    </div>
  )
}
