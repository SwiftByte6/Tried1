import React, { useState } from 'react';
import axios from '../utils/axios'; // adjust the path if needed
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Add useNavigate for redirection

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegister) {
        const res = await axios.post("/users/register", form);
        localStorage.setItem("user", JSON.stringify(res.data.newUser));
      } else {
        const res = await axios.post("/users/login", {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("userid", res.data.user._id);
      }

      // Refresh the page after successful login
      window.location.reload(); // This will refresh the page after login

    } catch (err) {
      setError(
        err?.response?.data?.message ||
        (isRegister ? "Registration failed" : "Login failed")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-screen h-screen bg-gray-300 flex justify-center items-center p-4'>
      <div className='bg-white shadow-2xl rounded-3xl w-full max-w-md p-6 text-center'>
        {/* Toggle Buttons */}
        <div className="flex justify-center mb-6">
          <button
            className={`border rounded-2xl text-lg px-6 py-2 mx-2 ${!isRegister ? 'bg-blue-800 text-white' : 'text-blue-800 border-blue-800'}`}
            onClick={() => setIsRegister(false)}
          >
            Login
          </button>
          <button
            className={`border rounded-2xl text-lg px-6 py-2 mx-2 ${isRegister ? 'bg-blue-800 text-white' : 'text-blue-800 border-blue-800'}`}
            onClick={() => setIsRegister(true)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className='bg-gray-200 text-lg rounded-full p-3 mt-4 w-full outline-none'
              placeholder='Name'
              required
            />
          )}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className='bg-gray-200 text-lg rounded-full p-3 mt-4 w-full outline-none'
            placeholder='Email'
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className='bg-gray-200 text-lg rounded-full p-3 mt-4 w-full outline-none'
            placeholder='Password'
            required
          />
          <button
            type="submit"
            className='bg-blue-500 hover:bg-blue-600 text-white text-lg w-full p-3 mt-6 rounded-full transition'
            disabled={loading}
          >
            {loading ? "Please wait..." : "Submit"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <p
          className='text-blue-600 text-sm mt-4 cursor-pointer hover:underline'
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already have an account? Login" : "Not a user? Register"}
        </p>
      </div>
    </div>
  );
};

export default Login;
