import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import api from "../utils/axios";
import toast from "react-hot-toast";

const Cart = () => {
  const { cartItems, loading, updateQty, removeItem, clearCart } =
    useContext(CartContext);

  const navigate = useNavigate();

  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [processing, setProcessing] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    houseName: "",
    state: "",
    pincode: "",
  });

  if (loading) {
    return <p className="text-center mt-24">Loading cart...</p>;
  }

  /* ================= PRICE ================= */
  const subtotal = cartItems.reduce(
    (sum, i) => sum + i.menuItem.actualPrice * i.quantity,
    0
  );

  const total = cartItems.reduce(
    (sum, i) => sum + i.menuItem.offerPrice * i.quantity,
    0
  );

  const savings = subtotal - total;

  /* ================= CHECKOUT ================= */
  const handleCheckout = async () => {
    if (!address.name || !address.phone || !address.pincode) {
      toast.error("Please fill required address fields");
      return;
    }

    if (!paymentMethod) {
      toast.error("Select payment method");
      return;
    }

    try {
      setProcessing(true);

      /* ================= COD ================= */
      if (paymentMethod === "COD") {
        const items = cartItems.map((i) => ({
          menuItem: i.menuItem._id,
          quantity: i.quantity,
          price: i.menuItem.offerPrice,
        }));

        await api.post("/order/create", {
          items,
          address,
          paymentMethod: "COD",
          paymentStatus: "PENDING",
        });

        clearCart();
        toast.success("Order placed successfully!");
        navigate("/order/my-orders");
        return;
      }

      /* ================= ONLINE PAYMENT ================= */
      const { data } = await api.post(
        "/payment/create-checkout-session",
        {
          cartItems,
          address,
        }
      );

      clearCart(); // clear immediately (UX)
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-24 px-4 grid lg:grid-cols-3 gap-8">
      {/* ================= CART ITEMS ================= */}
      <div className="lg:col-span-2">
        <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

        {cartItems.length === 0 && (
          <p className="text-gray-500">Your cart is empty</p>
        )}

        {cartItems.map((item) => (
          <div
            key={item.menuItem._id}
            className="flex gap-5 bg-white p-5 mb-4 rounded-2xl shadow"
          >
            <img
              src={item.menuItem.image}
              alt={item.menuItem.name}
              className="w-32 h-32 object-cover rounded-xl"
            />

            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                {item.menuItem.name}
              </h3>

              <div className="flex gap-2 mt-1 items-center">
                <span className="text-green-600 font-bold">
                  ₹{item.menuItem.offerPrice}
                </span>
                <span className="line-through text-gray-400 text-sm">
                  ₹{item.menuItem.actualPrice}
                </span>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() =>
                    updateQty(item.menuItem._id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                  className="px-3 py-1 bg-gray-200 rounded-lg"
                >
                  −
                </button>

                <span className="font-semibold">{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQty(item.menuItem._id, item.quantity + 1)
                  }
                  className="px-3 py-1 bg-gray-200 rounded-lg"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-lg">
                ₹{item.menuItem.offerPrice * item.quantity}
              </p>
              <button
                onClick={() => removeItem(item.menuItem._id)}
                className="text-red-500 text-sm mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= SUMMARY ================= */}
      {cartItems.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow h-fit">
          <h3 className="text-xl font-bold mb-4">Price Summary</h3>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between mb-2 text-green-600">
            <span>You Save</span>
            <span>- ₹{savings}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          {!showCheckout && (
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full mt-6 bg-green-600 hover:bg-green-700
              text-white py-3 rounded-xl font-semibold"
            >
              Proceed to Checkout
            </button>
          )}

          {showCheckout && (
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold">Delivery Address</h4>

              {["name", "phone", "houseName", "state", "pincode"].map(
                (field) => (
                  <input
                    key={field}
                    placeholder={field.toUpperCase()}
                    className="w-full p-2 border rounded-lg"
                    value={address[field]}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        [field]: e.target.value,
                      })
                    }
                  />
                )
              )}

              <h4 className="font-semibold mt-4">Payment Method</h4>

              <div className="flex gap-6">
                <label className="flex gap-2 items-center">
                  <input
                    type="radio"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />
                  Cash on Delivery
                </label>

                <label className="flex gap-2 items-center">
                  <input
                    type="radio"
                    value="ONLINE"
                    checked={paymentMethod === "ONLINE"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />
                  Online Payment
                </label>
              </div>

              <button
                onClick={handleCheckout}
                disabled={processing}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700
                text-white py-3 rounded-xl font-semibold"
              >
                {processing ? "Processing..." : "Place Order"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
