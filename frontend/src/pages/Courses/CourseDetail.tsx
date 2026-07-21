import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { courseAPI, lessonAPI } from '../../services/api';
import { Course, Lesson } from '../../types';
import { FiPlay, FiClock } from 'react-icons/fi';

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [courseId]);

  const fetchData = async () => {
    try {
      if (courseId) {
        const courseRes = await courseAPI.getById(courseId);
        setCourse(courseRes.data);

        const lessonsRes = await lessonAPI.getByCourse(courseId);
        setLessons(lessonsRes.data);
      }
    } catch (error) {
      console.error('Failed to fetch course details', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!course) {
    return <div className="flex items-center justify-center min-h-screen">Course not found</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          {course.thumbnail && (
            <img src={course.thumbnail} alt={course.title} className="w-full h-96 object-cover" />
          )}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{course.title}</h1>
            <p className="text-gray-600 text-lg mb-6">{course.description}</p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded font-semibold">Level: {course.level}</div>
              <div className="bg-green-100 text-green-600 px-4 py-2 rounded font-semibold">{course.studentCount} Students</div>
              <div className="bg-yellow-100 text-yellow-600 px-4 py-2 rounded font-semibold">⭐ {course.rating.toFixed(1)}</div>
              <div className="bg-purple-100 text-purple-600 px-4 py-2 rounded font-semibold">${course.price}</div>
            </div>
          </div>
        </div>

        {/* Lessons */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Lessons ({lessons.length})</h2>
          </div>
          {lessons.length > 0 ? (
            <div className="divide-y">
              {lessons.map((lesson, index) => (
                <div key={lesson.id} className="p-6 hover:bg-gray-50 transition cursor-pointer flex items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FiPlay className="text-blue-600" />
                      <span className="text-sm font-semibold text-gray-600">Lesson {index + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{lesson.title}</h3>
                    <div className="flex items-center gap-4 text-gray-600">
                      <span className="flex items-center gap-1">
                        <FiClock size={16} /> {lesson.duration} min
                      </span>
                      {lesson.resources && lesson.resources.length > 0 && (
                        <span>{lesson.resources.length} resources</span>
                      )}
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
                    Start Lesson
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-600">No lessons yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
