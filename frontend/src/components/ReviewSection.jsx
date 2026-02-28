import { useState } from "react";

const reviews = [
  {
    name: "Rahul",
    rating: 5,
    description: "Amazing food and super fast delivery. Loved it!",
    image: "https://i.pravatar.cc/150?img=11",
    date: "2024-12-10",
  },
  {
    name: "Priya",
    rating: 4,
    description: "Food quality was great. Packaging can be improved.",
    image: "https://i.pravatar.cc/150?img=32",
    date: "2024-12-08",
  },
  {
    name: "Arjun",
    rating: 5,
    description: "Best food ordering experience. Highly recommended!",
    image: "https://i.pravatar.cc/150?img=45",
    date: "2024-12-06",
  },
  {
    name: "Sneha",
    rating: 5,
    description: "Hot food and on-time delivery. Excellent service!",
    image: "https://i.pravatar.cc/150?img=21",
    date: "2024-12-05",
  },
  {
    name: "Vikram",
    rating: 4,
    description: "Good taste and fair pricing.",
    image: "https://i.pravatar.cc/150?img=18",
    date: "2024-12-04",
  },
  {
    name: "Ananya",
    rating: 5,
    description: "Loved the variety and quality!",
    image: "https://i.pravatar.cc/150?img=9",
    date: "2024-12-03",
  },
  {
    name: "Karan",
    rating: 4,
    description: "Delivery was fast, food was fresh.",
    image: "https://i.pravatar.cc/150?img=5",
    date: "2024-12-02",
  },
  {
    name: "Pooja",
    rating: 5,
    description: "Amazing flavors, will order again.",
    image: "https://i.pravatar.cc/150?img=27",
    date: "2024-12-01",
  },
  {
    name: "Amit",
    rating: 4,
    description: "Nice experience overall.",
    image: "https://i.pravatar.cc/150?img=14",
    date: "2024-11-30",
  },
  {
    name: "Sanjana Karja",
    rating: 5,
    description: "Absolutely loved the food!",
    image: "https://i.pravatar.cc/150?img=19",
    date: "2024-11-29",
  },
  {
    name: "Rohit",
    rating: 4,
    description: "Good quality and quick service.",
    image: "https://i.pravatar.cc/150?img=6",
    date: "2024-11-28",
  },
  {
    name: "Divya",
    rating: 5,
    description: "Top-notch service and taste!",
    image: "https://i.pravatar.cc/150?img=33",
    date: "2024-11-27",
  },
];

const ReviewSection = () => {
  const STEP = 4;
  const [visibleCount, setVisibleCount] = useState(STEP);

  return (
    <section className="py-24 bg-gradient-to-br from-orange-500 via-green-500 via-red-400 to-green-400">
      {/* TITLE */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold text-gray-800">
          ❤️ What Our Customers Say
        </h2>
        <p className="text-gray-500 mt-3">
          Real reviews from real food lovers
        </p>
      </div>

      {/* REVIEWS GRID */}
      <div className="max-w-7xl mx-auto grid gap-8 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {reviews.slice(0, visibleCount).map((review, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow
            hover:-translate-y-2 hover:shadow-xl transition-all duration-500 text-center"
          >
            {/* IMAGE */}
            <img
              src={review.image}
              alt={review.name}
              className="w-20 h-20 mx-auto rounded-full border-4 border-white shadow mb-4"
            />

            {/* STARS */}
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < review.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            {/* DATE */}
            <p className="text-xs text-gray-400 mb-2">
              {new Date(review.date).toDateString()}
            </p>

            {/* REVIEW */}
            <p className="text-gray-600 text-sm italic mb-4">
              “{review.description}”
            </p>

            {/* NAME */}
            <p className="font-semibold text-gray-800">
              {review.name}
            </p>
          </div>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-4 mt-14">
        {visibleCount < reviews.length && (
          <button
            onClick={() =>
              setVisibleCount((prev) =>
                Math.min(prev + STEP, reviews.length)
              )
            }
            className="px-8 py-3 bg-black text-white rounded-full
            hover:bg-gray-800 transition"
          >
            See More Reviews
          </button>
        )}

        {visibleCount > STEP && (
          <button
            onClick={() => setVisibleCount(STEP)}
            className="px-8 py-3 border border-black rounded-full
            hover:bg-black hover:text-white transition"
          >
            Show Less
          </button>
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
