'use client';

import React, { useState, useEffect, useRef } from "react";
import Header from '../components/Header';

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
  const inputRef = useRef<HTMLTextAreaElement>(null); // Add ref for textarea

  // Ensure textarea is focused after clearing input
  useEffect(() => {
    if (idea === "") {
      inputRef.current?.focus();
    }
  }, [idea]);

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

    // WebSocket setup with retry
    let attempts = 0;
    const maxAttempts = 3;
    const wsUrl = API_URL.replace(/^http/, "ws");
    let ws: WebSocket | null = null;
    function connectWebSocket() {
      ws = new window.WebSocket(wsUrl);
      wsRef.current = ws;
      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === "ideas" && Array.isArray(msg.data)) {
            setIdeas(msg.data);
          }
        } catch {}
      };
      ws.onerror = () => {
        if (attempts < maxAttempts) {
          attempts++;
          setTimeout(connectWebSocket, 1000); // retry after 1s
        } else {
          setError("WebSocket error");
        }
      };
      ws.onclose = () => {};
    }
    connectWebSocket();
    return () => {
      ws?.close();
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
      setIdea(""); // Only clear input, focus handled by useEffect
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
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-8 px-4 pt-24">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-indigo-700 drop-shadow-lg">The Idea Board</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col items-center mb-10 bg-white rounded-2xl shadow-lg p-8 border border-indigo-100">
          <textarea
            ref={inputRef}
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-3 resize-none text-gray-900 placeholder-gray-500 text-lg transition-all duration-150"
            maxLength={MAX_LENGTH}
            rows={4}
            placeholder="Share your idea... (max 280 chars)"
            value={idea}
            onChange={e => setIdea(e.target.value)}
          />
          <div className="w-full flex justify-between items-center mb-3 text-sm text-gray-500">
            <span>{idea.length}/{MAX_LENGTH}</span>
          </div>
          <button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 font-semibold text-lg">Submit Idea</button>
        </form>
        {error && <div className="text-red-500 mb-4 font-semibold text-center">{error}</div>}
        <section className="w-full max-w-2xl grid gap-8">
          {loading ? (
            <p className="text-gray-500 text-center text-lg">Loading ideas...</p>
          ) : ideas.length === 0 ? (
            <p className="text-gray-500 text-center text-lg">No ideas yet. Be the first to share!</p>
          ) : (
            ideas.map(i => (
              <div key={i.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center justify-between border border-indigo-100 hover:border-indigo-300 transition">
                <span className="text-gray-800 text-lg mb-3 md:mb-0 flex-1 break-words">{i.text}</span>
                <button
                  className="bg-indigo-100 text-indigo-700 px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-indigo-200 hover:scale-105 transition font-semibold text-lg"
                  onClick={() => handleUpvote(i.id)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3"/></svg>
                  Upvote <span className="font-bold">{i.upvotes}</span>
                </button>
              </div>
            ))
          )}
        </section>
      </main>
    </>
  );
}
