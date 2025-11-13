import React, { useState } from "react";
import { createPost } from "../utils/api";

const CreatePost = ({ onClose, onPosted }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const payload = { title, content };
    const token = localStorage.getItem("motiToken");

    try {
      const newPost = await createPost(payload, token);

      // Clear inputs
      setTitle("");
      setContent("");

      // Notify parent
      if (onPosted) onPosted(newPost);
    } catch {
      // Handle error silently or show user message
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-2xl shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">
        Create a New Post
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          className="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your content here..."
          className="px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
          required
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition flex-1"
          >
            Post
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};


export default CreatePost;
