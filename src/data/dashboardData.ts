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
