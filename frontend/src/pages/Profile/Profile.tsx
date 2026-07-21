import { useEffect, useState } from 'react';
import { userAPI } from '../../services/api';
import { User } from '../../types';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch profile', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

          {user && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <p className="text-gray-600 bg-gray-50 p-3 rounded">{user.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">First Name</label>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded">{user.firstName}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Last Name</label>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded">{user.lastName}</p>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Role</label>
                <p className="text-gray-600 bg-gray-50 p-3 rounded capitalize">{user.role}</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Member Since</label>
                <p className="text-gray-600 bg-gray-50 p-3 rounded">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>

              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
