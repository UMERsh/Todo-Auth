import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../Redux/Login/LoginSlice';
import { FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate('/newhome', { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    setIsChecked(rememberMe);
    if (rememberMe) {
      const storedEmail = localStorage.getItem('email') || '';
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
        rememberMe: isChecked,
      });

      if (response.status === 200) {
        const data = response.data;

        localStorage.setItem('token', data.token);

        dispatch(loginUser({ email, password }));

        if (isChecked) {
          localStorage.setItem('email', email);
        } else {
          localStorage.removeItem('email');
        }

        navigate('/newhome',{ replace: true });  
        alert('User logged in successfully');
      } else {
        toast.error(response.data.error || 'Failed to login user');
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      toast.error('An error occurred during login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-pink-600">
      <form onSubmit={handleSubmit} className="bg-purple p-8 rounded-lg">
        <div className="flex justify-center mb-4">
          <div className="w-40 h-40 mb-4 rounded-full border-4 border-white flex items-center justify-center">
            <FaLock color="white" size="60%" />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center border rounded-lg p-2 bg-white">
            <FaUser className="text-purple-500 mr-2" size="24px" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 outline-none text-white-500 bg-purple-400 placeholder-yellow-50"
              placeholder="UserName"
              required
            />
          </div>
        </div>
        <div className="mb-6 relative">
          <div className="flex items-center border rounded-lg p-2 bg-white">
            <FaLock className="text-purple-500 mr-2" size="24px" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 outline-none bg-purple-400 text-white placeholder-white placeholder-opacity-50"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2"
            >
              {showPassword ? <FaEyeSlash className="text-purple-500" size="24px" /> : <FaEye className="text-purple-500" size="24px" />}
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="w-50 p-2 bg-white text-purple-500 rounded-lg">
            LOGIN
          </button>
        </div>
        <div className="flex items-center mt-8">
          <div className="flex items-center mr-8">
            <input
              type="checkbox"
              id="remember-checkbox"
              className="form-checkbox h-5 w-4 text-purple-500 bg-purple-600 checked:bg-purple-500 checked:border-transparent"
              checked={isChecked}
              onChange={() => {
                setIsChecked(!isChecked);
                localStorage.setItem('rememberMe', !isChecked);
              }}
            />
            <label htmlFor="remember-checkbox" className="ml-2 text-white text-lg">
              Remember
            </label>
          </div>
          <div>
            <Link to="/register" className="text-white text-lg hover:underline ml-9">Don't have an account?</Link>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
