"use client";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Carousel = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrev = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };

  const handleNext = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };

  const handleDotClick = (index) => {
    setCurrentImage(index);
  };

  return (
    <div className="relative">
      <img
        src={images[currentImage]}
        alt="Carousel Image"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-between">
        <button
          className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none ml-3"
          onClick={handlePrev}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none mr-3"
          onClick={handleNext}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
      {/* <div className="flex justify-center mt-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 mx-1 rounded-full ${
              index === currentImage ? "bg-gray-800" : "bg-gray-400"
            }`}
            onClick={() => handleDotClick(index)}
          ></button>
        ))}
      </div> */}
    </div>
  );
};

export default Carousel;
