'use client';

import React, { useState, useEffect, useRef } from "react";

const MAX_LENGTH = 280;
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface Idea {
  id: number;
  text: string;
  upvotes: number;
}

export default function IdeaBoard() {
  const [idea, setIdea] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const wsRef = useRef<WebSocket | null>(null);

  // Fetch ideas from backend
  useEffect(() => {
    async function fetchIdeas() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_URL}/ideas`);
        if (!res.ok) throw new Error("Failed to fetch ideas");
        const data: Idea[] = await res.json();
        setIdeas(data);
      } catch {
        setError("Could not load ideas.");
      } finally {
        setLoading(false);
      }
    }
    fetchIdeas();

    // WebSocket setup
    const wsUrl = API_URL.replace(/^http/, "ws");
    const ws = new window.WebSocket(wsUrl);
    wsRef.current = ws;
    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === "ideas" && Array.isArray(msg.data)) {
          setIdeas(msg.data);
        }
      } catch {}
    };
    ws.onerror = () => setError("WebSocket error");
    ws.onclose = () => {};
    return () => {
      ws.close();
    };
  }, []);

  // Submit new idea
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;
    setError("");
    try {
      const res = await fetch(`${API_URL}/ideas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: idea }),
      });
      if (!res.ok) throw new Error("Failed to submit idea");
      const newIdea: Idea = await res.json();
      setIdeas([newIdea, ...ideas]);
      setIdea("");
    } catch {
      setError("Could not submit idea.");
    }
  };

  // Upvote idea
  const handleUpvote = async (id: number) => {
    setError("");
    try {
      const res = await fetch(`${API_URL}/ideas/${id}/upvote`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to upvote");
      const updated: Idea = await res.json();
      setIdeas(ideas.map(i => i.id === id ? updated : i));
    } catch {
      setError("Could not upvote idea.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">The Idea Board</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col items-center mb-8">
        <textarea
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-2 resize-none text-gray-900 placeholder-gray-500"
          maxLength={MAX_LENGTH}
          rows={3}
          placeholder="Share your idea... (max 280 chars)"
          value={idea}
          onChange={e => setIdea(e.target.value)}
        />
        <div className="w-full flex justify-between items-center mb-2 text-sm text-gray-500">
          <span>{idea.length}/{MAX_LENGTH}</span>
        </div>
        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition">Submit Idea</button>
      </form>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <section className="w-full max-w-2xl grid gap-6">
        {loading ? (
          <p className="text-gray-500 text-center">Loading ideas...</p>
        ) : ideas.length === 0 ? (
          <p className="text-gray-500 text-center">No ideas yet. Be the first to share!</p>
        ) : (
          ideas.map(i => (
            <div key={i.id} className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row items-center justify-between">
              <span className="text-gray-800 text-lg mb-2 md:mb-0 flex-1">{i.text}</span>
              <button
                className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-200 transition"
                onClick={() => handleUpvote(i.id)}
              >
                Upvote <span className="font-bold">{i.upvotes}</span>
              </button>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
