import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Footer } from "../components/common";
import { getCurrentUser } from "../data/dashboardData";
import type { User } from "../types";
import { ArrowLeftIcon, TagIcon } from "@heroicons/react/24/outline";

const NewForumPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Judul dan Konten tidak boleh kosong.");
      return;
    }
    if (!currentUser) {
      alert("Anda harus login untuk membuat diskusi.");
      navigate("/login");
      return;
    }

    // Logika untuk menyimpan diskusi baru (di sini kita simulasi)
    // Di aplikasi nyata, ini akan menjadi panggilan API.
    console.log("Diskusi Baru:", {
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
    });

    alert("Diskusi berhasil dibuat!");
    navigate("/discussion");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header currentUser={currentUser} />
      <main className="container mx-auto px-4 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to All Discussions
          </button>

          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Create a New Discussion
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Discussion Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Example: How to use Git?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#584DFF] focus:border-transparent transition"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Fill in the Question
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  placeholder="Explain your question in detail here..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#584DFF] focus:border-transparent transition"
                  required
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Tags
                </label>
                <div className="relative">
                  <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Example: git, python, javascript (separate with commas)"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#584DFF] focus:border-transparent transition"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#584DFF] text-white font-bold py-2.5 px-6 rounded-lg hover:bg-opacity-90 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewForumPage;
