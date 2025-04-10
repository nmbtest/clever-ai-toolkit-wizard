
import React from "react";

interface CategorySectionProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export default function CategorySection({ id, title, description, icon, children }: CategorySectionProps) {
  return (
    <section id={id} className="py-12">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-[#16213e] text-[#e94560]">
            {icon}
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </section>
  );
}
