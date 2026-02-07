
function UserProfile() {
  return (
    <section className="w-full px-6 py-6">
      <div className="flex items-center gap-6">
        
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center text-white text-4xl font-semibold">
          I
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Creator</h1>
          <p className="text-sm text-gray-400">Creator12739</p>

          <p className="text-sm text-gray-400">
            More about this channel...
            <span className="text-gray-300 cursor-pointer hover:underline">
              more
            </span>
          </p>

          {/* Actions */}
          <div className="flex gap-3 mt-3">
            <button className="px-4 py-2 rounded-full bg-neutral-800 text-sm hover:bg-neutral-700">
              Customize channel
            </button>

            <button className="px-4 py-2 rounded-full bg-neutral-800 text-sm hover:bg-neutral-700">
              Manage videos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
