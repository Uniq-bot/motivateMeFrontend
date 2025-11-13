import { Children, createContext } from "react";
import { useState, useEffect } from "react";
import { fetchAllPost } from "../utils/api";
export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [displayPostInput, setDisplayPostInput] = useState(false);
  const fetchPost = async () => {
    const post = await fetchAllPost();
    setPosts(post.posts);
    return post;
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        fetchPost,
        displayPostInput,
        setDisplayPostInput,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
