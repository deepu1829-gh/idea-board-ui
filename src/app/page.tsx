import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-extrabold mb-4 text-indigo-700 drop-shadow-lg">Welcome to Idea Board</h1>
        <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto">Unleash creativity. Share and upvote ideas anonymously in real time.</p>
        <Link href="/idea-board">
          <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 font-semibold text-lg">Get Started</button>
        </Link>
      </section>
      {/* Features Section */}
      <section className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center border border-indigo-100 hover:border-indigo-300 transition">
          <svg className="w-12 h-12 mb-4 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20l9-5-9-5-9 5 9 5z"/></svg>
          <h3 className="font-bold text-xl mb-2 text-indigo-700">Real-Time Collaboration</h3>
          <p className="text-gray-600 text-center">Ideas and upvotes update instantly for all users.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center border border-indigo-100 hover:border-indigo-300 transition">
          <svg className="w-12 h-12 mb-4 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>
          <h3 className="font-bold text-xl mb-2 text-indigo-700">Anonymous & Secure</h3>
          <p className="text-gray-600 text-center">No login required. Share ideas freely and securely.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center border border-indigo-100 hover:border-indigo-300 transition">
          <svg className="w-12 h-12 mb-4 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3"/></svg>
          <h3 className="font-bold text-xl mb-2 text-indigo-700">Upvote the Best</h3>
          <p className="text-gray-600 text-center">Support great ideas by upvoting your favorites.</p>
        </div>
      </section>
    </main>
  );
}
