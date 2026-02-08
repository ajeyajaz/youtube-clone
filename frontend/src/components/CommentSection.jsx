import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

function CommentSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!videoId) return;

    const fetchComments = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get(
          `/comments/video/${videoId}/comments`
        );
        console.log('comments: ', data)
        setComments(data);
      } catch (ex) {
        setError("Failed to load comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [videoId]);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">
        Comments {comments.length > 0 && `(${comments.length})`}
      </h2>

      {/* Add comment (UI only for now) */}
      <input
        type="text"
        placeholder="Add a comment..."
        className="w-full bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 mb-6 outline-none focus:border-neutral-600"
      />

      {/* States */}
      {loading && <p className="text-sm text-gray-400">Loading comments…</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Comment List */}
      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c._id} className="flex gap-3">
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-neutral-700 flex items-center justify-center text-sm font-medium">
              {c.user.name[0]}
            </div>

            {/* Content */}
            <div>
              <p className="text-sm font-medium">{c.user.name}</p>
              <p className="text-sm text-neutral-300">{c.text}</p>
            </div>
          </div>
        ))}

        {!loading && comments.length === 0 && (
          <p className="text-sm text-gray-400">No comments yet</p>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
