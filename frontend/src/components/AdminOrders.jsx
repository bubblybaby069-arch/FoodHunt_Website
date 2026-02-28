import { useEffect, useState } from "react";
import api from "../utils/axios";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/order/admin/all");
      setOrders(data.orders || []);
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/order/admin/${id}`, { status });
      toast.success(`Order ${status}`);
      fetchOrders();
    } catch (error) {
      toast.error("Status update failed");
      console.error(error);
    }
  };

  /* ================= STATUS COLOR ================= */
  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Accepted":
        return "bg-blue-100 text-blue-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Delivered":
      case "CONFIRMED":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="mt-10 max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">All Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="p-3">Name & Address</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Order ID</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  {/* NAME & ADDRESS */}
                  <td className="p-3">
                    <p className="font-semibold">{order.address?.name}</p>
                    <p className="text-gray-500 text-xs">
                      {order.address?.houseName},{" "}
                      {order.address?.location},{" "}
                      {order.address?.state} - {order.address?.pincode}
                    </p>
                    <p className="text-xs">📞 {order.address?.phone}</p>
                  </td>

                  {/* ITEMS */}
                  <td className="p-3">
                    {order.items.map((i, idx) => (
                      <p key={idx}>
                        {i.menuItem?.name || "Item removed"} × {i.quantity}
                      </p>
                    ))}
                  </td>

                  {/* TOTAL */}
                  <td className="p-3 font-semibold">
                    ₹{order.totalAmount}
                  </td>

                  {/* PAYMENT */}
                  <td className="p-3">
                    <span
                      className={`font-semibold ${
                        order.paymentMethod === "ONLINE"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {order.paymentMethod}
                    </span>
                  </td>

                  {/* ORDER ID */}
                  <td className="p-3 text-xs text-gray-600">
                    #{order._id.slice(-6)}
                  </td>

                  {/* STATUS */}
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="p-3 space-x-2">
                    {order.orderStatus === "Pending" && (
                      <>
                        <button
                          onClick={() =>
                            updateStatus(order._id, "Accepted")
                          }
                          className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            updateStatus(order._id, "Rejected")
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {(order.orderStatus === "Accepted" ||
                      order.orderStatus === "CONFIRMED") && (
                      <button
                        onClick={() =>
                          updateStatus(order._id, "Delivered")
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
