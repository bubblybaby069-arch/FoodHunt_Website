import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast, { Toaster } from "react-hot-toast";

import AdminAddCategory from "../components/AdminAddCategory";
import AdminAddMenu from "../components/AdminAddMenu";
import AdminMenuList from "../components/AdminMenuList";
import AdminCategoryList from "../components/AdminCategoryList";
import AdminOrders from "../components/AdminOrders";

const AdminPanel = () => {
  const { api } = useContext(AppContext);

  const [categories, setCategories] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  // 🔹 CONTROL WHICH SECTION IS OPEN
  const [activeSection, setActiveSection] = useState("categories");

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/category/all");
      setCategories(data.categories);
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  const refreshMenus = () => setRefreshFlag((prev) => !prev);

  useEffect(() => {
    fetchCategories();
  }, []);

  // 🔹 BUTTON STYLE
  const tabBtn = (section) =>
    `px-5 py-2 rounded-lg font-semibold transition
     ${
       activeSection === section
         ? "bg-green-600 text-white"
         : "bg-white text-gray-700 border hover:bg-gray-100"
     }`;

  return (
    <div className="min-h-screen pt-24 px-6 bg-gray-50">
      <Toaster position="top-right" />

      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Admin Dashboard
      </h2>

      {/* ================= NAV BUTTONS ================= */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <button
          onClick={() => setActiveSection("categories")}
          className={tabBtn("categories")}
        >
          📁 Categories
        </button>

        <button
          onClick={() => setActiveSection("menus")}
          className={tabBtn("menus")}
        >
          🍔 Menu Items
        </button>

        <button
          onClick={() => setActiveSection("orders")}
          className={tabBtn("orders")}
        >
          📦 Orders
        </button>
      </div>

      {/* ================= CATEGORY SECTION ================= */}
      {activeSection === "categories" && (
        <>
          <AdminAddCategory refreshCategories={fetchCategories} />
          <AdminCategoryList
            categories={categories}
            refreshCategories={fetchCategories}
          />
        </>
      )}

      {/* ================= MENU SECTION ================= */}
      {activeSection === "menus" && (
        <>
          <AdminAddMenu
            categories={categories}
            refreshMenus={refreshMenus}
          />
          <AdminMenuList refreshFlag={refreshFlag} />
        </>
      )}

      {/* ================= ORDERS SECTION ================= */}
      {activeSection === "orders" && <AdminOrders />}
    </div>
  );
};

export default AdminPanel;
