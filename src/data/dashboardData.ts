import {
  Code,
  Briefcase,
  Camera,
  Palette,
  Music,
  TrendingUp,
  BookOpen,
  Target,
  Award,
  Users,
} from "lucide-react";
import type {
  Category,
  Course,
  Stat,
  Testimonial,
  Article,
  User,
} from "../types/index.ts";

export const currentUser: User = {
  name: "Nawwari",
  avatar: "/assets/profile.png",
  email: "john.doe@example.com",
};

export const categories: Category[] = [
  { name: "Development", icon: Code, color: "bg-purple-100 text-purple-600" },
  { name: "Business", icon: Briefcase, color: "bg-blue-100 text-blue-600" },
  { name: "Photography", icon: Camera, color: "bg-pink-100 text-pink-600" },
  { name: "Design", icon: Palette, color: "bg-green-100 text-green-600" },
  { name: "Music", icon: Music, color: "bg-yellow-100 text-yellow-600" },
  { name: "Marketing", icon: TrendingUp, color: "bg-red-100 text-red-600" },
  {
    name: "Content Writing",
    icon: BookOpen,
    color: "bg-indigo-100 text-indigo-600",
  },
  { name: "Finance", icon: Target, color: "bg-teal-100 text-teal-600" },
  { name: "Science", icon: Award, color: "bg-orange-100 text-orange-600" },
  { name: "Network", icon: Users, color: "bg-cyan-100 text-cyan-600" },
];

export const featuredCourses: Course[] = [
  {
    id: 1,
    title: "Complete Python Bootcamp: Go from zero to hero in Python",
    instructor: "Jose Portilla",
    rating: 4.6,
    students: 1234567,
    price: "$84.99",
    originalPrice: "$199.99",
    image: "/assets/image.png",
    category: "Development",
    level: "Beginner",
    duration: "22 hours",
  },
  {
    id: 2,
    title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    instructor: "Maximilian Schwarzmüller",
    rating: 4.8,
    students: 987654,
    price: "$89.99",
    originalPrice: "$179.99",
    image: "https://picsum.photos/300/200?random=1",
    category: "Development",
    level: "Intermediate",
    duration: "40 hours",
  },
  {
    id: 3,
    title: "The Complete Digital Marketing Course - 12 Courses in 1",
    instructor: "Daragh Walsh",
    rating: 4.5,
    students: 456789,
    price: "$94.99",
    originalPrice: "$199.99",
    image: "https://picsum.photos/300/200?random=2",
    category: "Marketing",
    level: "All Levels",
    duration: "36 hours",
  },
  {
    id: 4,
    title: "Photography Masterclass: Complete Guide to Photography",
    instructor: "Phil Ebiner",
    rating: 4.7,
    students: 234567,
    price: "$79.99",
    originalPrice: "$149.99",
    image: "https://picsum.photos/300/200?random=3",
    category: "Photography",
    level: "Beginner",
    duration: "25 hours",
  },
  {
    id: 5,
    title: "Graphic Design Masterclass - Learn GREAT Design",
    instructor: "Lindsay Marsh",
    rating: 4.6,
    students: 345678,
    price: "$89.99",
    originalPrice: "$179.99",
    image: "https://picsum.photos/300/200?random=4",
    category: "Design",
    level: "Intermediate",
    duration: "18 hours",
  },
  {
    id: 6,
    title: "The Complete Financial Analyst Course 2024",
    instructor: "Chris Haroun",
    rating: 4.5,
    students: 567890,
    price: "$94.99",
    originalPrice: "$199.99",
    image: "/assets/image2.png",
    category: "Finance",
    level: "Intermediate",
    duration: "30 hours",
  },
  {
    id: 7,
    title: "Complete Python Bootcamp: Go from zero to hero in Python",
    instructor: "Jose Portilla",
    rating: 4.6,
    students: 1234567,
    price: "$84.99",
    originalPrice: "$199.99",
    image: "/assets/image.png",
    category: "Development",
    level: "Beginner",
    duration: "22 hours",
  },
  {
    id: 8,
    title: "Complete Python Bootcamp: Go from zero to hero in Python",
    instructor: "Jose Portilla",
    rating: 4.6,
    students: 1234567,
    price: "$84.99",
    originalPrice: "$199.99",
    image: "/assets/image.png",
    category: "Development",
    level: "Beginner",
    duration: "22 hours",
  },
];

export const stats: Stat[] = [
  { number: "10K+", label: "Online Courses" },
  { number: "200+", label: "Expert Tutors" },
  { number: "60K+", label: "Online Students" },
  { number: "100%", label: "Satisfaction Rate" },
];

