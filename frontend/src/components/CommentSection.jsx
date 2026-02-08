import { useEffect, useState } from "react";
import { BiLike, BiDislike, BiEdit, BiTrash } from "react-icons/bi";
import { IoSend, IoClose } from "react-icons/io5";
import apiClient from "../services/api-client";

function CommentSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    if (!videoId) return;

    const fetchComments = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get(
          `/comments/video/${videoId}/comments`
        );
        setComments(data);
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
      const { data } = await apiClient.post(`/comments`, {
        comment: newComment,
        video: videoId,
      });

      setComments((prev) => [data, ...prev]);
      setNewComment("");
    } finally {
      setPosting(false);
    }
  };

  /* =====================
     EDIT COMMENT
  ====================== */
  const handleUpdateComment = async (id) => {
    if (!editingText.trim()) return;

    const { data } = await apiClient.put(`/comments/${id}`, {
      comment: editingText,
      video: videoId
    });

    console.log('update: ', data)

    setComments((prev) =>
      prev.map((c) => (c._id === id ? data : c))
    );

    setEditingId(null);
    setEditingText("");
  };

  /* =====================
     DELETE COMMENT
  ====================== */
  const handleDeleteComment = async (id) => {
    if (!confirm("Delete this comment?")) return;

    await apiClient.delete(`/comments/${id}`);

    setComments((prev) => prev.filter((c) => c._id !== id));
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
          className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700"
        >
          <IoSend size={20} />
        </button>
      </div>

      {loading && <p className="text-sm text-neutral-400">Loading comments…</p>}

      {/* Comments */}
      <div className="space-y-6">
        {comments.map((c) => (
          <div key={c._id} className="flex gap-3">
            <img
              src={c.user?.avatar?.url}
              alt={c.user?.userName}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="flex-1">
              <div className="flex justify-between">
                <p className="text-sm font-medium">
                  @{c.user?.userName}
                </p>

                {/* Edit / Delete */}
                <div className="flex gap-2 text-neutral-400">
                  <button
                    onClick={() => {
                      setEditingId(c._id);
                      setEditingText(c.comment);
                    }}
                    className="hover:text-white"
                  >
                    <BiEdit size={18} />
                  </button>

                  <button
                    onClick={() => handleDeleteComment(c._id)}
                    className="hover:text-red-400"
                  >
                    <BiTrash size={18} />
                  </button>
                </div>
              </div>

              {/* Comment / Edit mode */}
              {editingId === c._id ? (
                <div className="mt-2 flex items-center gap-2">
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 bg-neutral-900 border border-neutral-700 rounded-full px-3 py-1 text-sm"
                  />
                  <button
                    onClick={() => handleUpdateComment(c._id)}
                    className="text-green-400"
                  >
                    <IoSend size={18} />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-neutral-400"
                  >
                    <IoClose size={18} />
                  </button>
                </div>
              ) : (
                <p className="text-sm text-neutral-300 mt-1">
                  {c.comment}
                </p>
              )}

              <div className="flex items-center gap-6 mt-2 text-neutral-400 text-sm">
                <button className="flex items-center gap-1 hover:text-white">
                  <BiLike size={18} />
                  Like
                </button>
                <button className="flex items-center gap-1 hover:text-white">
                  <BiDislike size={18} />
                  Dislike
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
