// ─── User & Auth ──────────────────────────────────────────────────────────────
export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  bio?: string;
  joinedAt: string;
  coursesEnrolled?: number;
  coursesCreated?: number;
  totalStudents?: number;
  totalRevenue?: number;
}

// ─── Course ───────────────────────────────────────────────────────────────────
export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
export type CourseStatus = 'draft' | 'published' | 'archived' | 'pending';

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  rating: number;
  students: number;
  courses: number;
  bio: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'article' | 'quiz' | 'assignment';
  isPreview: boolean;
  isCompleted?: boolean;
  videoUrl?: string;
  resources?: Resource[];
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
  duration: string;
}

export interface Review {
  id: string;
  user: { name: string; avatar: string };
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface Resource {
  id: string;
  name: string;
  type: 'pdf' | 'zip' | 'link' | 'code';
  url: string;
  size?: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  previewVideo?: string;
  instructor: Instructor;
  category: string;
  subcategory?: string;
  tags: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  studentCount: number;
  duration: string;
  level: CourseLevel;
  language: string;
  lastUpdated: string;
  sections: Section[];
  learningOutcomes: string[];
  requirements: string[];
  status: CourseStatus;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  certificate: boolean;
  createdAt: string;
}

// ─── Enrollment & Progress ────────────────────────────────────────────────────
export interface Enrollment {
  id: string;
  courseId: string;
  course: Course;
  userId: string;
  enrolledAt: string;
  progress: number;
  completedLessons: string[];
  lastAccessedAt: string;
  certificateIssued?: boolean;
  completedAt?: string;
}

// ─── Analytics ────────────────────────────────────────────────────────────────
export interface RevenueData {
  month: string;
  revenue: number;
  enrollments: number;
}

export interface CategoryStat {
  name: string;
  courses: number;
  students: number;
  color: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  totalRevenue: number;
  avgRating: number;
  growth: {
    students: number;
    courses: number;
    revenue: number;
    rating: number;
  };
}

// ─── Notification ─────────────────────────────────────────────────────────────
export interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// ─── UI ───────────────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: number;
  children?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}

export interface FilterState {
  search: string;
  category: string;
  level: string;
  priceRange: [number, number];
  rating: number;
  sortBy: string;
}

// ─── Forms ────────────────────────────────────────────────────────────────────
export interface LoginForm {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  agreeToTerms: boolean;
}

export interface CourseForm {
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  level: CourseLevel;
  price: number;
  language: string;
  tags: string[];
  learningOutcomes: string[];
  requirements: string[];
}
