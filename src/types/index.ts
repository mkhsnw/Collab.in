import type { ComponentType } from 'react';

export interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  price: string;
  originalPrice: string;
  image: string;
  category: string;
  level: string;
  duration: string;
}

export interface Category {
  name: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
}

export interface Stat {
  number: string;
  label: string;
}

export interface Testimonial {
  name: string;
  feedback: string;
  rating: number;
}

export interface Article {
  title: string;
  date: string;
  image: string;
  category: string;
}

export interface User {
  name: string;
  avatar: string;
  email: string;
}