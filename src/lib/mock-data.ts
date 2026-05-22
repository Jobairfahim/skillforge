import type { Course, User, Enrollment, RevenueData, CategoryStat, DashboardStats, Notification } from '@/types';

// ─── Instructors ──────────────────────────────────────────────────────────────
export const mockInstructors = [
  {
    id: 'i1',
    name: 'Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    title: 'Senior Frontend Engineer @ Google',
    rating: 4.9,
    students: 42500,
    courses: 8,
    bio: 'Experienced frontend engineer with 10+ years building scalable web applications.'
  },
  {
    id: 'i2',
    name: 'Marcus Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
    title: 'Full Stack Developer & Educator',
    rating: 4.8,
    students: 31200,
    courses: 12,
    bio: 'Passionate educator helping developers level up their skills.'
  },
  {
    id: 'i3',
    name: 'Priya Sharma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
    title: 'AI/ML Engineer @ OpenAI',
    rating: 4.9,
    students: 58000,
    courses: 6,
    bio: 'Making machine learning accessible to everyone.'
  },
  {
    id: 'i4',
    name: 'David Park',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    title: 'Cloud Architect @ AWS',
    rating: 4.7,
    students: 22100,
    courses: 5,
    bio: 'Cloud solutions expert helping companies scale globally.'
  },
];

