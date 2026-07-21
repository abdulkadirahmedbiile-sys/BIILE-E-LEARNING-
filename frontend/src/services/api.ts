import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (email: string, password: string, firstName: string, lastName: string) =>
    apiClient.post('/auth/register', { email, password, firstName, lastName }),
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  verify: () => apiClient.get('/auth/verify'),
};

// User API
export const userAPI = {
  getProfile: () => apiClient.get('/users/profile'),
  updateProfile: (data: any) => apiClient.put('/users/profile', data),
  getCourses: () => apiClient.get('/users/courses'),
};

// Course API
export const courseAPI = {
  getAll: (params?: any) => apiClient.get('/courses', { params }),
  getById: (id: string) => apiClient.get(`/courses/${id}`),
  create: (data: any) => apiClient.post('/courses', data),
  update: (id: string, data: any) => apiClient.put(`/courses/${id}`, data),
  enroll: (courseId: string) => apiClient.post(`/courses/${courseId}/enroll`),
};

// Lesson API
export const lessonAPI = {
  getByCourse: (courseId: string) => apiClient.get(`/lessons/course/${courseId}`),
  getById: (id: string) => apiClient.get(`/lessons/${id}`),
  create: (data: any) => apiClient.post('/lessons', data),
  complete: (lessonId: string) => apiClient.post(`/lessons/${lessonId}/complete`),
};

// Assignment API
export const assignmentAPI = {
  getByCourse: (courseId: string) => apiClient.get(`/assignments/course/${courseId}`),
  create: (data: any) => apiClient.post('/assignments', data),
  submit: (assignmentId: string, submissionUrl: string) =>
    apiClient.post(`/assignments/${assignmentId}/submit`, { submissionUrl }),
  grade: (submissionId: string, grade: number, feedback: string) =>
    apiClient.put(`/assignments/submission/${submissionId}/grade`, { grade, feedback }),
};

export default apiClient;
