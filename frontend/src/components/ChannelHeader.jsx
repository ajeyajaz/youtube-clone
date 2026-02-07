import { HiCheckBadge } from "react-icons/hi2";
import { useSelector } from "react-redux";

function ChannelHeader({channel}) {


  const { user } = useSelector((state) => state.auth);
  

  return (
    <section className="w-full">
      {/* Banner */}
      <div className="w-full h-40 md:h-56 bg-neutral-800 overflow-hidden">
        <img
          src={
            channel?.coverImg?.url ||
            'https://placehold.co/1600x400/111827/ffffff?text=Channel+Cover'
          }
          alt="channel banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Channel Info */}
      <div className="px-6 py-4 flex flex-col md:flex-row gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src="https://ui-avatars.com/api/?name=IS&size=160&background=0284c7&color=fff"
            alt="channel avatar"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full"
          />
        </div>

        {/* Details */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-semibold">
              {channel.name}
            </h1>
            <HiCheckBadge className="text-blue-500 w-5 h-5" />
          </div>

          <p className="text-sm text-gray-400">
            {channel.handle} · {channel.subscribers} subscribers
          </p>

          {/* <p className="text-sm text-gray-300 max-w-xl">
            Welcome to the official YouTube channel of Internshala…
            <span className="text-blue-500 cursor-pointer"> more</span>
          </p> */}

          {user?._id !== channel?.owner ? (
            <div className="flex items-center gap-4 pt-2">
              <button className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-200">
                Subscribe
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 border-b border-neutral-800">
        <ul className="flex gap-6 text-sm text-gray-400">
          {["Home", "Videos", "Shorts", "Live", "Playlists", "Community"].map(
            (tab) => (
              <li
                key={tab}
                className="pb-3 cursor-pointer hover:text-white border-b-2 border-transparent hover:border-white"
              >
                {tab}
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}

export default ChannelHeader;
