import { useEffect, useState } from "react";
import { BiLike, BiDislike } from "react-icons/bi";
import { IoSend } from "react-icons/io5";
import apiClient from "../services/api-client";

function CommentSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!videoId) return;

    const fetchComments = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get(
          `/comments/video/${videoId}/comments`
        );
        setComments(data);
      } catch (ex) {
        setError("Failed to load comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [videoId]);

  /* =====================
     POST COMMENT
  ====================== */
  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    try {
      setPosting(true);
      const { data } = await apiClient.post(
        `/comments/`,
        { comment: newComment, video: videoId }
      );

      // add new comment on top (YouTube style)
      setComments((prev) => [data, ...prev]);
      setNewComment("");
    } catch (ex) {
      alert("Failed to post comment");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">
        Comments {comments.length > 0 && `(${comments.length})`}
      </h2>

      {/* Add Comment */}
      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 outline-none focus:border-neutral-600"
        />

        <button
          onClick={handlePostComment}
          disabled={posting}
          className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50"
        >
          <IoSend size={20} />
        </button>
      </div>

      {loading && <p className="text-sm text-neutral-400">Loading comments…</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Comments */}
      <div className="space-y-6">
        {comments.map((c) => (
          <div key={c._id} className="flex gap-3">
            <img
              src={c.user?.avatar}
              alt={c.user?.userName}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="flex-1">
              <p className="text-sm font-medium">
                @{c.user?.userName}
              </p>

              <p className="text-sm text-neutral-300 mt-1">
                {c.comment}
              </p>

              <div className="flex items-center gap-6 mt-2 text-neutral-400 text-sm">
                <button className="flex items-center gap-1 hover:text-white">
                  <BiLike size={18} />
                  Like
                </button>

                <button className="flex items-center gap-1 hover:text-white">
                  <BiDislike size={18} />
                  Dislike
                </button>

                <button className="hover:text-white font-medium">
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}

        {!loading && comments.length === 0 && (
          <p className="text-sm text-neutral-400">No comments yet</p>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
