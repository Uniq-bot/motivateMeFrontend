import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { PostContext } from "../Contexts/PostContext";
import PostCard from "../Components/PostCard";
import PostBar from "../Components/PostBar";
import CreatePost from "../Components/Create";

const Feed = () => {
  const { user } = useContext(AuthContext);
  const { posts, displayPostInput, setDisplayPostInput, setPosts, fetchPost } = useContext(PostContext);

  // Called when post creation modal closes
  const handleClose = () => setDisplayPostInput(false);

  // Called after a new post is created
  const handlePostCreated = async (newPost) => {
    // Refresh posts from server to ensure consistent populated data
    try {
      const res = await fetchPost();
      if (res?.posts) setPosts(res.posts);
    } catch (err) {
      // fallback: prepend the newly created post
      setPosts((prev) => [newPost, ...prev]);
    } finally {
      setDisplayPostInput(false); // Close modal
    }
  };

  return (
    <div className={`min-h-screen ${displayPostInput ? 'overflow-hidden' : ''} relative bg-gray-900 w-full px-3 py-5`}>
      {/* Welcome */}
      <h1 className="text-2xl text-white font-bold mb-2">
        Welcome, {user?.username?.firstName || "Guest"} 👋
      </h1>
      <p className="text-gray-400 mb-6">Here’s your motivational feed!</p>

      {/* Post Bar */}
      <div className="pb-10">
        <PostBar />
      </div>

      {/* Posts */}
      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {/* Overlay + Create Post Modal */}
      {displayPostInput && (
        <>
          {/* Dark overlay */}
          <div
            onClick={handleClose}
            className="absolute inset-0 z-40 bg-black/70 transition-opacity duration-300"
          ></div>

          {/* Centered CreatePost */}
          <div className="fixed left-1/2 -translate-x-1/2 top-1/4 z-50 w-full max-w-2xl p-4 transition-transform duration-300">
            <CreatePost onClose={handleClose} onPosted={handlePostCreated} />
          </div>
        </>
      )}
    </div>
  );
};

export default Feed;