export const testimonials: Testimonial[] = [
  {
    name: "John Smith",
    feedback:
      "Outstanding quality of courses! The instructors are knowledgeable and the content is well-structured. Highly recommended!",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    feedback:
      "Great platform for learning. I've completed multiple courses and each one exceeded my expectations.",
    rating: 5,
  },
  {
    name: "Mike Davis",
    feedback:
      "User-friendly interface and excellent course content. Perfect for both beginners and advanced learners.",
    rating: 5,
  },
  {
    name: "Lisa Brown",
    feedback:
      "Affordable pricing and high-quality content. The best investment I've made in my professional development.",
    rating: 5,
  },
];

export const articles: Article[] = [
  {
    title: "Best Learning WordPress Theme For Education Website",
    date: "March 15, 2024",
    image: "https://picsum.photos/300/200?random=11",
    category: "Web Development",
  },
  {
    title: "How to Create Stunning Digital Art: A Beginner's Guide",
    date: "March 12, 2024",
    image: "https://picsum.photos/300/200?random=12",
    category: "Design",
  },
  {
    title: "Best JavaScript Frameworks to Learn in 2024",
    date: "March 10, 2024",
    image: "https://picsum.photos/300/200?random=10",
    category: "Programming",
  },
];

export const userData = {
  name: "Andi Pratama",
  photo:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80",
  bio: "Full Stack Developer | Open Source Enthusiast | Computer Science Student",
  status: "Mahasiswa",
  skills: [
    {
      name: "JavaScript",
      level: 80,
      verified: true,
    },
    {
      name: "React",
      level: 75,
      verified: true,
    },
    {
      name: "Node.js",
      level: 65,
      verified: true,
    },
    {
      name: "TypeScript",
      level: 60,
      verified: true,
    },
    {
      name: "Python",
      level: 50,
      verified: false,
    },
  ],
  contributions: [
    {
      project: "react-router",
      title: "Fix navigation bug in useHistory hook",
      prLink: "https://github.com/remix-run/react-router/pull/1234",
      date: "2023-03-15",
      status: "Merged",
    },
    {
      project: "tailwindcss",
      title: "Add new utility class for text truncation",
      prLink: "https://github.com/tailwindlabs/tailwindcss/pull/5678",
      date: "2023-02-10",
      status: "Merged",
    },
    {
      project: "vite",
      title: "Improve error handling in dev server",
      prLink: "https://github.com/vitejs/vite/pull/9012",
      date: "2023-04-05",
      status: "In Review",
    },
  ],
  certificates: [
    {
      name: "Frontend Developer Path",
      issuer: "CodeCourse",
      date: "2023-01-15",
      image:
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80",
    },
    {
      name: "React Advanced",
      issuer: "CodeCourse",
      date: "2022-11-20",
      image:
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80",
    },
  ],
};
export const roadmapsData = [
  {
    id: 1,
    title: "Frontend Developer",
    progress: 75,
    totalModules: 12,
    completedModules: 9,
    status: "in-progress",
    image:
      "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    nextLesson: {
      title: "Advanced React Hooks",
      duration: "45 menit",
    },
  },
  {
    id: 2,
    title: "Backend Developer",
    progress: 40,
    totalModules: 10,
    completedModules: 4,
    status: "in-progress",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    nextLesson: {
      title: "Database Optimization",
      duration: "60 menit",
    },
  },
  {
    id: 3,
    title: "UI/UX Design",
    progress: 100,
    totalModules: 8,
    completedModules: 8,
    status: "completed",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    completionDate: "10 Feb 2023",
  },
];
export const projectRecommendations = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Develop a modern e-commerce platform with React and Node.js",
    difficulty: "Menengah",
    matchPercentage: 95,
    skills: ["React", "Node.js", "JavaScript"],
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Create a drag-and-drop task management application",
    difficulty: "Pemula",
    matchPercentage: 90,
    skills: ["JavaScript", "React"],
    image:
      "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    title: "API Authentication Service",
    description: "Implement secure API authentication with JWT",
    difficulty: "Menengah",
    matchPercentage: 85,
    skills: ["Node.js", "JavaScript"],
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
  },
];
export const applicationStatus = [
  {
    id: 1,
    project: "Open Source CMS",
    status: "Diterima",
    date: "1 hari yang lalu",
    message: "Selamat! Anda telah diterima sebagai kontributor.",
    unread: true,
  },
  {
    id: 2,
    project: "Mobile App Framework",
    status: "Dalam Review",
    date: "3 hari yang lalu",
    message: "Tim sedang mengevaluasi aplikasi Anda.",
    unread: false,
  },
  {
    id: 3,
    project: "Database Client",
    status: "Butuh Revisi",
    date: "1 minggu yang lalu",
    message: "Mohon perbaiki beberapa bagian pada kode Anda.",
    unread: false,
  },
];
