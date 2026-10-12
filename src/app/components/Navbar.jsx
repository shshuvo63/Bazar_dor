"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '../../lib/auth-client'; // আপনার প্রজেক্টের পাথ অনুযায়ী ঠিক করে নেবেন

export default function Navbar() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Better Auth থেকে সেশন এবং লোডিং স্টেট ফেচ করা
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsDropdownOpen(false);
          router.push('/sign-in');
        },
      },
    });
  };

  return (
    <nav className="w-full bg-[#fafafa] border-b border-gray-100 shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Left Side: Logo & App Name */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#008a45] rounded-xl flex items-center justify-center text-white shadow-sm font-bold text-xl">
            📈
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-gray-900 leading-tight">
              বাজার দর
            </h1>
            <span className="text-xs text-gray-500 font-medium">
              সোমবার, ১২ অক্টোবর, ২০২৬
            </span>
          </div>
        </Link>

        {/* Right Side: Auth / Profile Dropdown */}
        {isPending ? (
          <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-xl" />
        ) : session?.user ? (
          <div className="relative">
            {/* Clickable Profile Trigger */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 cursor-pointer focus:outline-none py-1"
            >
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-gray-200 relative border border-gray-200">
                <Image
                  src={session.user.image || 'https://i.pravatar.cc/100'}
                  alt={session.user.name || 'User'}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex items-center gap-1 text-gray-800 font-medium text-sm">
                <span>{session.user.name}</span>
                <span className="text-xs text-gray-400">▾</span>
              </div>
            </button>

            {/* Dropdown Menu Popup */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 space-y-3 z-50">
                {/* User Info Header */}
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-sm font-bold text-gray-900">{session.user.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{session.user.email}</p>
                </div>

                {/* Navigation Links */}
                <div className="space-y-1">
                  <Link
                    href="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <span>👤</span>
                    <span>আমার প্রোফাইল</span>
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-50/50 rounded-xl transition-colors text-left cursor-pointer"
                  >
                    <span>↵</span>
                    <span>সাইন আউট</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Sign In & Sign Up Buttons if not logged in */
          <div className="flex items-center gap-2">
            <Link
              href="/sign-in"
              className="text-gray-700 hover:text-[#008a45] text-xs font-semibold px-3 py-2 transition-colors"
            >
              সাইন ইন
            </Link>
            <Link
              href="/sign-up"
              className="bg-[#008a45] hover:bg-[#00753a] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm"
            >
              সাইন আপ
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}