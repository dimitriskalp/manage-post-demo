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
        fetchPosts()
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
    <div>
      <div className="post-header">
        <h2>Posts</h2>

        <form onSubmit={handleSearch} className="search-form" role="search">
          <div className="search-container">
            <input onChange={handleChange} ref={searchRef} id="search-input" type="search" placeholder="Search..." autoFocus required/>
            <button className="btn-search" type="submit">Go</button>
          </div>
        </form>

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

          <div key={posts[key].id} className="post">
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
