import { BiDislike, BiEdit, BiLike, BiTrash } from "react-icons/bi";
import { IoClose, IoSend } from "react-icons/io5";

function commentCard({
  comment,
  handleUpdateComment,
  setEditingId,
  editingId,
  handleDeleteComment,
  setEditingText,
  editingText,
  isOwner,
}) {
  return (
    <div className="flex gap-3">
      <img
        src={comment.user?.avatar?.url || `https://ui-avatars.com/api/?name=${comment.user?.userName}&size=128&background=0f0f0f&color=ffffff`}
        alt={comment.user?.userName}
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="flex-1">
        <div className="flex justify-between">
          <p className="text-sm font-medium">@{comment.user?.userName}</p>

          {/* Edit / Delete */}
          {isOwner && (
            <div className="flex gap-2 text-neutral-400">
              <button
                onClick={() => {
                  setEditingId(comment._id);
                  setEditingText(comment.comment);
                }}
                className="hover:text-white"
              >
                <BiEdit size={18} />
              </button>

              <button
                onClick={() => handleDeleteComment(comment._id)}
                className="hover:text-red-400"
              >
                <BiTrash size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Comment / Edit mode */}
        {editingId === comment._id ? (
          <div className="mt-2 flex items-center gap-2">
            <input
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              className="flex-1 bg-neutral-900 border border-neutral-700 rounded-full px-3 py-1 text-sm"
            />
            <button
              onClick={() => handleUpdateComment(comment._id)}
              className="text-green-400"
            >
              <IoSend size={18} />
            </button>
            {/* edit-comment cancel */}
            <button
              onClick={() => setEditingId(null)}
              className="text-neutral-400"
            >
              <IoClose size={18} />
            </button>
          </div>
        ) : (
          <p className="text-sm text-neutral-300 mt-1">{comment.comment}</p>
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
  );
}

export default commentCard;
