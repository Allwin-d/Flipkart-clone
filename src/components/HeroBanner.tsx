import { useState, useEffect } from "react";
import { banners } from "./ConstantsArrays";

const HeroBanner = () => {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []); //here it runs , only when the component runs for the first time

  return (
    <div className="relative h-[600px] w-3/3 mx-auto mt-4">
      <img
        src={banners[activeImg].image}
        className="absolute w-full h-full object-cover transition-opacity duration-700 rounded-lg opacity-100"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-12">
        <p className=" text-8xl font-bold text-white">
          {banners[activeImg].title}
        </p>
        <p className=" text-6xl text-white">{banners[activeImg].subtitle}</p>
        <p className=" text-8xl text-white">{banners[activeImg].tag}</p>
      </div>
    </div>
  );
};

export default HeroBanner;
