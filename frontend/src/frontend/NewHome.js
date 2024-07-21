import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewHome = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); 

  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem('token'); 

      if (!token) {
        toast.error('No token found. Please login again.');
        navigate('/login', { replace: true });
        return;
      }

      await axios.post('http://localhost:5000/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      toast.success('Logout successful');
      localStorage.removeItem('token'); 

      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('An error occurred during logout');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex flex-col">
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-green-500">Welcome to NewHome</h1>
          {/* Menu Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block lg:hidden text-green-500 focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          {/* Navigation Links */}
          <nav className={`lg:flex lg:space-x-4 lg:items-center ${isOpen ? 'block' : 'hidden'} lg:block`}>
            <a href="#" className="text-green-500 hover:text-green-700 flex items-center mb-2 lg:mb-0">
              <FaHome className="mr-2" /> Home
            </a>
            <a href="#" className="text-green-500 hover:text-green-700 flex items-center mb-2 lg:mb-0">
              <FaUser className="mr-2" /> Profile
            </a>
            <button
              onClick={handleSignOut}
              className="text-green-500 hover:text-green-700 flex items-center"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-6 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Welcome to Your New Home Page</h2>
          <p className="text-gray-700">
            This is your new home page. Here you can find all the latest updates and access your profile, settings, and more.
          </p>
        </div>
      </main>
      <footer className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 text-center text-gray-700">
          &copy; 2024 Your Company. All rights reserved.
        </div>
      </footer>
      <ToastContainer />
    </div>
  );
};

export default NewHome;
