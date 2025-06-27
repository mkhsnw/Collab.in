import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MessageSquare, Search, MessageCircle } from "lucide-react";
import { Footer, Header } from "../components/common";
import { currentUser } from "../data/dashboardData";

// --- DATA DUMMY UNTUK FORUM DISKUSI ---
export const forumDiscussions = [
  {
    id: "D-01",
    authorName: "Suparni",
    authorAvatar: "https://i.pravatar.cc/150?u=suparni",
    date: "2025-04-21T10:00:00Z",
    title: "Masalah Instalasi PyCharm",
    content:
      "tidak bisa masuk ke dashboard PyCharm karena perlu aktivasi dulu, ini gimana ya cara aktivasinya dan apakah tidak bisa menggunakan PyCharm secara gratis?",
    tags: ["pycharm", "instalasi", "error"],
    replies: 3,
    relatedLesson: "Bersiap Membuat Kode Program di Lokal",
    status: "selesai", // 'selesai' atau 'belum_selesai'
  },
  {
    id: "D-02",
    authorName: "Budi Santoso",
    authorAvatar: "https://i.pravatar.cc/150?u=budi",
    date: "2025-06-18T14:30:00Z",
    title: "Perbedaan antara List dan Tuple di Python?",
    content:
      "Saya masih bingung kapan sebaiknya menggunakan List dan kapan harus menggunakan Tuple. Apakah ada best practice terkait performa atau penggunaannya?",
    tags: ["python", "list", "tuple", "dasar"],
    replies: 5,
    relatedLesson: "Tipe Data pada Python",
    status: "selesai",
  },
  {
    id: "D-03",
    authorName: "Citra Lestari",
    authorAvatar: "https://i.pravatar.cc/150?u=citra",
    date: "2025-06-20T08:15:00Z",
    title: "Bagaimana cara handle error async/await dengan benar?",
    content:
      "Saat memanggil API, kadang saya mendapat unhandled promise rejection. Bagaimana cara terbaik untuk menangani error menggunakan try...catch pada fungsi async?",
    tags: ["javascript", "async", "error"],
    replies: 0,
    relatedLesson: "JavaScript Asynchronous",
    status: "belum_selesai",
  },
];

const popularTags = [
  "python",
  "error",
  "kuis",
  "python3",
  "loop",
  "perulangan",
  "fungsi",
  "list",
];

// --- Komponen Kartu Diskusi ---
const DiscussionCard = ({
  discussion,
}: {
  discussion: (typeof forumDiscussions)[0];
}) => {
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

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <img
            src={discussion.authorAvatar}
            alt={discussion.authorName}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <p className="font-bold text-gray-800">{discussion.authorName}</p>
            <p className="text-xs text-gray-500">
              {timeAgo(new Date(discussion.date))}
            </p>
          </div>
        </div>
        {discussion.status === "selesai" && (
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
            Selesai
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-[#584DFF] transition-colors">
        <Link to={`/discussion/${discussion.id}`}>{discussion.title}</Link>
      </h3>
      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
        {discussion.content}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {discussion.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="border-t border-gray-100 pt-3 flex items-center text-xs text-gray-500">
        <MessageCircle size={14} className="mr-1.5" />
        <span>{discussion.replies} Pembahasan</span>
        <span className="mx-2">•</span>
        <span>
          Dalam:{" "}
          <span className="font-semibold text-gray-600">
            {discussion.relatedLesson}
          </span>
        </span>
      </div>
    </div>
  );
};

// --- Komponen Utama Halaman Forum ---
const ForumPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'selesai', 'belum_selesai'
  const [sortBy, setSortBy] = useState("terbaru"); // 'terbaru', 'terlama'
  const navigate = useNavigate();

  const processedDiscussions = useMemo(() => {
    let discussions = [...forumDiscussions];

    // Filter by status
    if (filterStatus !== "all") {
      discussions = discussions.filter((d) => d.status === filterStatus);
    }

    // Filter by search term
    if (searchTerm) {
      discussions = discussions.filter((d) =>
        d.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    discussions.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === "terbaru" ? dateB - dateA : dateA - dateB;
    });

    return discussions;
  }, [filterStatus, sortBy, searchTerm]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header currentUser={currentUser} />

      <main className="container mx-auto px-4 lg:px-8 py-10">
        {/* --- Header Forum --- */}
        <div className="flex items-center mb-8">
          <div className="bg-blue-100 p-4 rounded-xl mr-6">
            <MessageSquare size={40} className="text-[#584DFF]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Selamat Datang di Forum Diskusi
            </h1>
            <p className="text-gray-600 mt-1">
              Konsultasi seputar materi belajar Anda di sini.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* --- Sidebar Kiri --- */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Filter */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg mb-4">Filter & Urutkan</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Filter berdasarkan
                    </label>
                    <div className="mt-2 space-y-1">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="all"
                          checked={filterStatus === "all"}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="form-radio text-[#584DFF]"
                        />
                        <span className="ml-2 text-sm">Semua Diskusi</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="selesai"
                          checked={filterStatus === "selesai"}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="form-radio text-[#584DFF]"
                        />
                        <span className="ml-2 text-sm">
                          Diskusi sudah selesai
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="belum_selesai"
                          checked={filterStatus === "belum_selesai"}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="form-radio text-[#584DFF]"
                        />
                        <span className="ml-2 text-sm">
                          Diskusi belum selesai
                        </span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      Urutkan berdasarkan
                    </label>
                    <div className="mt-2 space-y-1">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="sort"
                          value="terbaru"
                          checked={sortBy === "terbaru"}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="form-radio text-[#584DFF]"
                        />
                        <span className="ml-2 text-sm">Diskusi Terbaru</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="sort"
                          value="terlama"
                          checked={sortBy === "terlama"}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="form-radio text-[#584DFF]"
                        />
                        <span className="ml-2 text-sm">Diskusi Terlama</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* Kata Kunci Populer */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg mb-4">Kata Kunci Populer</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* --- Konten Utama --- */}
          <div className="lg:col-span-3">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <button
                className="w-full md:w-auto flex-shrink-0 bg-[#584DFF] text-white font-bold py-2.5 px-6 rounded-lg hover:bg-opacity-90 transition"
                onClick={() => {
                  navigate("/newforum");
                }}
              >
                Buat Diskusi Baru
              </button>
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Cari judul diskusi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#584DFF] focus:border-transparent transition"
                />
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            {/* Daftar Diskusi */}
            <div className="space-y-6">
              {processedDiscussions.map((discussion) => (
                <DiscussionCard key={discussion.id} discussion={discussion} />
              ))}
              {processedDiscussions.length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl border">
                  <p className="text-xl text-gray-500">
                    Tidak ada diskusi yang cocok.
                  </p>
                  <p className="mt-2 text-gray-400">
                    Silakan ubah filter atau kata kunci pencarian Anda.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default ForumPage;
