import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

import Logo from "../assets/logo.png"; // ✅ your logo image path

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid gap-8 md:grid-cols-3">

        {/* LOGO & NAME */}
        <div
          className="h-16 flex flex-col items-center cursor-pointer"
          onClick={() => goAndScroll("hero")}
        >
          <img src={Logo} alt="FoodHunt Logo" className="h-25 w-70" />
          <span className="text-xs text-gray-600 mt-1">
            Your hunger eat here
          </span>
        </div>



        {/* CONTACT INFO */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>

          <p className="flex items-center gap-2 text-gray-400 text-sm mb-2">
            <FaPhoneAlt /> +91 7795711583
          </p>

          <p className="flex items-center gap-2 text-gray-400 text-sm">
            <FaMapMarkerAlt />
            Balethota House, Devacchalla Village <br />
            Sullia karnataka - 574327
          </p>
        </div>

        {/* SOCIAL ICONS */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-lg">
            <FaInstagram className="cursor-pointer hover:text-pink-500" />
            <FaWhatsapp className="cursor-pointer hover:text-green-500" />
            <FaFacebookF className="cursor-pointer hover:text-blue-500" />
            <FaTwitter className="cursor-pointer hover:text-sky-400" />
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="text-center text-xs text-gray-500 mt-8">
        © {year} FoodHunt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
