import React, { useState } from "react";
import {
  Users,
  ChevronDown,
  ChevronUp,
  X,
  Mail,
  CheckCircle2,
  CircleDot,
  Circle,
  Star,
  Clock,
  Award,
  Share2,
  Heart,
  ListChecks,
} from "lucide-react";
import { Footer, Header } from "../components/common";
import { currentUser } from "../data/dashboardData";

// --- DATA DUMMY LENGKAP ---
const projectData = {
  id: "proj-001",
  category: "Web Development",
  title: "Collab.in - Platform Kolaborasi Real-time",
  shortDescription:
    "Bangun platform kolaborasi open-source dari awal menggunakan tumpukan teknologi modern dan berkontribusi pada komunitas global.",
  mentor: {
    name: "Dr. Arini Dewi",
    title: "Senior Developer & Mentor",
    avatarUrl: "https://i.pravatar.cc/150?u=arini",
    bio: "Dr. Arini adalah seorang software architect dengan 12 tahun pengalaman dalam membangun aplikasi scalable. Beliau sangat passionate dalam membimbing talenta baru dan percaya pada kekuatan open-source untuk mendorong inovasi.",
    email: "bla@gmail.com",
  },
  imageUrl:
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop",
  stats: {
    contributors: 5,
    totalHours: 95,
    rating: 4.9,
    reviewCount: 125,
  },
  overview: {
    longDescription:
      "<p>Proyek ini dimulai sebagai inisiatif untuk mendukung komunitas developer yang membutuhkan alat kolaborasi canggih tanpa biaya langganan yang mahal. Arsitektur kami dibangun di atas WebSocket untuk komunikasi real-time dan React untuk antarmuka yang dinamis.</p><p class='mt-4'>Kami percaya pada kekuatan kolaborasi dan ingin membangun komunitas yang solid di sekitar proyek ini. Setiap kontribusi, baik itu kode, dokumentasi, atau bahkan laporan bug, sangat kami hargai.</p>",
    whatYoullDo: [
      "Mengembangkan komponen UI yang reusable dengan React & TypeScript.",
      "Mengimplementasikan logika WebSocket untuk fitur real-time.",
      "Merancang dan mengelola skema database PostgreSQL.",
      "Menulis unit test dan integration test untuk memastikan kualitas kode.",
      "Berkolaborasi dalam desain UI/UX dengan tim.",
      "Meningkatkan performa dan aksesibilitas aplikasi.",
    ],
  },
  skillset: {
    required: ["HTML & CSS", "JavaScript (ES6+)", "React", "Node.js", "Git"],
    recommended: ["TypeScript", "PostgreSQL", "WebSocket", "Docker"],
  },
  tasks: [
    {
      id: "T-01",
      title: "Buat Komponen Modal Login",
      difficulty: "Mudah",
      tags: ["Frontend", "UI"],
    },
    {
      id: "T-02",
      title: "Optimalkan Query Database untuk Profil",
      difficulty: "Menengah",
      tags: ["Backend", "Database"],
    },
    {
      id: "T-03",
      title: "Implementasi Fitur Drag & Drop untuk Whiteboard",
      difficulty: "Sulit",
      tags: ["Frontend", "Real-time"],
    },
  ],
  reviews: [
    {
      id: "R-01",
      name: "Budi Santoso",
      rating: 5,
      text: "Pengalaman luar biasa! Mentor sangat suportif dan saya belajar banyak tentang arsitektur perangkat lunak. Sangat direkomendasikan untuk membangun portofolio.",
      avatarUrl: "https://i.pravatar.cc/150?u=budi",
    },
    {
      id: "R-02",
      name: "Citra Lestari",
      rating: 5,
      text: "Proyek yang sangat relevan dengan industri. Saya bisa langsung menerapkan apa yang saya pelajari di pekerjaan. Timnya juga sangat kolaboratif.",
      avatarUrl: "https://i.pravatar.cc/150?u=citra",
    },
  ],
  faqs: [
    {
      question: "Skill apa yang paling dibutuhkan?",
      answer:
        "Kami sangat membutuhkan pengalaman di React dan TypeScript. Jika Anda memiliki keahlian dalam optimasi performa atau WebSockets, itu akan menjadi nilai tambah yang besar.",
    },
    {
      question: "Bagaimana proses seleksi proposal?",
      answer:
        "Mentor akan mereview setiap proposal yang masuk. Kami akan melihat portofolio Anda, terutama proyek-proyek yang relevan. Kandidat yang terpilih akan dihubungi melalui email untuk diskusi lebih lanjut.",
    },
  ],
  relatedProjects: [
    {
      id: "P-02",
      title: "Aplikasi Manajemen Tugas Kanban",
      category: "Productivity",
      imageUrl:
        "https://picsum.photos/300/200?random=19",
    },
    {
      id: "P-03",
      title: "Platform E-learning Interaktif",
      category: "Education",
      imageUrl:
        "https://picsum.photos/300/200?random=20",
    },
  ],
};

