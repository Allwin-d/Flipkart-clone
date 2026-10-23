import { useEffect, useRef } from "react";
import type { Category } from "../../Types/ApiResponse";

const Categories = ({ category }: { category: Category[] }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  const startAutoScroll = () => {
    const container = scrollRef.current;

    intervalRef.current = window.setInterval(() => {
      if (container) {
        container.scrollBy({
          left: 150,
          behavior: "smooth",
        });

        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          container.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        }
      }
    }, 2000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  return (
    <div
      ref={scrollRef}
      onMouseEnter={stopAutoScroll}
      onMouseLeave={startAutoScroll}
      className="flex gap-4 overflow-x-auto p-4 scrollbar-hide sm:gap-8 sm:p-6 lg:gap-12 lg:p-8"
    >
      {category.map((item) => (
        <div
          key={item.category}
          className="flex min-w-[100px] flex-col items-center rounded-lg bg-gray-100 p-3 duration-500 hover:cursor-pointer hover:transition-all hover:scale-105 sm:min-w-[120px] sm:p-4 lg:hover:scale-125"
        >
          <img src={item.image} alt={item.category} className="h-16 w-16 object-contain sm:h-20 sm:w-20" />
          <p className="text-center text-xs sm:text-sm">{item.category.toUpperCase()}</p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
