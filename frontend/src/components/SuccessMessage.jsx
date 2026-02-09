import { useEffect } from "react";

function SuccessMessage({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      className="
        fixed top-5 z-100
        w-max max-w-250
        rounded-lg 
        bg-green-500 px-4 py-3
        shadow-lg
      "
    >
      <p className="text-sm text-white text-center truncate">{message}</p>
    </div>
  );
}

export default SuccessMessage;
