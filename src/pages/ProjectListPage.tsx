import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom"; // Penting untuk navigasi
import { Users, Code, Search } from "lucide-react";
import { Footer, Header } from "../components/common";
import { currentUser } from "../data/dashboardData";

// --- DATA DUMMY UNTUK DAFTAR PROYEK ---
// Di aplikasi nyata, ini akan datang dari API.
const allProjects = [
  {
    id: "proj-001",
    category: "Web Development",
    title: "Collab.in - Platform Kolaborasi Real-time",
    shortDescription:
      "Bangun platform kolaborasi open-source dari awal menggunakan tumpukan teknologi modern.",
    mentor: {
      name: "Dr. Arini Dewi",
      avatarUrl: "https://i.pravatar.cc/150?u=arini",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop",
    stats: { contributors: 5 },
    techStack: ["React", "Node.js", "TypeScript"],
  },
  {
    id: "proj-002",
    category: "Mobile Development",
    title: "TaskFlow - Aplikasi Manajemen Tugas Mobile",
    shortDescription:
      "Rancang dan kembangkan aplikasi to-do list lintas platform dengan React Native dan Firebase.",
    mentor: {
      name: "Budi Santoso",
      avatarUrl: "https://i.pravatar.cc/150?u=budi",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2148&auto=format&fit=crop",
    stats: { contributors: 3 },
    techStack: ["React Native", "Firebase", "Zustand"],
  },
  {
    id: "proj-003",
    category: "Data Science",
    title: "Analisis Sentimen Media Sosial",
    shortDescription:
      "Gunakan Python dan NLTK untuk menganalisis dan memvisualisasikan sentimen publik dari data Twitter.",
    mentor: {
      name: "Citra Lestari",
      avatarUrl: "https://i.pravatar.cc/150?u=citra",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    stats: { contributors: 8 },
    techStack: ["Python", "Pandas", "Matplotlib"],
  },
  {
    id: "proj-004",
    category: "Web Development",
    title: "Portofolio Generator Otomatis",
    shortDescription:
      "Buat aplikasi web yang menghasilkan situs portofolio statis dari file JSON atau Markdown.",
    mentor: {
      name: "Eko Prasetyo",
      avatarUrl: "https://i.pravatar.cc/150?u=eko",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1542626991-a2f575a7e6a8?q=80&w=2070",
    stats: { contributors: 4 },
    techStack: ["Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    id: "proj-005",
    category: "Game Development",
    title: "Space Invaders 2D Clone",
    shortDescription:
      "Belajar dasar-dasar pengembangan game dengan membuat ulang game klasik Space Invaders.",
    mentor: {
      name: "Rendy Affandy",
      avatarUrl: "https://i.pravatar.cc/150?u=rendy",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1593305842399-522b2a47eee3?q=80&w=2070",
    stats: { contributors: 2 },
    techStack: ["Pygame", "Python"],
  },
];

const categories = [
  "All",
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Game Development",
];

// --- Komponen Kartu Proyek ---
const ProjectCard = ({ project }: { project: (typeof allProjects)[0] }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-xs font-semibold text-[#584DFF] mb-2">
          {project.category}
        </span>
        <h3 className="font-bold text-lg text-gray-800 mb-2 flex-grow">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{project.shortDescription}</p>

        <div className="flex items-center text-sm text-gray-500 mb-4 border-t border-b border-gray-100 py-3">
          <div className="flex items-center mr-4">
            <Users size={16} className="mr-2" />
            <span>{project.stats.contributors} Kontributor</span>
          </div>
          <div className="flex items-center">
            <Code size={16} className="mr-2" />
            <span>{project.techStack.join(", ")}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img
              src={project.mentor.avatarUrl}
              alt={project.mentor.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="ml-2 text-sm font-semibold">
              {project.mentor.name}
            </span>
          </div>
        </div>

        <Link
          to={`/project/${project.id}`} // Arahkan ke halaman detail
          className="w-full mt-auto bg-[#584DFF] text-white font-bold py-2.5 px-5 text-center rounded-lg hover:bg-opacity-90 transition-all duration-200"
        >
          Lihat Detail Proyek
        </Link>
      </div>
    </div>
  );
};

// --- Komponen Utama Halaman Listing ---
const ProjectListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    return allProjects
      .filter((project) => {
        // Filter berdasarkan kategori
        if (activeCategory === "All") return true;
        return project.category === activeCategory;
      })
      .filter((project) => {
        // Filter berdasarkan pencarian
        const term = searchTerm.toLowerCase();
        return (
          project.title.toLowerCase().includes(term) ||
          project.shortDescription.toLowerCase().includes(term) ||
          project.techStack.join(" ").toLowerCase().includes(term)
        );
      });
  }, [searchTerm, activeCategory]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header currentUser={currentUser} />

      <main className="container mx-auto px-4 lg:px-8 py-12">
        {/* --- Hero Section --- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900">
            Temukan Proyek Open-Source
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Pilih proyek yang sesuai dengan minat dan skill Anda, dan mulailah
            perjalanan Anda sebagai kontributor.
          </p>
        </div>

        {/* --- Area Kontrol (Pencarian & Filter) --- */}
        <div className="mb-10 p-4 bg-white rounded-xl shadow-md border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Cari proyek berdasarkan nama atau teknologi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#584DFF] focus:border-transparent transition"
              />
              <Search
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {/* Filter Kategori */}
            <div className="flex-shrink-0">
              <div className="bg-gray-100 p-1 rounded-lg flex flex-wrap justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors duration-200 ${
                      activeCategory === category
                        ? "bg-[#584DFF] text-white shadow"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- Grid Proyek --- */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">
              Oops! Proyek tidak ditemukan.
            </p>
            <p className="mt-2 text-gray-400">
              Coba ganti kata kunci pencarian atau filter kategori Anda.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProjectListPage;
