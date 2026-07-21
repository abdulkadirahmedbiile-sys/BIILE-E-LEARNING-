import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiMenu, FiX, FiHome, FiBook, FiUser } from 'react-icons/fi';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <div className="text-2xl font-bold">BIILE</div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-1 hover:bg-blue-700 px-3 py-2 rounded"
            >
              <FiHome /> <span>Dashboard</span>
            </button>
            <button
              onClick={() => navigate('/courses')}
              className="flex items-center space-x-1 hover:bg-blue-700 px-3 py-2 rounded"
            >
              <FiBook /> <span>Courses</span>
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center space-x-1 hover:bg-blue-700 px-3 py-2 rounded"
            >
              <FiUser /> <span>Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 px-3 py-2 rounded"
            >
              <FiLogOut /> <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700">
          <button
            onClick={() => {
              navigate('/');
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-blue-800"
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              navigate('/courses');
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-blue-800"
          >
            Courses
          </button>
          <button
            onClick={() => {
              navigate('/profile');
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-blue-800"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-red-600 bg-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
