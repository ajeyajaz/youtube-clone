import { useState } from "react";

function VideoDescription({ video }) {
  const [expanded, setExpanded] = useState(false);

  const MAX_CHARS = 180;
  const isLong = video.description.length > MAX_CHARS;

  const text = expanded
    ? video.description
    : video.description.slice(0, MAX_CHARS);

  const publishedDate = new Date(video.createdAt).toLocaleDateString(
    undefined,
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <section className="mt-4 rounded-xl bg-neutral-900 p-4 text-sm">
      {/* Meta */}
      <div className="mb-2 flex gap-4 font-medium text-white">
        <span>{video.views.toLocaleString()} views</span>
        <span className="text-gray-400">{publishedDate}</span>
      </div>

      {/* Description */}
      <pre
        className={`whitespace-pre-wrap text-gray-200 ${
          !expanded ? "line-clamp-4" : ""
        }`}
      >
        {text}
        {!expanded && isLong && "…"}
      </pre>

      {/* Toggle */}
      {isLong && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-sm font-semibold text-white hover:underline"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </section>
  );
}

export default VideoDescription;
