import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../utils/axios";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");

  // 🔥 CONFIRM STRIPE PAYMENT
  useEffect(() => {
    const confirmPayment = async () => {
      if (!sessionId) return;

      try {
        await api.post("/payment/confirm-payment", {
          session_id: sessionId,
        });

        toast.success("Payment successful! Order placed.");
      } catch (err) {
        toast.error("Payment verification failed");
      }
    };

    confirmPayment();
  }, [sessionId]);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/order/my-orders");
      setOrders(data.orders || []);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  if (loading) {
    return <p className="text-center mt-24">Loading orders...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-24 px-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-xl shadow"
            >
              {/* ORDER HEADER */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold">
                    Order ID: <span className="text-gray-500">{order._id}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                  {order.orderStatus || "Placed"}
                </span>
              </div>

              {/* ORDER ITEMS */}
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">
                        {item.menuItem?.name || "Item removed"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₹{(item.menuItem?.offerPrice || 0) * (item.quantity || 0)}
                    </p>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="flex justify-between mt-4 font-bold">
                <span>Total Amount</span>
                <span>₹{order.totalAmount}</span>
              </div>

              {/* PAYMENT */}
              <p className="mt-2 text-sm text-gray-600">
                Payment Method:{" "}
                <span className="font-medium">{order.paymentMethod}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
