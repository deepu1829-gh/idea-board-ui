import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md flex items-center justify-between px-8 py-4 fixed top-0 left-0 z-10">
      <Link href="/" className="text-indigo-600 font-bold text-2xl hover:underline">Home</Link>
      <span className="text-indigo-700 font-semibold text-lg">Idea Board</span>
    </header>
  );
}
