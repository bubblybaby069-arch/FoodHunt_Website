import { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AdminAddMenu = ({ categories = [], refreshMenus }) => {
  const { api } = useContext(AppContext);
  const fileRef = useRef(null);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    actualPrice: "",
    offerPrice: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });
      if (file) setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const { name, offerPrice, actualPrice, category, image } = formData;
    if (!name || !offerPrice || !actualPrice || !category || !image) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        payload.append(key, value)
      );

      const { data } = await api.post("/menu/add", payload);

      if (data.success) {
        toast.success("Menu item added");
        setFormData({
          name: "",
          description: "",
          actualPrice: "",
          offerPrice: "",
          category: "",
          image: null,
        });
        setPreview(null);
        fileRef.current.value = "";
        refreshMenus?.();
        setShowForm(false);
      }
    } catch {
      toast.error("Failed to add menu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      {/* ADD BUTTON */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-gradient-to-r from-green-500 via-orange-500 to-red-500
        text-white px-6 py-2 rounded-lg shadow hover:opacity-90 transition"
      >
        {showForm ? "Back.." : "Add Menu Item ➕"}
      </button>

      {/* FORM */}
      {showForm && (
        <form
          onSubmit={submitHandler}
          className="bg-white p-6 rounded-xl shadow-lg border"
        >
          <h3 className="font-bold text-lg mb-4">Add New Menu</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Menu name"
              className="border p-2 rounded"
            />

            <input
              name="actualPrice"
              type="number"
              value={formData.actualPrice}
              onChange={handleChange}
              placeholder="Actual Price"
              className="border p-2 rounded"
            />

            <input
              name="offerPrice"
              type="number"
              value={formData.offerPrice}
              onChange={handleChange}
              placeholder="Offer Price"
              className="border p-2 rounded"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="border p-2 rounded md:col-span-2"
            />

            <input
              ref={fileRef}
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="border p-2 rounded md:col-span-2"
            />
          </div>

          {/* IMAGE PREVIEW */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-32 h-32 object-cover rounded border"
            />
          )}

          <button
            disabled={loading}
            className="mt-5 bg-black text-white px-6 py-2 rounded disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Menu"}
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminAddMenu;
