import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl mb-4 text-center">Welcome to Your App</h2>
        <p className="text-gray-600 text-center mb-8">Start managing your tasks today!</p>
        <div className="flex justify-center">
          <Link to="/register">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Go to Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
