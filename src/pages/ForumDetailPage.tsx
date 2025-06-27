import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header, Footer } from "../components/common";
import { getCurrentUser } from "../data/dashboardData"; // Asumsi data dipindah
import type { User } from "../types";
import {
  ArrowLeftIcon,
  ChatBubbleLeftEllipsisIcon,
  UserCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { forumDiscussions } from "./ForumPage";

// --- DATA DUMMY UNTUK BALASAN ---
const dummyReplies = [
  {
    id: "R-01",
    authorName: "Eko Kurniawan",
    authorAvatar: "https://i.pravatar.cc/150?u=eko",
    date: "2025-06-18T15:00:00Z",
    content:
      "Secara singkat: List itu *mutable* (bisa diubah), sedangkan Tuple itu *immutable* (tidak bisa diubah). Gunakan Tuple untuk data yang tidak seharusnya berubah, seperti koordinat (x, y).",
  },
  {
    id: "R-02",
    authorName: "Siti Aminah",
    authorAvatar: "https://i.pravatar.cc/150?u=siti",
    date: "2025-06-18T16:30:00Z",
    content:
      "Menambahkan, karena sifatnya yang immutable, Tuple sedikit lebih cepat dan hemat memori dibandingkan List. Jadi untuk data koleksi yang sifatnya konstan, Tuple adalah pilihan yang lebih baik.",
  },
];

const timeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " tahun yang lalu";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " bulan yang lalu";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " hari yang lalu";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " jam yang lalu";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " menit yang lalu";
  return Math.floor(seconds) + " detik yang lalu";
};

const ForumDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [newReply, setNewReply] = useState("");
  const [replies, setReplies] = useState(dummyReplies);

  const discussion = useMemo(
    () => forumDiscussions.find((d) => d.id === id),
    [id]
  );

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim()) return;
    if (!currentUser) {
      alert("Anda harus login untuk membalas.");
      return;
    }

    const reply = {
      id: `R-${Date.now()}`,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      date: new Date().toISOString(),
      content: newReply,
    };

    setReplies([reply, ...replies]);
    setNewReply("");
  };

  if (!discussion) {
    return <div>Diskusi tidak ditemukan.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header currentUser={currentUser} />
      <main className="container mx-auto px-4 lg:px-8 py-10">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/discussion")}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Kembali ke Semua Diskusi
          </button>

          {/* --- KONTEN DISKUSI UTAMA --- */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <img
                src={discussion.authorAvatar}
                alt={discussion.authorName}
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-4">
                <p className="font-bold text-gray-800">
                  {discussion.authorName}
                </p>
                <p className="text-xs text-gray-500">
                  {timeAgo(new Date(discussion.date))}
                </p>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {discussion.title}
            </h1>
            <p className="text-gray-700 leading-relaxed mb-6">
              {discussion.content}
            </p>
            <div className="flex flex-wrap gap-2">
              {discussion.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* --- DAFTAR BALASAN --- */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <ChatBubbleLeftEllipsisIcon className="w-6 h-6 mr-3 text-[#584DFF]" />
              {replies.length} Pembahasan
            </h2>
            <div className="space-y-6">
              {replies.map((reply) => (
                <div
                  key={reply.id}
                  className="flex items-start bg-white p-6 rounded-lg border"
                >
                  <img
                    src={reply.authorAvatar}
                    alt={reply.authorName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-800">
                        {reply.authorName}
                      </p>
                      <p className="text-xs text-gray-400">
                        {timeAgo(new Date(reply.date))}
                      </p>
                    </div>
                    <p className="text-gray-600 mt-2">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- FORM BALASAN BARU --- */}
          <div className="mt-10">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Ikut Berdiskusi</h3>
              <form onSubmit={handleReplySubmit} className="flex items-start">
                {currentUser ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <UserCircleIcon className="w-10 h-10 text-gray-400" />
                )}
                <div className="ml-4 flex-1">
                  <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#584DFF] focus:border-transparent transition"
                    placeholder="Tulis balasan Anda di sini..."
                    disabled={!currentUser}
                  ></textarea>
                  <div className="flex justify-end mt-3">
                    <button
                      type="submit"
                      disabled={!currentUser || !newReply.trim()}
                      className="flex items-center bg-[#584DFF] text-white font-semibold py-2 px-5 rounded-lg hover:bg-opacity-90 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                      Kirim Balasan
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForumDetailPage;
