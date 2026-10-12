"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CategoryLink() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://openapi.programming-hero.com/api/bazardor/categories')
      .then((res) => res.json())
      .then((data) => {
        const categoryData = Array.isArray(data) ? data : data?.categories || data?.data || [];
        setCategories(categoryData);
        if (categoryData.length > 0) {
          setActiveCategory(categoryData[0].id || categoryData[0].slug || categoryData[0].categoryName);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-[#fafafa] py-3 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-4 overflow-x-auto">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-8 w-24 bg-gray-200 animate-pulse rounded-lg flex-shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#fafafa] py-3 border-b border-gray-100 overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between min-w-max gap-4 md:gap-6">
        {categories.map((cat, index) => {
          const categoryId = cat.id || cat.slug || index;
          const label = cat.nameBn || cat.name || cat.label;
          const icon = cat.icon || cat.categoryIcon || '📦';
          const isActive = activeCategory === categoryId;

          return (
            <Link
              key={categoryId}
              href={`/category/${cat.slug || cat.id || index}`}
              onClick={() => setActiveCategory(categoryId)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all text-xs md:text-sm font-medium cursor-pointer ${
                isActive
                  ? 'bg-emerald-50 text-[#008a45] font-bold border border-emerald-200/60 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span className="text-base">{icon}</span>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}