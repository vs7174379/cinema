import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here (e.g., Firebase auth)
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  return (
    <div className="flex  items-center justify-center  bg-black bg-cover h-200 bg-center" style={{ backgroundImage: `url('https://www.shutterstock.com/image-vector/abstract-white-background-modern-design-600nw-2478912715.jpg')` }}>
      <div className=" bg-black/75 p-8 rounded-md w-100 h-140">
        <h1 className="text-2xl font-bold text-white mb-6">Sign In</h1>
        <form className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email or mobile number"
            className="border-1 border-gray-500 text-white p-3 rounded focus:outline-2   focus:ring-2 focus:ring-white-600"
          />
          <input
            type="password"
            placeholder="Password"
            className="border-1 border-gray-500 text-white p-3  rounded focus:outline-2 focus:ring-2 focus:ring-white-600"
          />
          <button
            type="submit"
            className="flex justify-center bg-red-600 text-white py-3 h-9 items-center   rounded font-semibold hover:bg-red-700 transition-colors"
          >
            Sign In
          </button>
          <div className="flex items-center w-9/10 justify-center">
            <span className="text-gray-400">OR</span>
          </div>
          <button
            type="button"
            className="flex justify-center items-center bg-gray-600 h-9 text-white py-3  rounded font-semibold hover:bg-gray-700 transition-colors"
          >
            Use a sign-in code
          </button>
          <a href="#" className="text-sm text-blue-500 hover:underline self-center">
            Forgot password?
          </a>
          <div className="flex items-center  text-gray-400 text-sm">
            <input
              type="checkbox"
              id="remember"
              className="mr-2"
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          <div className="text-gray-400 text-sm mt-4">
            New to Netflix? <a href="#" className="text-white hover:underline">Sign up now.</a>
          </div>
          <p className="text-xs text-gray-500 mt-2 flex-wrap">
            This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#" className="text-blue-500 hover:underline">Learn more.</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
