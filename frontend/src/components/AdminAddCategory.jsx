import { useContext, useState, useRef } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AdminAddCategory = ({ refreshCategories }) => {
  const { api } = useContext(AppContext);
  const fileRef = useRef(null);

  // NEW: toggle state
  const [showForm, setShowForm] = useState(false);

  // ORIGINAL STATE
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // ORIGINAL handleChange
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // ORIGINAL submitHandler
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.image) {
      toast.error("Name and image are required");
      return;
    }

    setLoading(true);

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("description", formData.description);
      payload.append("image", formData.image);

      const { data } = await api.post("/category/add", payload, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (data.success) {
        toast.success("Category added successfully!");
        setSuccess("Category added successfully!");

        setFormData({ name: "", description: "", image: null });
        refreshCategories();

        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      console.error(err.response?.data);
      toast.error(err.response?.data?.message || "Error adding category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 max-w-lg mx-auto">
      {/* NEW: Toggle button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 w-full bg-gradient-to-r from-green-500 via-orange-500 to-red-500
        text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition"
      >
        {showForm ? "Close Form ✖" : "Add New Category ➕"}
      </button>

      {/* ORIGINAL FORM: wrapped in conditional */}
      {showForm && (
        <form
          onSubmit={submitHandler}
          className="border p-4 rounded mb-6 bg-white shadow-sm"
        >
          <h3 className="font-bold mb-4 text-gray-800">Add Category</h3>

          <div className="space-y-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Category name"
              className="border p-2 w-full rounded"
              required
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Category description (optional)"
              className="border p-2 w-full rounded"
              rows={3}
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
              ref={fileRef}
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Category"}
            </button>
          </div>

          {success && <p className="text-green-600 mt-3">{success}</p>}
        </form>
      )}
    </div>
  );
};

export default AdminAddCategory;
