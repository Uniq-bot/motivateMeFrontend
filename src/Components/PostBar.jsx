import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../Contexts/PostContext";

const PostBar = () => {
  const {setDisplayPostInput}= useContext(PostContext)
  const handleClick = () => {
   setDisplayPostInput(true)
  };

  return (
    <div
      onClick={handleClick}
      className="max-w-2xl mx-auto mt-6 p-4 bg-gray-800 rounded-2xl shadow-md border border-gray-700 cursor-pointer hover:shadow-lg transition"
    >
      <input
        type="text"
        placeholder="What's on your mind?"
        className="w-full bg-gray-700 text-gray-300 placeholder-gray-400 px-4 py-2 rounded-lg cursor-pointer focus:outline-none"
        readOnly
      />
    </div>
  );
};

export default PostBar;
