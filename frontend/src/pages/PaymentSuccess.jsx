import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const confirmOrder = async () => {
      try {
        // Get the Stripe session ID from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const session_id = urlParams.get("session_id");

        if (!session_id) {
          toast.error("Payment session not found");
          return navigate("/cart");
        }

        // Call backend to confirm payment and create order
        await api.post("/payment/confirm-payment", { session_id });

        toast.success("Payment successful! Order placed.");
        navigate("/orders"); // redirect to orders page
      } catch (err) {
        console.error("Confirm order error:", err.response?.data || err.message);
        toast.error("Order confirmation failed");
        navigate("/cart");
      } finally {
        setLoading(false);
      }
    };

    confirmOrder();
  }, [navigate]);

  if (loading) return <p className="text-center mt-20">Processing your order...</p>;

  return null;
};

export default PaymentSuccess;
