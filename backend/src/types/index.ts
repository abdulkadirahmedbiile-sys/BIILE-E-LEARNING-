export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  thumbnail?: string;
  price: number;
  studentCount: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl?: string;
  duration: number;
  order: number;
  resources?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: Date;
  totalPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  submissionUrl: string;
  grade?: number;
  feedback?: string;
  submittedAt: Date;
  gradedAt?: Date;
}

export interface Progress {
  id: string;
  studentId: string;
  courseId: string;
  lessonsCompleted: number;
  totalLessons: number;
  percentage: number;
  lastAccessedAt: Date;
}
