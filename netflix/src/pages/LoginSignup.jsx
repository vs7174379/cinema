import React, { useState } from 'react';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Use environment variables for API URL
      const apiBaseUrl = import.meta.env.VITE_API_URL;
      const endpoint = isLogin
        ? `${apiBaseUrl}user/login`
        : `${apiBaseUrl}user/register`;

      const payload = isLogin
        ? { email: form.email, password: form.password }
        : { fullName: form.fullName, email: form.email, password: form.password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
      } else {
        // Store token in local storage upon successful login/signup
        
        window.location.href = '/browser';
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-full min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://assets.aboutamazon.com/dims4/default/d634820/2147483647/strip/true/crop/1279x720+0+0/resize/1320x743!/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F58%2F75%2Fa9ac0af245d0a4267feb6f361781%2Fpv-v-day-movies.jpg')",
      }}
    >
      <div className="relative w-full max-w-md p-8 bg-black/40 rounded-xl shadow-xl backdrop-blur-md border border-black/40 text-white">
        {/* Decorative Shapes */}
        <div className="absolute -top-20 -left-20 w-52 h-52 bg-gradient-to-br from-blue-700 to-blue-400 rounded-full z-0 opacity-70 blur-2xl"></div>
        <div className="absolute -bottom-24 -right-10 w-52 h-52 bg-gradient-to-r from-orange-400 to-red-500 rounded-full z-0 opacity-60 blur-2xl"></div>

        <div className="relative z-10">
          <h2 className="text-4xl font-semibold text-center mb-6">
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="mb-4">
                <label htmlFor="fullName" className="block mb-1 text-md font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="John Doe"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                  required
                />
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 text-md font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block mb-1 text-md font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-center mb-2">{error}</div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-md bg-white text-black font-semibold hover:bg-blue-500 hover:text-white transition duration-300"
              disabled={loading}
            >
              {loading ? (isLogin ? 'Logging In...' : 'Signing Up...') : isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 flex justify-between space-x-4">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md bg-red-600 hover:bg-red-700 transition text-white text-sm font-medium" type="button">
              <i className="fab fa-google"></i> Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-medium" type="button">
              <i className="fab fa-facebook-f"></i> Facebook
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-300">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-yellow-400 hover:underline font-semibold"
              type="button"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
