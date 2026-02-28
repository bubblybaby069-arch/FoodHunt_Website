import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import AdminPanel from "./pages/AdminPanel";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";


// ✅ Import Toaster
import { Toaster } from "react-hot-toast";

function App() {
  return (

    <>
      {/* Navbar */}
      <Navbar />

      {/* Toast notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/my-orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />

        <Route
          path="/order-success/:orderId"
          element={<OrderSuccess />}
        />


        {/* Protected pages */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute admin={true}>
              <AdminPanel />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
