import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold mb-4 text-indigo-700">Welcome to Idea Board</h1>
        <p className="text-lg text-gray-700 mb-8">Unleash creativity. Share and upvote ideas anonymously in real time.</p>
        <Link href="/idea-board">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition">Get Started</button>
        </Link>
      </section>
      {/* Features Section */}
      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <svg className="w-10 h-10 mb-3 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20l9-5-9-5-9 5 9 5z"/></svg>
          <h3 className="font-semibold text-lg mb-2">Real-Time Collaboration</h3>
          <p className="text-gray-600 text-center">Ideas and upvotes update instantly for all users.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <svg className="w-10 h-10 mb-3 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>
          <h3 className="font-semibold text-lg mb-2">Anonymous & Secure</h3>
          <p className="text-gray-600 text-center">No login required. Share ideas freely and securely.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <svg className="w-10 h-10 mb-3 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3"/></svg>
          <h3 className="font-semibold text-lg mb-2">Upvote the Best</h3>
          <p className="text-gray-600 text-center">Support great ideas by upvoting your favorites.</p>
        </div>
      </section>
    </main>
  );
}
