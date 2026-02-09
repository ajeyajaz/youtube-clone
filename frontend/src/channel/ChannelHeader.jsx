import { HiCheckBadge } from "react-icons/hi2";
import { useSelector } from "react-redux";

function ChannelHeader({ channel }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="w-full">
      {/* ===== Banner ===== */}
      <div className="relative w-full h-44 md:h-60 rounded-xl overflow-hidden">
        <img
          src={
            channel?.coverImg?.url ||
            "https://placehold.co/1600x400/111827/ffffff?text=Channel+Cover"
          }
          alt="channel banner"
          className="w-full h-full object-cover"
        />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* ===== Channel Info ===== */}
      <div className="relative px-6">
        {/* Avatar */}
        <div className="-mt-14 md:-mt-18 w-fit">
          <img
            src={
              user?.avatar?.url ||
              `https://ui-avatars.com/api/?name=${user?.userName}&size=160&background=0284c7&color=fff`
            }
            alt="channel avatar"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-neutral-900 shadow-lg"
          />
        </div>

        {/* Details */}
        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-semibold">
                {channel?.name}
              </h1>
              <HiCheckBadge className="text-blue-500 w-5 h-5" />
            </div>

            <p className="text-sm text-neutral-400">
              @{channel?.handle} · {channel?.subscribers} subscribers ·{" "}
              {channel?.videosCount || 0} videos
            </p>

            {/* static about */}
            <p className="text-sm text-neutral-300 max-w-xl">
              Welcome to the official channel 🚀 Tutorials, tech, and real-world
              projects. New videos every week.
            </p>
          </div>

          {/* Actions */}
          {user?._id !== channel?.owner && (
            <div className="flex items-center gap-3">
              <button className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-200">
                Subscribe
              </button>
              <button className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700">
                <HiOutlineBell size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

          {/* Tabs */}
      <div className="mt-6 px-6 border-b border-neutral-800">
        <ul className="flex gap-8 text-sm text-neutral-400">
          {["Home", "Videos", "About"].map((tab, i) => (
            <li
              key={tab}
              className={`pb-3 cursor-pointer transition ${
                i === 0
                  ? "text-white border-b-2 border-white"
                  : "hover:text-white border-b-2 border-transparent hover:border-neutral-500"
              }`}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ChannelHeader;
