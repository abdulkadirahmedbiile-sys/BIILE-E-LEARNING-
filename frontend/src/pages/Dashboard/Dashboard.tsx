import { useEffect, useState } from 'react';
import { userAPI, courseAPI } from '../../services/api';
import { Course, User } from '../../types';
import { FiBook, FiUsers, FiTrendingUp } from 'react-icons/fi';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userRes = await userAPI.getProfile();
      setUser(userRes.data);

      const coursesRes = await userAPI.getCourses();
      setCourses(coursesRes.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome, {user?.firstName}! 👋</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Enrolled Courses</p>
                <p className="text-3xl font-bold text-blue-600">{courses.length}</p>
              </div>
              <FiBook className="text-4xl text-blue-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-green-600">{courses.reduce((a, c) => a + c.studentCount, 0)}</p>
              </div>
              <FiUsers className="text-4xl text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Average Rating</p>
                <p className="text-3xl font-bold text-yellow-600">{(courses.reduce((a, c) => a + c.rating, 0) / courses.length || 0).toFixed(1)}</p>
              </div>
              <FiTrendingUp className="text-4xl text-yellow-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Recent Courses */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Your Courses</h2>
          </div>
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {courses.map((course) => (
                <div key={course.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                  {course.thumbnail && (
                    <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">{course.level}</span>
                      <span className="text-yellow-500 font-semibold">⭐ {course.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-600">
              <p>No courses enrolled yet. Start learning today! 🚀</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
