import { GoPlus } from "react-icons/go";

export default function CreateButton() {
  return (
    <button
      className="
        hidden
        items-center gap-2
        px-4 h-9
        rounded-full
        bg-neutral-800 text-white text-sm font-medium
        hover-eff
        transition
        md:flex
      "
    >
      <GoPlus size={18} />
      <span className="hidden font-semibold text-sm sm:inline">Create</span>
    </button>
  );
}
