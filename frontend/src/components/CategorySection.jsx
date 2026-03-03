import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const CategorySection = ({ selectedCategory, setSelectedCategory }) => {
  const { api } = useContext(AppContext);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const VISIBLE_COUNT = 8;

  // ================= FETCH CATEGORIES =================
  const fetchCategories = async () => {
    try {
      const { data } = await api.get("api/category/all");
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE CATEGORY (OPTIONAL ADMIN) =================
  const handleDelete = async (id) => {
    if (!id) return;
    try {
      await api.delete(`/category/${id}`);
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const visibleCategories = showAll
    ? categories
    : categories.slice(0, VISIBLE_COUNT);

  // ================= LOADING STATE =================
  if (loading) {
    return (
      <section className="mb-16 px-6 py-14 rounded-3xl bg-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-44 rounded-2xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      className="mb-0 px-10 py-17 rounded-1xl
      bg-gradient-to-br from-green-100 via-orange-100 to-red-100"
    >
      <h2 className="text-3xl font-extrabold text-center mb-10 text-gray-800">
        OUR Categories 🍽️
      </h2>

      {/* ================= 2 ROW × 4 COLUMN GRID ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {visibleCategories.map((cat) => (
          <div
            key={cat._id}
            onClick={() => setSelectedCategory(cat._id)}
            className={`relative cursor-pointer h-44 rounded-2xl overflow-hidden
              transition-all duration-300 group
              ${
                selectedCategory === cat._id
                  ? "ring-4 ring-orange-400"
                  : ""
              }`}
          >
            {/* FULL IMAGE */}
            <img
              src={cat.image}
              alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover
                transition-transform duration-500 group-hover:scale-110"
            />

            {/* OVERLAY */}
            <div
              className={`absolute inset-0 transition-all duration-300
              ${
                selectedCategory === cat._id
                  ? "bg-black/50"
                  : "bg-black/30 group-hover:bg-gradient-to-br group-hover:from-green-500/70 group-hover:via-orange-500/70 group-hover:to-red-500/70"
              }`}
            />

            {/* TEXT CONTENT */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-3">
              <h3 className="text-white font-bold text-lg drop-shadow">
                {cat.name}
              </h3>

              {cat.description && (
                <p className="text-xs text-white/90 mt-1 line-clamp-2">
                  {cat.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ================= SHOW MORE / LESS ================= */}
      {categories.length > VISIBLE_COUNT && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-3 rounded-full font-semibold text-white
              bg-gradient-to-r from-green-500 via-orange-500 to-red-500
              shadow-lg hover:opacity-90 transition"
          >
            {showAll ? "Show Less ↑" : "Show More ↓"}
          </button>
        </div>
      )}
    </section>
  );
};

export default CategorySection;
