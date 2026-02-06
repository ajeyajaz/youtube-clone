import { HiOutlineUserCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";

function SignInButton() {
  return (
    <Link
      to="/users/login"
      className="
        hidden items-center gap-2
        px-4 h-9
        rounded-full
        border border-neutral-700
        text-sm font-medium
        hover-eff
        transition-colors   
        md:flex
      "
    >
      <HiOutlineUserCircle className="w-5 h-5" />
      <span>Sign in</span>
    </Link>
  );
}

export default SignInButton;
