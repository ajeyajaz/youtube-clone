import { useState } from "react";
import { IoSend } from "react-icons/io5";
import ErrorToast from "../components/ErrorToast";
import commentService from "./comment-service";
import CommentCard from "./CommentCard";
import useComments from "./useComments";
import AddComment from "./AddComment";
import { useSelector } from "react-redux";

function CommentSection({ videoId }) {
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [posting, setPosting] = useState(false);
  const {user, isAuthenticated} = useSelector(state => state.auth);

  console.log('isAuth', isAuthenticated)
  

  const {
    data: comments,
    setData: setComments,
    error,
    setError,
    loading,
  } = useComments(videoId);

  // Post comment
  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    setPosting(true);

    try {
      const { data } = await commentService.post({
        video: videoId,
        comment: newComment.trim(),
      });

      setComments([data, ...comments]);
    } catch (ex) {
      setError(ex.response?.data || "could not update comment.");
    } finally {
      setNewComment("");
      setPosting(false);
    }
  };

  // edit comment
  const handleUpdateComment = async (commentId) => {
    if (!editingText.trim()) return;

    try {
      const { data: udpatedComment } = await commentService.put(commentId, {
        video: videoId,
        comment: editingText.trim(),
      });
      // update comments
      setComments((prev) =>
        prev.map((p) => (p._id !== commentId ? p : udpatedComment)),
      );
    } catch (ex) {
      setError(ex.response?.data || "could not update comment.");
    } finally {
      setEditingId(null);
      setEditingText("");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await commentService.delete(commentId);
      //filter comment
      setComments((prev) => prev.filter((p) => p._id !== commentId));
    } catch (ex) {
      setError(ex.response?.data || "could not delete comment.");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">
        Comments {comments?.length > 0 && `(${comments.length})`}
      </h2>

      {/* Add Comment */}
      <AddComment
        handlePostComment={handlePostComment}
        newComment={newComment}
        setNewComment={(c) => setNewComment(c)}
        posting={posting}
        isAuthenticated={isAuthenticated}
      />

      {loading && <p className="text-sm text-neutral-400">Loading comments…</p>}

      {
        <div className="flex flex-col gap-3">
          {comments.map((c) => (
            <CommentCard
              key={c._id}
              comment={c}
              setEditingId={(id) => setEditingId(id)}
              editingId={editingId}
              handleDeleteComment={handleDeleteComment}
              handleUpdateComment={handleUpdateComment}
              editingText={editingText}
              setEditingText={(text) => setEditingText(text)}
              isOwner={user?._id === c.user._id}
            />
          ))}
        </div>
      }

      <ErrorToast message={error} onClose={() => setError("")} />
    </div>
  );
}

export default CommentSection;
