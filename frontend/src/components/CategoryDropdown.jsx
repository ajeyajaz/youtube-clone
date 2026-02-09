// src/components/CategoryDropdown.jsx
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

function CategoryDropdown({ ...rest }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await apiClient.get("/categories");
        setCategories(data);
      } catch (ex) {
        console.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full">
      <label className="block text-sm text-neutral-400 mb-1">
        Category
      </label>

      <select
        {...rest}
        disabled={loading}
        className="w-full  border border-neutral-800 rounded px-3 py-2 outline-none focus:border-neutral-600 disabled:opacity-50"
      >
        <option value="">
          {loading ? "Loading categories..." : "Select a category"}
        </option>

        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryDropdown;