const roadmapData = [
  {
    id: 1,
    title: "Dasar Pemrograman Web",
    totalHours: 20,
    status: "completed",
    courses: [
      { id: "c1", title: "HTML & CSS Fundamental" },
      { id: "c2", title: "JavaScript Dasar" },
      { id: "c3", title: "Git Fundamental" },
    ],
  },
  {
    id: 2,
    title: "Frontend Development",
    totalHours: 40,
    status: "in_progress",
    courses: [
      { id: "c4", title: "React Fundamental" },
      { id: "c5", title: "State Management" },
      { id: "c6", title: "API Integration" },
    ],
  },
  {
    id: 3,
    title: "Backend Development",
    totalHours: 35,
    status: "pending",
    courses: [
      { id: "c7", title: "Node.js Fundamental" },
      { id: "c8", title: "RESTful API" },
      { id: "c9", title: "Database Design" },
    ],
  },
];

const statusStyles = {
  completed: {
    icon: <CheckCircle2 size={24} className="text-green-500" />,
    bgColor: "bg-green-50",
    textColor: "text-green-800",
    borderColor: "border-green-200",
  },
  in_progress: {
    icon: <CircleDot size={24} className="text-[#584DFF]" />,
    bgColor: "bg-blue-50",
    textColor: "text-blue-800",
    borderColor: "border-blue-200",
  },
  pending: {
    icon: <Circle size={24} className="text-gray-400" />,
    bgColor: "bg-gray-50",
    textColor: "text-gray-500",
    borderColor: "border-gray-200",
  },
};

// --- Komponen-komponen Kecil untuk Kebersihan Kode ---
const FaqItem = ({ faq }: { faq: { question: string; answer: string } }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-gray-800 hover:text-[#584DFF]"
      >
        <span className="font-semibold">{faq.question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div
          className="mt-3 text-gray-600"
          dangerouslySetInnerHTML={{ __html: faq.answer }}
        />
      )}
    </div>
  );
};
const ReviewCard = ({
  review,
}: {
  review: (typeof projectData.reviews)[0];
}) => {
  return (
    <div className="flex items-start space-x-4 border-b border-gray-200 py-5 last:border-b-0">
      <img
        src={review.avatarUrl}
        alt={review.name}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <p className="font-bold">{review.name}</p>
        <div className="flex items-center my-1">
          {Array(review.rating)
            .fill(0)
            .map((_, i) => (
              <Star
                key={i}
                size={16}
                className="text-yellow-400 fill-yellow-400"
              />
            ))}
          {Array(5 - review.rating)
            .fill(0)
            .map((_, i) => (
              <Star key={i} size={16} className="text-gray-300" />
            ))}
        </div>
        <p className="text-gray-600">{review.text}</p>
      </div>
    </div>
  );
};

