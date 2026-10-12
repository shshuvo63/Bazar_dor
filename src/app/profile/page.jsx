"use client"
import React, { useState } from 'react';
import Image from 'next/image';

export default function UserProfile() {
  const [name, setName] = useState('Rezwan Ahmed');

  const handleUpdate = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f7f4] flex flex-col justify-between p-6">
      <div className="max-w-3xl w-full mx-auto space-y-6 pt-6">
        {/* Top Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
          <p className="text-xs text-gray-500 mt-1">আপনার অ্যাকাউন্টর তথ্য এখানে দেখুন।</p>
        </div>

        {/* Profile Info Card */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-200 relative flex-shrink-0">
              <Image
                src=""
                alt="Rezwan Ahmed"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Rezwan Ahmed</h2>
              <p className="text-xs text-gray-400 mt-0.5">rezwanahmed@gmail.com</p>
            </div>
          </div>

          <button
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-2 border border-red-200 text-red-500 text-xs font-semibold rounded-xl hover:bg-red-50/50 transition-colors"
          >
            <span>←</span>
            <span>সাইন আউট</span>
          </button>
        </div>

        {/* Settings/Update Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4">তথ্য</h3>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                নাম
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#fafafa] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#008a45] transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#008a45] hover:bg-[#00753a] text-white text-sm font-semibold rounded-xl shadow-md transition-colors cursor-pointer"
            >
              আপডেট
            </button>
          </form>
        </div>
      </div>

      
    </div>
  );
}