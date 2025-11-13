import React, { useContext, useState } from "react";
import { addComment, likePost } from "../utils/api";
import { AuthContext } from "../Contexts/AuthContext";

const PostCard = ({ post }) => {
  const { user } = useContext(AuthContext);

  const [likes, setLikes] = useState(post?.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(
    post?.likes?.some(
      (l) => (typeof l.user === "string" ? l.user : l.user?._id) === user?._id
    ) || false
  );

  const [comments, setComments] = useState(post?.comments || []);
  const [commentInput, setCommentInput] = useState("");

  const handleLike = async () => {
    const token = localStorage.getItem("motiToken");
    try {
      const response = await likePost(post._id, token);

      setLikes(response.post.likes.length);
      const liked = response.post.likes.some((l) => {
        const userId = typeof l.user === "string" ? l.user : l.user._id;
        return userId === user._id;
      });
      setIsLiked(liked);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async () => {
    if (!commentInput.trim()) return;

    // Add comment locally
    const newComment = { content: commentInput };
    setComments((prev) => [...prev, newComment]);
    setCommentInput("");

    // Send comment to backend
    const token = localStorage.getItem("motiToken");
    try {
      await addComment(post._id, commentInput, token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-900 p-5 rounded-2xl shadow-lg border border-gray-700 hover:shadow-2xl transition-all mb-6">
      <h2 className="text-xl font-bold text-blue-400 mb-2">{post.title}</h2>
      <p className="text-gray-300 mb-3">{post.content}</p>

      <div className="flex justify-between text-gray-400 text-sm mb-3">
        <span>
          By {post.postBy?.username?.firstName || "Unknown"}{" "}
          {post.postBy?.username?.lastName || ""}
        </span>
        <span>{post.date || new Date().toLocaleString()}</span>
      </div>

      <div className="flex items-center gap-4 mb-3">
        <button
          onClick={handleLike}
          className={`px-3 py-1 rounded-lg font-semibold transition ${
            isLiked
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isLiked ? "❤️ Liked" : "👍 Like"} {likes}
        </button>
      </div>

      <div className="bg-gray-800 p-3 rounded-lg">
        <h3 className="text-gray-400 text-sm font-semibold mb-2">Comments</h3>
        <div className="space-y-1">
          {comments.map((c, idx) => (
            <p key={idx} className="text-gray-300 text-sm">
              {c.content}
            </p>
          ))}
        </div>

        <div className="flex gap-2 mt-3">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          />
          <button
            onClick={handleAddComment}
            className="px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition font-semibold"
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