// --- Komponen Utama Halaman ---
const ProjectDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    portfolioUrl: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Proposal Kontribusi untuk Proyek: ${projectData.title}`;
    const body = `Halo ${projectData.mentor.name},\n\nSaya ingin mengajukan proposal untuk berkontribusi pada proyek "${projectData.title}".\n\nBerikut adalah data diri saya:\n- Nama: ${formData.name}\n- Email: ${formData.email}\n- URL Portofolio/GitHub: ${formData.portfolioUrl}\n\nPesan Tambahan:\n${formData.message}\n\nTerima kasih.\nHormat saya,\n${formData.name}`;
    window.location.href = `mailto:${
      projectData.mentor.email
    }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsModalOpen(false);
  };
  const TabButton = ({ id, label }: { id: string; label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 font-semibold rounded-lg transition-colors duration-200 text-sm ${
        activeTab === id
          ? "bg-white shadow-md text-[#584DFF]"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {" "}
      {label}{" "}
    </button>
  );

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <Header currentUser={currentUser} />

        <div className="bg-[#584DFF] text-white pt-10 pb-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-3">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {projectData.category}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-3 leading-tight">
                  {projectData.title}
                </h1>
                <p className="text-white/80 text-lg mb-6 max-w-3xl">
                  {projectData.shortDescription}
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm mb-8">
                  <div className="flex items-center">
                    <Star size={16} className="mr-1.5 text-yellow-400" />
                    <span>
                      <b>{projectData.stats.rating}</b> (
                      {projectData.stats.reviewCount} ulasan)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users size={16} className="mr-1.5" />
                    <span>{projectData.stats.contributors} Kontributor</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1.5" />
                    <span>{projectData.stats.totalHours} jam total</span>
                  </div>
                  <div className="flex items-center">
                    <Award size={16} className="mr-1.5" />
                    <span>Sertifikat Kontribusi</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <img
                    src={projectData.mentor.avatarUrl}
                    alt={projectData.mentor.name}
                    className="w-12 h-12 rounded-full border-2 border-white/50"
                  />
                  <div className="ml-4">
                    <p className="font-semibold">{projectData.mentor.name}</p>
                    <p className="text-white/80 text-sm">
                      {projectData.mentor.title}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden text-gray-800">
                  <img
                    src={projectData.imageUrl}
                    alt={projectData.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Siap Berkontribusi?
                    </h3>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full bg-[#584DFF] text-white font-bold py-3 px-5 rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md hover:shadow-lg mb-4"
                    >
                      Ajukan Proposal
                    </button>
                    <div className="flex justify-between text-sm">
                      <button className="flex items-center font-semibold text-gray-600 hover:text-[#584DFF] transition-colors">
                        <Heart size={16} className="mr-2" /> Wishlist
                      </button>
                      <button className="flex items-center font-semibold text-gray-600 hover:text-[#584DFF] transition-colors">
                        <Share2 size={16} className="mr-2" /> Bagikan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="border-b border-gray-200 mb-6">
                  <div className="flex space-x-2 md:space-x-4">
                    <TabButton id="overview" label="Overview" />
                    <TabButton id="skillset" label="Skillset & Tasks" />
                    <TabButton id="instructor" label="Instructor" />
                    <TabButton id="reviews" label="Reviews" />
                    <TabButton id="faq" label="FAQ" />
                  </div>
                </div>
                <div>
                  {activeTab === "overview" && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Deskripsi Proyek
                      </h2>
                      <div
                        className="prose prose-sm max-w-none text-gray-600"
                        dangerouslySetInnerHTML={{
                          __html: projectData.overview.longDescription,
                        }}
                      ></div>
                      <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">
                        Apa yang akan Anda kerjakan:
                      </h3>
                      <ul className="space-y-2">
                        {projectData.overview.whatYoullDo.map((item) => (
                          <li key={item} className="flex items-start">
                            <CheckCircle2
                              className="text-green-500 mr-3 mt-1 flex-shrink-0"
                              size={18}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {activeTab === "skillset" && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Skillset yang Dibutuhkan
                      </h2>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Wajib Dikuasai
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {projectData.skillset.required.map((skill) => (
                          <span
                            key={skill}
                            className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Direkomendasikan
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {projectData.skillset.recommended.map((skill) => (
                          <span
                            key={skill}
                            className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Contoh Tugas Awal
                      </h2>
                      <div>
                        {projectData.tasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex items-center p-3 border-b"
                          >
                            <ListChecks
                              className="text-[#584DFF] mr-4"
                              size={20}
                            />
                            <div className="flex-grow">
                              <p className="font-semibold">{task.title}</p>
                            </div>
                            <span
                              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                task.difficulty === "Mudah"
                                  ? "bg-green-100 text-green-800"
                                  : task.difficulty === "Menengah"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {task.difficulty}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {activeTab === "instructor" && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Tentang Instructor
                      </h2>
                      <div className="flex items-center space-x-6">
                        <img
                          src={projectData.mentor.avatarUrl}
                          alt={projectData.mentor.name}
                          className="w-24 h-24 rounded-full"
                        />
                        <div>
                          <h3 className="text-xl font-bold">
                            {projectData.mentor.name}
                          </h3>
                          <p className="text-[#584DFF] font-semibold">
                            {projectData.mentor.title}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-4">
                        {projectData.mentor.bio}
                      </p>
                    </div>
                  )}
                  {activeTab === "reviews" && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Ulasan Kontributor
                      </h2>
                      {projectData.reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    </div>
                  )}
                  {activeTab === "faq" && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Pertanyaan Umum
                      </h2>
                      {projectData.faqs.map((faq, index) => (
                        <FaqItem key={index} faq={faq} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Proyek Terkait
                  </h3>
                  <div className="space-y-4">
                    {projectData.relatedProjects.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
                      >
                        <img
                          src={p.imageUrl}
                          className="w-16 h-12 object-cover rounded-md"
                          alt={p.title}
                        />
                        <div>
                          <p className="font-semibold text-sm">{p.title}</p>
                          <p className="text-xs text-gray-500">{p.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Roadmap Belajar yang Direkomendasikan
            </h2>
            <div className="space-y-6">
              {roadmapData.map((section) => {
                const style =
                  statusStyles[section.status as keyof typeof statusStyles];
                return (
                  <div key={section.id} className="flex items-start">
                    <div className="flex flex-col items-center mr-4 md:mr-6">
                      {style.icon}
                      <div className="w-px h-full bg-gray-300 mt-2"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className={`text-lg font-bold ${style.textColor}`}>
                          {section.title}
                        </h3>
                        <span className="text-sm text-gray-500 font-medium">
                          {section.totalHours} jam
                        </span>
                      </div>
                      <div
                        className={`space-y-3 p-4 rounded-lg border ${style.borderColor} ${style.bgColor}`}
                      >
                        {section.courses.map((course) => (
                          <div key={course.id} className="flex items-center">
                            <CheckCircle2
                              size={16}
                              className={`mr-3 flex-shrink-0 ${style.textColor}`}
                            />
                            <p
                              className={`text-sm font-medium ${style.textColor}`}
                            >
                              {course.title}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
          <Footer></Footer>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
            <div className="flex justify-between items-center p-5 border-b">
              <h2 className="text-xl font-bold">Formulir Pengajuan Proposal</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmitProposal} className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#584DFF]"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Alamat Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#584DFF]"
                />
              </div>
              <div>
                <label
                  htmlFor="portfolioUrl"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Link Portofolio / GitHub
                </label>
                <input
                  type="url"
                  name="portfolioUrl"
                  id="portfolioUrl"
                  required
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#584DFF]"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mengapa Anda Tertarik?
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#584DFF]"
                ></textarea>
              </div>
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#584DFF] text-white font-bold py-2.5 px-6 rounded-lg flex items-center"
                >
                  <Mail size={18} className="mr-2" />
                  Kirim Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetailPage;
