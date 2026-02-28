import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const foundOrder = orders.find(
      (o) => o.orderId.toString() === orderId
    );

    if (!foundOrder) {
      navigate("/");
      return;
    }

    setOrder(foundOrder);
  }, [orderId, navigate]);

  if (!order) return null;

  return (
    <div className="pt-32 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-green-600 mb-4">
        Order Placed Successfully 🎉
      </h2>

      <p className="text-gray-600 mb-6">
        Order ID: <b>#{order.orderId}</b>
      </p>

      {/* ITEMS */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-lg mb-3">Items</h3>

        {order.items.map((item) => {
          const discountedPrice = item.offer
            ? item.price -
              (item.price * item.offer) / 100
            : item.price;

          return (
            <div
              key={item._id}
              className="flex justify-between mb-2"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                ₹{discountedPrice * item.quantity}
              </span>
            </div>
          );
        })}
      </div>

      {/* PRICE */}
      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <div className="flex justify-between">
          <span>Actual Price</span>
          <span>₹{order.actualTotal}</span>
        </div>
        <div className="flex justify-between text-red-500">
          <span>Discount</span>
          <span>- ₹{order.discountTotal}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Total Paid</span>
          <span>₹{order.finalTotal}</span>
        </div>
      </div>

      {/* ADDRESS */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-lg mb-2">
          Delivery Address
        </h3>
        <p>
          {order.address.name}, {order.address.houseName},{" "}
          {order.address.doorNo}
        </p>
        <p>
          {order.address.location},{" "}
          {order.address.district},{" "}
          {order.address.state} –{" "}
          {order.address.pincode}
        </p>
      </div>

      {/* PAYMENT */}
      <div className="bg-white shadow rounded-lg p-4">
        <p>
          <b>Payment Method:</b> {order.paymentMethod}
        </p>
        <p>
          <b>Status:</b>{" "}
          <span className="text-green-600">
            {order.status}
          </span>
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Ordered on:{" "}
          {new Date(order.orderDate).toLocaleString()}
        </p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-8 bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-lg font-semibold"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSuccess;
