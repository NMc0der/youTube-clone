"use client";

import Image from "next/image";
import { PageHeader } from "./components/PageHeader";
import CategoryPills from "./components/CategoryPills";
import { categories } from "./data/home";
import { useState } from "react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="max-h-screen flex flex-col">
      <PageHeader />
      <div className="grid grid-cols-[auto_1fr] flex-grow-1 overflow-auto">
        <div className="">Sidebar</div>
        <div className="overflow-x-hidden px-8 pb-4">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <CategoryPills
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
