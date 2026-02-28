import { useState } from "react";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import MenuSection from "../components/MenuSection";
import ReviewSection from "../components/ReviewSection";
import Footer from "../components/Footer";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      <Hero />

      {/* Category Section */}
      <CategorySection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Menu Section */}
      <MenuSection selectedCategory={selectedCategory} />

      <ReviewSection />
      <Footer />
    </>
  );
};

export default Home;
