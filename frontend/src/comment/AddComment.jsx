import { IoSend } from "react-icons/io5";

function AddComment({ newComment, setNewComment, handlePostComment, posting, isAuthenticated }) {

  const disableSubmit  = posting || !isAuthenticated;
  

  console.log('disable:', disableSubmit);

  return (
    <div className="flex items-center gap-3 mb-6">
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        className={`
                      flex-1 bg-neutral-900 border
                      border-neutral-800 rounded-full
                      px-4 py-2 outline-none
                      ${posting ? "opacity-30" : ""}
                      `}
      />
      <button
        onClick={handlePostComment}
        disabled={disableSubmit}
        className={`p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 ${disableSubmit ? 'opacity-40' : ''}`}
      >
        <IoSend size={20} />
      </button>
    </div>
  );
}

export default AddComment;
