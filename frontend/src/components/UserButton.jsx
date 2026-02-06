import { useSelector } from "react-redux";
import SignInButton from "./SignInButton";

export default function UserButton() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <>
      {isAuthenticated ? (
        <button
          aria-label="User menu"
          className="
        w-9 h-9
        rounded-full
        overflow-hidden
        border border-neutral-700
        hover-eff
        transition
      "
        >
          <img
            src={user?.avatar?.url || `https://ui-avatars.com/api/?name=${user?.userName}&size=128&background=0f0f0f&color=ffffff`}
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </button> 
      ) : <SignInButton/>}
    </>
  );
}
