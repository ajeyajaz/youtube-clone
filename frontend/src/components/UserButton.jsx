export default function UserButton() {
  return (
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
        src="https://i.pravatar.cc/150?img=12"
        alt="User avatar"
        className="w-full h-full object-cover"
      />
    </button>
  );
}
