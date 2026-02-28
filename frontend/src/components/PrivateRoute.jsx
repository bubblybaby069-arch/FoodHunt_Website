import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, admin }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Admin-only route protection
  if (admin && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ Allow access
  return children;
};

export default PrivateRoute;
