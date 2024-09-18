import React, { useState } from 'react';
import Swal from 'sweetalert2';
import NoteImage from '../aset/note.png';

const API_URL = 'https://notes-api-knacademy.vercel.app/api';

const AuthPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'You can now log in with your credentials.',
        timer: 1500,
        showConfirmButton: false,
      });

      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Please check your details and try again.',
      });
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'You will be redirected shortly.',
        timer: 1500,
        showConfirmButton: false,
      });

      // Redirect or update state as needed
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please check your credentials and try again.',
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            {isRegistering ? 'Register' : 'Login'}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              isRegistering ? handleRegister() : handleLogin();
            }}
          >
            {isRegistering && (
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Username</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <button
              className="text-green-600 hover:underline"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 hidden md:flex items-center justify-center">
        <img src={NoteImage} alt="Note" className="w-[70%] h-full object-cover" />
      </div>
    </div>
  );
};

export default AuthPage;
