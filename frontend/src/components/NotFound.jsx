import { Link } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";

function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-4">
      <div className="max-w-md text-center space-y-5">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-neutral-800 flex items-center justify-center">
            <MdErrorOutline size={42} className="text-red-500" />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-3xl font-bold">404 - Page not found</h1>
        <p className="text-neutral-400 text-sm">
          The page you're looking for doesn't exist or was moved.
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-3 pt-2">
          <Link
            to="/"
            className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-200 transition"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-5 py-2 rounded-full border border-neutral-700 text-sm hover:bg-neutral-800 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
