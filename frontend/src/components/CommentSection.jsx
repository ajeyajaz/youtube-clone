const dummyComments = [
  { id: 1, user: "Ajay", text: "Great video 🔥" },
  { id: 2, user: "Rahul", text: "Very helpful, thanks!" },
  { id: 3, user: "Sneha", text: "Waiting for next part 👀" },
];

function CommentSection() {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Comments</h2>

      {/* Add comment */}
      <input
        type="text"
        placeholder="Add a comment..."
        className="w-full bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 mb-4 outline-none"
      />

      {/* List */}
      <div className="space-y-4">
        {dummyComments.map((c) => (
          <div key={c.id} className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-neutral-700 flex items-center justify-center">
              {c.user[0]}
            </div>
            <div>
              <p className="text-sm font-medium">{c.user}</p>
              <p className="text-sm text-neutral-300">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
