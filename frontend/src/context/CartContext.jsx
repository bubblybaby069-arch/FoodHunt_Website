import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../utils/axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH CART ================= */
  const fetchCart = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/cart");
      setCartItems(data?.cart?.items || []);
    } catch (error) {
      console.error("Cart fetch failed:", error);
      toast.success("welcome to foodHunt");
    } finally {
      setLoading(false);
    }
  };

  /* ================= ADD TO CART ================= */
  const addToCart = async (menuItemId, quantity = 1) => {
    try {
      await api.post("/cart/add", { menuItemId, quantity });
      toast.success("Item added to cart 🛒");
      fetchCart();
    } catch (error) {
      console.error(error);
      toast.error("please login..!");
    }
  };

  /* ================= UPDATE QUANTITY ================= */
  const updateQty = async (menuItemId, quantity) => {
    if (quantity < 1) return;
    try {
      await api.put("/cart/update", { menuItemId, quantity });
      fetchCart();
    } catch (error) {
      console.error(error);
      toast.error("Quantity update failed");
    }
  };

  /* ================= REMOVE ITEM ================= */
  const removeItem = async (menuItemId) => {
    try {
      await api.delete(`/cart/remove/${menuItemId}`);
      toast.success("Item removed");
      fetchCart();
    } catch (error) {
      console.error(error);
      toast.error("Remove failed");
    }
  };

  /* ================= CLEAR CART (🔥 MISSING PART) ================= */
  const clearCart = async () => {
    try {
      await api.delete("/cart/clear");
      setCartItems([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to clear cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        updateQty,
        removeItem,
        clearCart, // ✅ NOW AVAILABLE
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
