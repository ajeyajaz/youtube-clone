import { useState } from "react";

const categories = [
  "All",
  "Music",
  "News",
  "Jai Hanuman",
  "Mantras",
  "Irshad Kamil",
  "Live",
  "Mixes",
  "Arijit Singh",
  "Movie musicals",
  "Data Structures",
  "progamming",
  "Django",
  "Arijit Singh",
  "Movie musicals",
  "Data Structures",
  "progamming",
  "Django",
];

export default function CategoryList() {
  const [active, setActive] = useState("All");

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-3 px-4 py-2 min-w-max">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`
              px-4 py-1.5 rounded-lg text-sm whitespace-nowrap
              transition
              ${
                active === item
                  ? "bg-white text-black"
                  : "bg-neutral-800 text-white hover:bg-neutral-700"
              }
            `}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
