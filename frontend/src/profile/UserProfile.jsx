import { useSelector } from "react-redux";
import CircleImage from "../components/CircleImage";

function UserProfile() {
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="w-full px-6 py-6">
      <div className="flex flex-col items-center gap-6">
        {/* Avatar */}
        <CircleImage
          src={user.avatar?.url || "https://www.gravatar.com/avatar/?d=mp"}
          w={20}
          h={20}
        />

        {/* Info */}
        <div className="flex flex-col gap-1 items-center">
          <h1 className="text-2xl font-bold truncate max-w-60">{user.userName}</h1>

          {/* Actions */}
          <div className="flex gap-3 mt-3">
            <button className="px-4 py-2  border rounded-xl border-neutral-700  text-sm font-medium  hover-eff transition-colors">
              Create channel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