// ─── Courses ──────────────────────────────────────────────────────────────────
export const mockCourses: Course[] = [
  {
    id: 'c1',
    title: 'Complete React 19 & Next.js 15 Masterclass',
    slug: 'react-nextjs-masterclass',
    description: 'Master modern React and Next.js from scratch. Build production-ready apps with the latest features including Server Components, Streaming, and the App Router.',
    shortDescription: 'Master React 19 & Next.js 15 with hands-on projects',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    instructor: mockInstructors[0],
    category: 'Web Development',
    subcategory: 'React',
    tags: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'],
    price: 89.99,
    originalPrice: 199.99,
    rating: 4.9,
    reviewCount: 3421,
    studentCount: 18750,
    duration: '52h 30m',
    level: 'Intermediate',
    language: 'English',
    lastUpdated: '2024-12-01',
    sections: [
      {
        id: 's1', title: 'Getting Started', duration: '2h 15m',
        lessons: [
          { id: 'l1', title: 'Welcome & Course Overview', duration: '5:30', type: 'video', isPreview: true, isCompleted: true },
          { id: 'l2', title: 'Setting Up Your Dev Environment', duration: '12:45', type: 'video', isPreview: true, isCompleted: true },
          { id: 'l3', title: 'React 19 New Features Overview', duration: '18:20', type: 'video', isPreview: false, isCompleted: false },
        ]
      },
      {
        id: 's2', title: 'React Fundamentals', duration: '8h 45m',
        lessons: [
          { id: 'l4', title: 'JSX Deep Dive', duration: '22:10', type: 'video', isPreview: false, isCompleted: false },
          { id: 'l5', title: 'Components & Props', duration: '35:00', type: 'video', isPreview: false, isCompleted: false },
          { id: 'l6', title: 'State & Hooks', duration: '45:20', type: 'video', isPreview: false, isCompleted: false },
          { id: 'l7', title: 'React Quiz', duration: '15:00', type: 'quiz', isPreview: false, isCompleted: false },
        ]
      },
      {
        id: 's3', title: 'Next.js 15 App Router', duration: '12h 20m',
        lessons: [
          { id: 'l8', title: 'App Router Architecture', duration: '28:15', type: 'video', isPreview: false },
          { id: 'l9', title: 'Server vs Client Components', duration: '42:00', type: 'video', isPreview: false },
          { id: 'l10', title: 'Data Fetching Patterns', duration: '38:30', type: 'video', isPreview: false },
        ]
      }
    ],
    learningOutcomes: [
      'Build full-stack apps with Next.js 15 App Router',
      'Master React 19 Server Components',
      'Implement authentication with NextAuth',
      'Deploy to Vercel with CI/CD',
    ],
    requirements: ['Basic JavaScript knowledge', 'HTML & CSS fundamentals'],
    status: 'published',
    isFeatured: true,
    isBestseller: true,
    certificate: true,
    createdAt: '2024-06-01',
    reviews: [
      { id: 'r1', user: { name: 'Alex Kim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex' }, rating: 5, comment: 'Absolutely incredible course! Sarah explains complex concepts in a way that just clicks.', date: '2024-11-15', helpful: 234 },
      { id: 'r2', user: { name: 'Emma Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma' }, rating: 5, comment: 'Best React course on the internet, period. Already landed a job with this knowledge!', date: '2024-11-10', helpful: 187 },
      { id: 'r3', user: { name: 'Carlos Rodriguez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos' }, rating: 4, comment: 'Really comprehensive content. A few sections could be tightened up but overall fantastic.', date: '2024-10-28', helpful: 92 },
    ] as any
  },
  {
    id: 'c2',
    title: 'Python for Machine Learning & AI: Complete Bootcamp',
    slug: 'python-ml-ai-bootcamp',
    description: 'From Python basics to advanced ML algorithms. Build real AI projects including chatbots, image classifiers, and recommendation systems.',
    shortDescription: 'Master ML & AI from fundamentals to production',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=80',
    instructor: mockInstructors[2],
    category: 'Data Science',
    subcategory: 'Machine Learning',
    tags: ['Python', 'ML', 'TensorFlow', 'PyTorch', 'AI'],
    price: 94.99,
    originalPrice: 229.99,
    rating: 4.9,
    reviewCount: 5821,
    studentCount: 34200,
    duration: '68h 15m',
    level: 'Beginner',
    language: 'English',
    lastUpdated: '2024-11-15',
    sections: [
      {
        id: 's1', title: 'Python Fundamentals', duration: '10h 00m',
        lessons: [
          { id: 'l1', title: 'Python Setup & Basics', duration: '20:00', type: 'video', isPreview: true },
          { id: 'l2', title: 'Data Types & Structures', duration: '35:00', type: 'video', isPreview: false },
        ]
      }
    ],
    learningOutcomes: ['Build ML models from scratch', 'Use TensorFlow & PyTorch', 'Deploy AI to production'],
    requirements: ['No prior programming experience needed'],
    status: 'published',
    isFeatured: true,
    isNew: false,
    isBestseller: true,
    certificate: true,
    createdAt: '2024-03-01',
    reviews: [] as any
  },
  {
    id: 'c3',
    title: 'AWS Solutions Architect Professional Certification',
    slug: 'aws-solutions-architect',
    description: 'Complete prep for AWS SAP-C02 exam. Covers all AWS services with hands-on labs and practice exams.',
    shortDescription: 'Pass the AWS SAP-C02 with confidence',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    instructor: mockInstructors[3],
    category: 'Cloud Computing',
    subcategory: 'AWS',
    tags: ['AWS', 'Cloud', 'DevOps', 'Architecture'],
    price: 79.99,
    originalPrice: 179.99,
    rating: 4.7,
    reviewCount: 2103,
    studentCount: 12400,
    duration: '44h 00m',
    level: 'Advanced',
    language: 'English',
    lastUpdated: '2024-10-20',
    sections: [],
    learningOutcomes: ['Design highly available AWS architectures', 'Pass SAP-C02 on first attempt'],
    requirements: ['AWS Cloud Practitioner or equivalent experience'],
    status: 'published',
    isFeatured: false,
    isNew: true,
    certificate: true,
    createdAt: '2024-05-01',
    reviews: [] as any
  },
  {
    id: 'c4',
    title: 'UI/UX Design Masterclass: Figma to Production',
    slug: 'ux-design-figma-masterclass',
    description: 'Learn product design from zero to hero. Master Figma, design systems, user research, and prototyping.',
    shortDescription: 'Design stunning products with Figma & modern UX principles',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=80',
    instructor: mockInstructors[1],
    category: 'Design',
    subcategory: 'UI/UX',
    tags: ['Figma', 'UI Design', 'UX', 'Prototyping'],
    price: 69.99,
    originalPrice: 149.99,
    rating: 4.8,
    reviewCount: 1876,
    studentCount: 9800,
    duration: '38h 45m',
    level: 'Beginner',
    language: 'English',
    lastUpdated: '2024-11-01',
    sections: [],
    learningOutcomes: ['Create professional design systems', 'Master Figma from scratch'],
    requirements: ['No design experience needed'],
    status: 'published',
    isFeatured: true,
    isNew: false,
    certificate: true,
    createdAt: '2024-04-01',
    reviews: [] as any
  },
  {
    id: 'c5',
    title: 'Node.js & Express: Backend Development Bootcamp',
    slug: 'nodejs-express-bootcamp',
    description: 'Build scalable REST APIs with Node.js, Express, MongoDB, and PostgreSQL. Learn authentication, testing, and deployment.',
    shortDescription: 'Build production-ready APIs with Node.js',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    instructor: mockInstructors[1],
    category: 'Web Development',
    subcategory: 'Backend',
    tags: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST API'],
    price: 74.99,
    originalPrice: 159.99,
    rating: 4.8,
    reviewCount: 2540,
    studentCount: 15600,
    duration: '46h 20m',
    level: 'Intermediate',
    language: 'English',
    lastUpdated: '2024-10-05',
    sections: [],
    learningOutcomes: ['Build RESTful APIs', 'Implement JWT authentication', 'Deploy to production'],
    requirements: ['Basic JavaScript knowledge'],
    status: 'published',
    isBestseller: false,
    certificate: true,
    createdAt: '2024-02-01',
    reviews: [] as any
  },
  {
    id: 'c6',
    title: 'Kubernetes & Docker: Complete DevOps Bootcamp',
    slug: 'kubernetes-docker-devops',
    description: 'Master containerization with Docker and orchestration with Kubernetes. Build CI/CD pipelines with GitHub Actions.',
    shortDescription: 'Master Docker, Kubernetes & modern DevOps',
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80',
    instructor: mockInstructors[3],
    category: 'DevOps',
    subcategory: 'Kubernetes',
    tags: ['Docker', 'Kubernetes', 'CI/CD', 'DevOps'],
    price: 84.99,
    originalPrice: 189.99,
    rating: 4.7,
    reviewCount: 1432,
    studentCount: 8900,
    duration: '41h 10m',
    level: 'Intermediate',
    language: 'English',
    lastUpdated: '2024-09-15',
    sections: [],
    learningOutcomes: ['Deploy containers with Docker', 'Manage Kubernetes clusters', 'Build CI/CD pipelines'],
    requirements: ['Linux command line basics', 'Basic web development knowledge'],
    status: 'published',
    isNew: true,
    certificate: true,
    createdAt: '2024-07-01',
    reviews: [] as any
  },
];

