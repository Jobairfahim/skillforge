/**
 * SkillForge Mock API Service Layer
 * Drop-in ready for real backend integration — just swap the mock implementations.
 */

import {
  mockCourses,
  mockEnrollments,
  mockCurrentUser,
  mockInstructors,
  mockRevenueData,
  mockDashboardStats,
} from '@/lib/mock-data';
import { sleep } from '@/lib/utils';
import type {
  Course, User, Enrollment, DashboardStats, RevenueData,
  FilterState, PaginationState, LoginForm, RegisterForm
} from '@/types';

// ─── Auth Service ─────────────────────────────────────────────────────────────
export const authService = {
  async login(data: LoginForm): Promise<{ user: User; token: string }> {
    await sleep(1200);
    return { user: mockCurrentUser, token: 'mock-jwt-token-xyz' };
  },

  async register(data: RegisterForm): Promise<{ user: User; token: string }> {
    await sleep(1500);
    const newUser: User = {
      id: `u_${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      joinedAt: new Date().toISOString(),
    };
    return { user: newUser, token: 'mock-jwt-token-new' };
  },

  async logout(): Promise<void> {
    await sleep(300);
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    await sleep(1000);
    return { message: `Reset link sent to ${email}` };
  },

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    await sleep(1000);
    return { message: 'Password updated successfully' };
  },

  async getMe(): Promise<User> {
    await sleep(400);
    return mockCurrentUser;
  },
};

// ─── Course Service ───────────────────────────────────────────────────────────
export const courseService = {
  async getCourses(filters?: Partial<FilterState>, pagination?: Partial<PaginationState>): Promise<{
    courses: Course[];
    total: number;
    page: number;
    limit: number;
  }> {
    await sleep(600);
    let result = [...mockCourses];

    if (filters?.search) {
      result = result.filter(c =>
        c.title.toLowerCase().includes(filters.search!.toLowerCase()) ||
        c.instructor.name.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }
    if (filters?.category && filters.category !== 'All') {
      result = result.filter(c => c.category === filters.category);
    }
    if (filters?.level && filters.level !== 'All Levels') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result = result.filter(c => c.level === (filters.level as any));
    }

    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 12;
    const total = result.length;
    const paginated = result.slice((page - 1) * limit, page * limit);

    return { courses: paginated, total, page, limit };
  },

  async getCourseBySlug(slug: string): Promise<Course | null> {
    await sleep(400);
    return mockCourses.find(c => c.slug === slug) ?? null;
  },

  async getCourseById(id: string): Promise<Course | null> {
    await sleep(400);
    return mockCourses.find(c => c.id === id) ?? null;
  },

  async getFeaturedCourses(): Promise<Course[]> {
    await sleep(500);
    return mockCourses.filter(c => c.isFeatured).slice(0, 6);
  },

  async getCoursesByCategory(category: string): Promise<Course[]> {
    await sleep(400);
    return mockCourses.filter(c => c.category === category);
  },

  async searchCourses(query: string): Promise<Course[]> {
    await sleep(300);
    const q = query.toLowerCase();
    return mockCourses.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q))
    );
  },

  async enrollInCourse(courseId: string, userId: string): Promise<Enrollment> {
    await sleep(800);
    const course = mockCourses.find(c => c.id === courseId)!;
    return {
      id: `e_${Date.now()}`,
      courseId,
      course,
      userId,
      enrolledAt: new Date().toISOString(),
      progress: 0,
      completedLessons: [],
      lastAccessedAt: new Date().toISOString(),
    };
  },

  async createCourse(data: Partial<Course>): Promise<Course> {
    await sleep(1200);
    const newCourse: Course = {
      ...mockCourses[0],
      ...data,
      id: `c_${Date.now()}`,
      status: 'draft',
      createdAt: new Date().toISOString(),
    } as Course;
    return newCourse;
  },

  async updateCourse(id: string, data: Partial<Course>): Promise<Course> {
    await sleep(800);
    const course = mockCourses.find(c => c.id === id)!;
    return { ...course, ...data };
  },

  async deleteCourse(id: string): Promise<{ success: boolean }> {
    await sleep(600);
    return { success: true };
  },

  async publishCourse(id: string): Promise<Course> {
    await sleep(1000);
    const course = mockCourses.find(c => c.id === id)!;
    return { ...course, status: 'published' };
  },
};

// ─── Enrollment Service ───────────────────────────────────────────────────────
export const enrollmentService = {
  async getUserEnrollments(userId: string): Promise<Enrollment[]> {
    await sleep(500);
    return mockEnrollments.filter(e => e.userId === userId);
  },

  async updateProgress(enrollmentId: string, lessonId: string): Promise<Enrollment> {
    await sleep(300);
    const enrollment = mockEnrollments.find(e => e.id === enrollmentId)!;
    const completedLessons = [...enrollment.completedLessons, lessonId];
    const totalLessons = enrollment.course.sections.reduce((a, s) => a + s.lessons.length, 0);
    const progress = Math.round((completedLessons.length / totalLessons) * 100);
    return {
      ...enrollment,
      completedLessons,
      progress,
      lastAccessedAt: new Date().toISOString(),
    };
  },

  async issueCertificate(enrollmentId: string): Promise<{ certificateUrl: string }> {
    await sleep(1500);
    return { certificateUrl: `/certificates/${enrollmentId}.pdf` };
  },
};

// ─── Dashboard Service ────────────────────────────────────────────────────────
export const dashboardService = {
  async getStudentStats(userId: string): Promise<{
    enrolled: number;
    completed: number;
    hoursLearned: number;
    avgProgress: number;
  }> {
    await sleep(500);
    const enrollments = mockEnrollments.filter(e => e.userId === userId);
    return {
      enrolled: enrollments.length,
      completed: enrollments.filter(e => e.progress === 100).length,
      hoursLearned: 47,
      avgProgress: Math.round(enrollments.reduce((a, e) => a + e.progress, 0) / enrollments.length),
    };
  },

  async getInstructorStats(instructorId: string): Promise<DashboardStats> {
    await sleep(600);
    return mockDashboardStats;
  },

  async getRevenueData(instructorId: string, period: '3m' | '6m' | '12m'): Promise<RevenueData[]> {
    await sleep(500);
    const count = period === '3m' ? 3 : period === '6m' ? 6 : 12;
    return mockRevenueData.slice(-count);
  },

  async getAdminStats(): Promise<DashboardStats & { pendingCourses: number; totalInstructors: number }> {
    await sleep(600);
    return {
      ...mockDashboardStats,
      totalStudents: mockDashboardStats.totalStudents + 1200,
      pendingCourses: 3,
      totalInstructors: 350,
    };
  },
};

// ─── User Service ─────────────────────────────────────────────────────────────
export const userService = {
  async getUsers(page = 1, limit = 20): Promise<{ users: User[]; total: number }> {
    await sleep(600);
    return { users: [mockCurrentUser], total: 1 };
  },

  async getUserById(id: string): Promise<User | null> {
    await sleep(400);
    return id === mockCurrentUser.id ? mockCurrentUser : null;
  },

  async updateProfile(id: string, data: Partial<User>): Promise<User> {
    await sleep(700);
    return { ...mockCurrentUser, ...data };
  },

  async updatePassword(id: string, currentPassword: string, newPassword: string): Promise<{ success: boolean }> {
    await sleep(800);
    return { success: true };
  },

  async suspendUser(id: string): Promise<{ success: boolean }> {
    await sleep(500);
    return { success: true };
  },
};

// ─── Review Service ───────────────────────────────────────────────────────────
export const reviewService = {
  async addReview(courseId: string, userId: string, data: { rating: number; comment: string }) {
    await sleep(600);
    return {
      id: `r_${Date.now()}`,
      courseId, userId,
      rating: data.rating,
      comment: data.comment,
      user: { name: mockCurrentUser.name, avatar: mockCurrentUser.avatar ?? '' },
      date: new Date().toISOString(),
      helpful: 0,
    };
  },

  async markHelpful(reviewId: string): Promise<{ helpful: number }> {
    await sleep(300);
    return { helpful: Math.floor(Math.random() * 100) };
  },
};

// ─── Notification Service ─────────────────────────────────────────────────────
export const notificationService = {
  async getNotifications(userId: string) {
    await sleep(400);
    const { mockNotifications } = await import('@/lib/mock-data');
    return mockNotifications;
  },

  async markRead(notificationId: string): Promise<{ success: boolean }> {
    await sleep(200);
    return { success: true };
  },

  async markAllRead(userId: string): Promise<{ success: boolean }> {
    await sleep(400);
    return { success: true };
  },
};
