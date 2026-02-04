import { IoMic } from "react-icons/io5";

export default function VoiceButton() {
  return (
    <button
      aria-label="Search with voice"
      className="
        flex items-center justify-center
        w-10 h-10
        rounded-full
        bg-neutral-800
        transition
        focus:outline-none hover-eff
      "
    >
      <IoMic size={18} />
    </button>
  );
}
