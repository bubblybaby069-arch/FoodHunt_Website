import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AdminCategoryList = ({ categories, refreshCategories }) => {
  const { api } = useContext(AppContext);
  const [showList, setShowList] = useState(false);

  const deleteHandler = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await api.delete(`/category/${id}`);
      toast.success("Category deleted successfully!");
      refreshCategories();
    } catch (err) {
      console.log(err.response?.data);
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="border p-6 rounded-xl mb-6 bg-white shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-gray-800">
          Category Management
        </h3>

        <button
          onClick={() => setShowList(!showList)}
          className="px-4 py-2 rounded-full text-sm font-semibold text-white
          bg-gradient-to-r from-green-500 via-orange-500 to-red-500
          hover:opacity-90 transition"
        >
          {showList ? "Hide Categories ▲" : "View Categories ▼"}
        </button>
      </div>

      {/* Category List (Hidden by default) */}
      {showList && (
        <>
          {categories.length === 0 ? (
            <p className="text-gray-500 mt-4">
              No categories added yet.
            </p>
          ) : (
            <ul className="space-y-4 mt-4">
              {categories.map((cat) => (
                <li
                  key={cat._id}
                  className="flex items-center justify-between gap-4
                  border rounded-lg p-4 hover:shadow-sm transition"
                >
                  {/* Left side */}
                  <div className="flex items-center gap-4">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-14 h-14 rounded-lg object-cover border"
                    />

                    <div>
                      <p className="font-semibold text-gray-800">
                        {cat.name}
                      </p>
                      {cat.description && (
                        <p className="text-sm text-gray-500">
                          {cat.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right side */}
                  <button
                    onClick={() => deleteHandler(cat._id)}
                    className="px-4 py-2 rounded-full text-sm font-semibold
                    text-red-600 border border-red-200
                    hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default AdminCategoryList;
