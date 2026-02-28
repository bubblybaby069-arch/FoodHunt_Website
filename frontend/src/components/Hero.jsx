import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import bg1 from "../assets/bg1.jpg";
import bg2 from "../assets/bg2.jpg";
import bg3 from "../assets/bg3.jpg";

const Hero = () => {
  const images = [bg1, bg2, bg3];
  const titles = [
    "Crave It. Find It. Eat It.",
    "Hunt Less. Eat More.",
    "Your Hunger Ends Here.",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(0);
  const navigate = useNavigate();

  /* ================= IMAGE SLIDER ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>

      {/* ================= MARQUEE RIGHT → LEFT ================= */}
      <div className="fixed top-16 left-0 w-full overflow-hidden z-50">
        <div className="inline-block whitespace-nowrap py-2 animate-marquee text-lg font-bold 
                  bg-gradient-to-r from-yellow-400 via-orange-400 to-blue-500
                  bg-clip-text text-transparent">
          {"Hungry? Discover fresh, tasty, restaurant-quality food on FoodHunt — fast delivery, best prices, and happiness in every bite...."}
          {"..ಹಸಿವಾಗಿದೆಯೇ? FoodHunt ನಲ್ಲಿ ತಾಜಾ, ರುಚಿಕರವಾದ, ರೆಸ್ಟೋರೆಂಟ್-ಗುಣಮಟ್ಟದ ಆಹಾರವನ್ನು ಅನ್ವೇಷಿಸಿ - ವೇಗದ ವಿತರಣೆ, ಉತ್ತಮ ಬೆಲೆಗಳು ಮತ್ತು ಪ್ರತಿ ತುತ್ತಲ್ಲೂ ಸಂತೋಷ.  "}
        </div>
      </div>




 
      {/* ================= HERO ================= */}
      <section
        id="hero"
        className="relative min-h-screen pt-32 flex items-center justify-center text-center text-white overflow-hidden"
      >
        {/* BACKGROUND IMAGES */}
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Food Background"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[3000ms] ease-in-out
              ${currentImage === index
                ? "opacity-100 scale-110"
                : "opacity-0 scale-100"
              }`}
          />
        ))}

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/65" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
              FOODHunt
            </span>
          </h1>

          {/* ROTATING TITLE */}
          <p
            key={currentTitle}
            className="mt-6 text-xl sm:text-2xl md:text-3xl font-semibold animate-fadeUp"
          >
            {titles[currentTitle]}
          </p>

          <p className="mt-4 text-gray-200 max-w-xl mx-auto">
            Discover, order, and enjoy delicious food delivered hot & fast to
            your doorstep.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/menu")}
              className="px-10 py-3 rounded-full font-bold text-white
              bg-gradient-to-r from-green-500 via-orange-500 to-red-500
              hover:scale-105 transition-transform shadow-xl"
            >
              Explore Food 🍔
            </button>

            <a
              href="#menu"
              className="px-10 py-3 rounded-full font-semibold
              border border-white/40 hover:bg-white/10 transition"
            >
              View Menu 📖
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
