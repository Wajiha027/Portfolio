import React from "react";
import { useNavigate } from "react-router-dom";

function Hero({ name, bio }) {
  const navigate = useNavigate();

  const handleViewWork = () => {
    navigate("/projects");
  };

  return (
    <section className="text-center p-10 bg-gray-200 dark:bg-gray-900">
      {/* Name */}
      <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-300">{name}</h1>

      {/* Bio */}
      <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">{bio}</p>

      {/* View My Work Button */}
      <button
        onClick={handleViewWork}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-transform transform hover:scale-105"
      >
        View My Work
      </button>
    </section>
  );
}

export default Hero;
