import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../Redux/Register/registerSlice';
import { FaUser, FaLock } from 'react-icons/fa';
import { IoLogoGoogle } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate,Navigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // Track registration status

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      navigate('/newhome', { replace: true });
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        password,
        email,
      });

      if (response.status === 201) {
        const data = response.data;
        alert('User registered successfully');
        dispatch(registerUser({ username, password, email }));
        setIsRegistered(true); // Update registration status
      } else {
        toast.error('Failed to register user');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error(`Error: ${error.response ? error.response.data.error : error.message}`);
    }
  };

  // Redirect to login page after registration
  if (isRegistered) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-pink-600">
      <ToastContainer /> {/* Toast notifications */}
      <form onSubmit={handleSubmit} className="bg-purple p-8 rounded-lg">
        <div className="flex justify-center mb-4">
          <div className="w-40 h-40 mb-4 rounded-full border-4 border-white flex items-center justify-center">
            <FaUser color='white' size='60%' />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center border rounded-lg p-2 bg-white">
            <FaUser className="text-purple-400 mr-2" size="24px" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 outline-none text-white-500 bg-purple-400 placeholder-yellow-50"
              placeholder="Username"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center border rounded-lg p-2 bg-white">
            <IoLogoGoogle className="text-red-500 mr-2" size={24} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 outline-none text-white-500 bg-purple-400 placeholder-yellow-50"
              placeholder="Email"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center border rounded-lg p-2 bg-white">
            <FaLock className="text-purple-500 mr-2" size="24px" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 outline-none bg-purple-400 text-white placeholder-white"
              placeholder="Password"
              required
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="w-50 p-2 bg-white text-purple-500 rounded-lg">
            REGISTER
          </button>
        </div>
        <div className="flex items-center mt-8">
          <div className="flex items-center mr-8">
            <input
              type="checkbox"
              id="remember-checkbox"
              className="form-checkbox h-5 w-5 text-purple-500 bg-purple-600 checked:bg-purple-500 checked:border-transparent"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <label htmlFor="remember-checkbox" className="ml-2 text-white text-lg">
              Remember
            </label>
          </div>
          <div>
            <Link to="/login" className="text-white text-lg hover:underline">Already have an account</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
