import {createContext, useContext, useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

const PostsContext = createContext({
  posts: [],
  setPosts: () => {},
  fetchPosts: () => {}
});

export const PostProvider = ({children}) => {
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchPosts = (url = "posts") => {
    setLoading(true);

    axiosClient
      .get(`/${url}`)
      .then(({ data }) => {
        setPosts(data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   fetchPosts('posts');
  // }, []);

  return (
    <PostsContext.Provider value={ { posts,setPosts, loading,setLoading, fetchPosts } }>
      {children}
    </PostsContext.Provider>
  );
};

export const usePostContext = () => useContext(PostsContext);
