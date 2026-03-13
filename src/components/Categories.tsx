import { useEffect, useRef } from "react";
import type { Category } from "../Types/ApiResponse";

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
      className="flex overflow-x-auto p-8 scrollbar-hide gap-12"
    >
      {category.map((item) => (
        <div
          key={item.category}
          className="flex flex-col items-center min-w-[120px] bg-gray-100 rounded-lg hover:cursor-pointer hover:transition-all duration-500 hover:scale-125"
        >
          <img src={item.image} alt={item.category} />
          <p>{item.category}</p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
