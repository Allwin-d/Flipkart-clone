import { useState, useEffect } from "react";
import { banners } from "../../Constants/ConstantArrays/constantsArrays";

const HeroBanner = () => {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []); //here it runs , only when the component runs for the first time

  return (
    <div className="relative mx-auto mt-4 h-56 w-full sm:h-72 md:h-96 lg:h-[600px]">
      <img
        src={banners[activeImg].image}
        className="absolute w-full h-full object-cover transition-opacity duration-700 rounded-lg opacity-100"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-black/20 px-4 text-center sm:space-y-5 md:space-y-8">
        <p className="text-3xl font-bold text-white sm:text-5xl md:text-6xl lg:text-8xl">
          {banners[activeImg].title}
        </p>
        <p className="text-lg text-white sm:text-2xl md:text-4xl lg:text-6xl">{banners[activeImg].subtitle}</p>
        <p className="text-2xl text-white sm:text-4xl md:text-6xl lg:text-8xl">{banners[activeImg].tag}</p>
      </div>
    </div>
  );
};

export default HeroBanner;