// ─── Categories ───────────────────────────────────────────────────────────────
export const mockCategories = [
  { id: 'cat1', name: 'Web Development', icon: '💻', count: 342, color: 'from-blue-500 to-cyan-500' },
  { id: 'cat2', name: 'Data Science', icon: '📊', count: 218, color: 'from-purple-500 to-pink-500' },
  { id: 'cat3', name: 'Design', icon: '🎨', count: 185, color: 'from-orange-500 to-red-500' },
  { id: 'cat4', name: 'Cloud Computing', icon: '☁️', count: 156, color: 'from-cyan-500 to-blue-500' },
  { id: 'cat5', name: 'Mobile Dev', icon: '📱', count: 134, color: 'from-green-500 to-teal-500' },
  { id: 'cat6', name: 'DevOps', icon: '⚙️', count: 112, color: 'from-yellow-500 to-orange-500' },
  { id: 'cat7', name: 'Cybersecurity', icon: '🔒', count: 98, color: 'from-red-500 to-rose-500' },
  { id: 'cat8', name: 'Blockchain', icon: '⛓️', count: 67, color: 'from-indigo-500 to-purple-500' },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const mockTestimonials = [
  {
    id: 't1',
    name: 'Jennifer Lee',
    role: 'Frontend Developer @ Stripe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jennifer',
    text: 'SkillForge completely transformed my career. I went from a junior dev to a senior role at Stripe in just 8 months using the React and System Design courses.',
    rating: 5,
    course: 'React Masterclass',
  },
  {
    id: 't2',
    name: 'Michael Torres',
    role: 'ML Engineer @ Tesla',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
    text: 'The ML bootcamp is unmatched. Real-world projects, excellent code reviews, and a supportive community. Worth every penny.',
    rating: 5,
    course: 'ML & AI Bootcamp',
  },
  {
    id: 't3',
    name: 'Aisha Okafor',
    role: 'Cloud Architect @ Microsoft',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aisha',
    text: 'Passed my AWS certification on the first try! The hands-on labs and mock exams were exactly what I needed. Highly recommend.',
    rating: 5,
    course: 'AWS Architect',
  },
  {
    id: 't4',
    name: 'Ryan Nakamura',
    role: 'Product Designer @ Figma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ryan',
    text: 'As someone who switched from engineering to design, the UX course gave me exactly the foundation I needed. The Figma projects are top notch.',
    rating: 5,
    course: 'UI/UX Masterclass',
  },
];

// ─── Enrollments ──────────────────────────────────────────────────────────────
export const mockEnrollments: Enrollment[] = [
  {
    id: 'e1', courseId: 'c1', course: mockCourses[0], userId: 'u1',
    enrolledAt: '2024-09-01', progress: 68, completedLessons: ['l1', 'l2', 'l3', 'l4'],
    lastAccessedAt: '2024-12-01',
  },
  {
    id: 'e2', courseId: 'c2', course: mockCourses[1], userId: 'u1',
    enrolledAt: '2024-10-15', progress: 32, completedLessons: ['l1'],
    lastAccessedAt: '2024-11-28',
  },
  {
    id: 'e3', courseId: 'c4', course: mockCourses[3], userId: 'u1',
    enrolledAt: '2024-08-01', progress: 100, completedLessons: [],
    lastAccessedAt: '2024-10-15', certificateIssued: true, completedAt: '2024-10-15',
  },
];

// ─── Revenue Data ─────────────────────────────────────────────────────────────
export const mockRevenueData: RevenueData[] = [
  { month: 'Jan', revenue: 4200, enrollments: 48 },
  { month: 'Feb', revenue: 5800, enrollments: 65 },
  { month: 'Mar', revenue: 7200, enrollments: 82 },
  { month: 'Apr', revenue: 6100, enrollments: 70 },
  { month: 'May', revenue: 8900, enrollments: 98 },
  { month: 'Jun', revenue: 11200, enrollments: 124 },
  { month: 'Jul', revenue: 9800, enrollments: 108 },
  { month: 'Aug', revenue: 13400, enrollments: 147 },
  { month: 'Sep', revenue: 15200, enrollments: 168 },
  { month: 'Oct', revenue: 18600, enrollments: 203 },
  { month: 'Nov', revenue: 21000, enrollments: 231 },
  { month: 'Dec', revenue: 24800, enrollments: 275 },
];

export const mockCategoryStats: CategoryStat[] = [
  { name: 'Web Dev', courses: 8, students: 42300, color: '#6366f1' },
  { name: 'Data Science', courses: 3, students: 28100, color: '#8b5cf6' },
  { name: 'Design', courses: 2, students: 14200, color: '#06b6d4' },
  { name: 'Cloud', courses: 2, students: 11800, color: '#10b981' },
  { name: 'DevOps', courses: 1, students: 8200, color: '#f59e0b' },
];

export const mockDashboardStats: DashboardStats = {
  totalStudents: 104600,
  totalCourses: 16,
  totalRevenue: 284500,
  avgRating: 4.8,
  growth: { students: 24, courses: 3, revenue: 31, rating: 0.2 },
};

// ─── Notifications ────────────────────────────────────────────────────────────
export const mockNotifications: Notification[] = [
  { id: 'n1', type: 'success', title: 'New enrollment', message: 'Sarah M. enrolled in React Masterclass', read: false, createdAt: '2024-12-01T10:30:00' },
  { id: 'n2', type: 'info', title: 'Course review', message: 'Your course received a new 5-star review', read: false, createdAt: '2024-12-01T09:15:00' },
  { id: 'n3', type: 'warning', title: 'Payout pending', message: 'Your November payout is being processed', read: true, createdAt: '2024-11-30T16:00:00' },
  { id: 'n4', type: 'success', title: 'Certificate issued', message: 'You earned a certificate for UI/UX Masterclass', read: true, createdAt: '2024-11-28T12:00:00' },
];

export const mockCurrentUser: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@skillforge.io',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex2',
  role: 'student',
  bio: 'Full-stack developer passionate about learning new technologies.',
  joinedAt: '2024-06-01',
  coursesEnrolled: 3,
};

export const mockInstructorUser: User = {
  id: 'i1',
  name: 'Sarah Chen',
  email: 'sarah@skillforge.io',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
  role: 'instructor',
  bio: 'Senior Frontend Engineer @ Google. Teaching React & Next.js.',
  joinedAt: '2023-01-15',
  coursesCreated: 8,
  totalStudents: 42500,
  totalRevenue: 284500,
};
