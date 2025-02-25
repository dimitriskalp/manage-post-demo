import {usePostContext} from "../contexts/PostContextProvider.jsx";
import {Link} from "react-router-dom";
import {useEffect, useRef} from "react";
import axiosClient from "../axios-client.js";

export default function Posts() {
  const { posts, loading, setLoading, fetchPosts, setPosts} = usePostContext();

  const searchRef = useRef();

  useEffect(() => {
    fetchPosts('posts');
  }, []);

  const likePost = post => {
    axiosClient.post(`/posts/${post}/like`)
      .then(() => {
        fetchPosts();
      })
  }

  const handleSearch = (e) => {
    e.preventDefault();
    let input = searchRef.current.value;
    setLoading(true);
    axiosClient.get(`/posts/search/?input=` + input)
      .then((data) => {
        setPosts(data.data['data']);
        setLoading(false);
      })
  }

  const handleChange = (e) => {
    e.preventDefault();
    let input = searchRef.current.value;
    if (input.length === 0) {
      fetchPosts();
    }
  }

  return (
    <div className="container mt-5">
      <div className="row mb-5">
        <div className="col-md-4 col-sm-4 col-xs-12 mb-3 mb-sm-0">
          <h2>Posts</h2>
        </div>
        <div className="col-md-4 col-sm-4 col-xs-12 mb-3 mb-sm-0">
          <form onSubmit={handleSearch} className="form-main">
            <div className="row ">
              <div className="col-md-6 w-100">
                <div className="input-group">
                  <input onChange={handleChange} ref={searchRef} className="form-control form-control-lg" type="search" placeholder="Search"
                         aria-label="Search"/>
                    <button className="btn-search" type="submit">GO</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-4 col-sm-4 col-xs-12 text-sm-end">
          <Link to="/post/create" className="btn btn-success h-100 align-content-center fw-bold">Create Post</Link>
        </div>
      </div>
      {loading &&
        <div className="loading-overlay" id="loading-overlay">
          <div className="spinner"></div>
        </div>
      }
      {!loading &&
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
                <button onClick={ev => likePost(posts[key].id)} className="btn btn-outline-danger fw-bold">Like</button>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}
