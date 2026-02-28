import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AdminMenuList = () => {
  const { api } = useContext(AppContext);

  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMenus, setShowMenus] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  /* ================= FETCH MENUS ================= */
  const fetchMenus = async () => {
    try {
      const { data } = await api.get("/menu/all");
      setMenus(data.menuItems || []);
    } catch {
      toast.error("Failed to load menus");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  /* ================= DELETE MENU ================= */
  const deleteHandler = async (id) => {
    if (!confirm("Delete menu item?")) return;

    try {
      await api.delete(`/menu/${id}`);
      toast.success("Menu deleted");
      fetchMenus();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  /* ================= CATEGORY LIST ================= */
  const categories = [
    "all",
    ...new Set(menus.map((m) => m.category?.name).filter(Boolean)),
  ];

  /* ================= FILTERED MENUS ================= */
  const filteredMenus =
    activeCategory === "all"
      ? menus
      : menus.filter((m) => m.category?.name === activeCategory);

  return (
    <div className="mb-6">
      {/* TOGGLE BUTTON */}
      <button
        onClick={() => setShowMenus(!showMenus)}
        className="mb-4 bg-gradient-to-r from-green-500 via-orange-500 to-red-500
        text-white px-6 py-2 rounded-lg shadow hover:opacity-90 transition"
      >
        {showMenus ? "Hide Menu Items ✖" : "Show Menu Items ➕"}
      </button>

      {/* MENU SECTION */}
      {showMenus && (
        <div className="bg-white rounded-xl shadow border p-4">

          {/* CATEGORY FILTER */}
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition
                  ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-green-500 to-orange-500 text-white shadow"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* MENU TABLE */}
          {loading ? (
            <p className="text-gray-500">Loading menus...</p>
          ) : filteredMenus.length === 0 ? (
            <p className="text-gray-500">No items in this category.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-3">Item</th>
                    <th className="p-3 text-center">Offer Price</th>
                    <th className="p-3 text-center">Actual Price</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredMenus.map((m) => (
                    <tr
                      key={m._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      {/* ITEM */}
                      <td className="p-3 flex items-center gap-3">
                        {m.image && (
                          <img
                            src={m.image}
                            alt={m.name}
                            className="w-12 h-12 rounded object-cover border"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-gray-800">
                            {m.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {m.category?.name}
                          </p>
                        </div>
                      </td>

                      {/* OFFER PRICE */}
                      <td className="p-3 text-center text-green-600 font-semibold">
                        ₹{m.offerPrice || "-"}
                      </td>

                      {/* ACTUAL PRICE */}
                      <td className="p-3 text-center line-through text-gray-400">
                        ₹{m.actualPrice || "-"}
                      </td>

                      {/* DELETE */}
                      <td className="p-3 text-center">
                        <button
                          onClick={() => deleteHandler(m._id)}
                          className="text-red-600 hover:text-red-800
                          border border-red-200 px-3 py-1 rounded text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminMenuList;
