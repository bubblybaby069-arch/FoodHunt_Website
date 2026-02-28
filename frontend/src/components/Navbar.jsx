import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { CartContext } from "../context/CartContext";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const goAndScroll = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 px-6 md:px-20 lg:px-40 py-1 flex items-center justify-between shadow
                    bg-gradient-to-r from-black-400 via-green-100 to-orange-400 text-black">
      
      {/* LOGO */}
      <div className="h-16 flex items-center cursor-pointer" onClick={() => goAndScroll("hero")}>
        <img src={Logo} alt="FoodHunt Logo" className="h-50 w-auto" />
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-6">
        <button onClick={() => goAndScroll("hero")} className="hover:text-green-500 font-medium">
          Home
        </button>
        <button onClick={() => goAndScroll("menu")} className="hover:text-red-500 font-medium">
          Menu
        </button>
        {user && (
          <button onClick={() => navigate("/my-orders")} className="hover:text-yellow-500 font-semibold">
            My Orders
          </button>
        )}
        <input
  type="text"
  placeholder="Search ..."
  className="px-4 py-2 rounded-lg border border-gray-300 text-black placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-gray-500 transition-all duration-1000"
/>
      </div>

      {/* RIGHT SIDE (DESKTOP) */}
      <div className="hidden md:flex items-center gap-4">
        {user && (
          <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
        )}

        {user ? (
          <>
            <span className="text-black font-semibold">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-700 text-white px-4 py-1 rounded hover:bg-red-800"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-500"
          >
            Login
          </button>
        )}
      </div>

      {/* MOBILE MENU BUTTON */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-gradient-to-r from-green-500 via-orange-400 to-red-500 text-white flex flex-col items-center gap-4 py-6 md:hidden shadow-lg">
          <button onClick={() => { goAndScroll("hero"); setMobileMenuOpen(false); }} className="font-medium">
            Home
          </button>
          <button onClick={() => { goAndScroll("menu"); setMobileMenuOpen(false); }} className="font-medium">
            Menu
          </button>
          {user && (
            <button onClick={() => { navigate("/my-orders"); setMobileMenuOpen(false); }} className="font-semibold">
              My Orders
            </button>
          )}
          <input
            type="text"
            placeholder="Search ..."
            className="px-3 py-1 rounded border border-white text-black w-4/5"
          />
          {user ? (
            <>
              <span className="text-yellow-200 font-semibold">{user.name}</span>
              <button
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="bg-red-700 text-white px-4 py-1 rounded hover:bg-red-800"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => { navigate("/login"); setMobileMenuOpen(false); }}
              className="bg-green-400 text-black px-4 py-1 rounded hover:bg-yellow-500"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
