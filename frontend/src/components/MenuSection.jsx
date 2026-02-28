import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MenuSection = ({ selectedCategory }) => {
  const { api } = useContext(AppContext);
  const { addToCart } = useContext(CartContext);

  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const url = selectedCategory
        ? `/menu/all?category=${selectedCategory}`
        : "/menu/all";

      const { data } = await api.get(url);
      setMenus(data.menuItems || []);
    } catch {
      toast.error("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
    setShowAll(false); // reset when category changes
  }, [selectedCategory]);

  const visibleMenus = showAll ? menus : menus.slice(0, 6);

  return (
    <section
      id="menu"
      className="py-16 bg-gradient-to-br from-green-100 via-orange-100 to-green-50"
    >
      <h2 className="text-3xl font-extrabold text-center mb-12 text-gray-800">
        Our Menu
      </h2>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-80 bg-white/60 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : menus.length === 0 ? (
        <p className="text-center text-gray-500">
          No menu items available.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-8">
            {visibleMenus.map((item) => (
              <div
                key={item._id}
                className="bg-gradient-to-br from-green-200 via-orange-200 to-red-200 
rounded-4xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-500 text-center"

              >
                <div className="p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-45 object-cover rounded-2xl"
                  />
                </div>


                <div className="p-5">
                  <h3 className="text-xl font-semibold">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.category?.name}
                  </p>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-2xl font-bold text-green-600">
                      ₹{item.offerPrice}
                    </span>
                    <span className="line-through text-gray-400">
                      ₹{item.actualPrice}
                    </span>
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                      {Math.round(
                        ((item.actualPrice - item.offerPrice) /
                          item.actualPrice) *
                        100
                      )}
                      % OFF
                    </span>
                  </div>

                  {!item.isAvailable && (
                    <p className="text-red-500 text-sm mt-2">
                      Not Available
                    </p>
                  )}

                  <button
                    disabled={!item.isAvailable}
                    onClick={() => addToCart(item._id, 1)}
                    className={`w-50 mt-5 py-1 rounded-lg font-semibold transition ${item.isAvailable
                      ? "bg-gradient-to-r from-green-400 to-orange-400 hover:from-orange-400 hover:to-green-500 text-black"
                      : "bg-gray-300 cursor-not-allowed text-gray-600"
                      }`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SEE MORE BUTTON */}
          {menus.length > 6 && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-3 rounded-full font-semibold
                bg-gradient-to-r from-green-500 to-orange-500
                text-white shadow-lg hover:shadow-xl transition"
              >
                {showAll ? "Show Less" : "See More"}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default MenuSection;
