// "use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect } from "react";
import { useState, useRef } from "react";

type CategoryPillProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const TrasnlateAmount = 200;

const CategoryPills = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillProps) => {
  const [translate, setTranslate] = useState(1);
  const [isLeftVisible, setIsLeftVisible] = useState(true);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current == null) return;
    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container == null) return;
      setIsLeftVisible(translate > 0);
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth
      );
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect;
    };
  }, [categories, translate]);

  return (
    <div
      ref={containerRef}
      className="overflow-x-hidden overflow-y-hidden relative "
    >
      <div className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`inline py-1 px-3 rounded-lg ${
              selectedCategory === category
                ? "bg-neutral-900 text-white"
                : "bg-neutral-200 hover:bg-neutral-300"
            } whitespace-nowrap bg-neutral-200  text-center cursor-pointer transition-transform`}
            style={{ transform: `translateX(-${translate}px)` }}
          >
            {category}
          </button>
        ))}

        {/* <button className="inline py-1 px-3 rounded-lg whitespace-nowrap bg-neutral-200 hover:bg-neutral-300 text-center cursor-pointer">
          JavaScript
        </button> */}
      </div>
      {isLeftVisible && (
        <div className=" absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <button
            onClick={() => {
              setTranslate((translate) => {
                const newTranslate = translate - TrasnlateAmount;
                if (newTranslate <= 0) return 0;
                return newTranslate;
              });
            }}
            className="h-full aspect-square w-auto p-1.5 cursor-pointer "
          >
            <ChevronLeft />
          </button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
          <button
            onClick={() => {
              setTranslate((translate) => {
                if (containerRef.current == null) {
                  return translate;
                }

                const newTranslate = translate + TrasnlateAmount;
                const edge = containerRef.current.scrollWidth;
                const width = containerRef.current.clientWidth;
                if (newTranslate + width >= edge) {
                  return edge - width;
                }
                return newTranslate;
              });
            }}
            className="h-full aspect-square w-auto p-1.5 cursor-pointer"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPills;
