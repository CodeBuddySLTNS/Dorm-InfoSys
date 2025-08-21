import React from "react";

const Login: React.FC = () => {
  return (
    <div className="w-full h-dvh grid [grid-template-columns:1fr_2fr]">
      <div className="flex items-center justify-center [background-image:linear-gradient(rgba(0,171,194,0.35),rgba(0,171,194,0.35)),url('/img/pac.jpg')] bg-right bg-cover">
        <img className="w-[30%]" src="/img/logo.png" alt="logo" />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <img className="w-[30%]" src="/img/logo.png" alt="logo" />
          <h1 className="text-2xl">Dormitory Information System</h1>
          <form className="w-full">
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-1 py-1.5 border-b-2 border-gray-200 outline-0"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-1 py-1.5 border-b-2 border-gray-200 outline-0"
              />
            </div>
            <button
              type="submit"
              className="mt-5 bg-primary text-white rounded p-2 w-full hover:bg-blue-600 transition-colors"
            >
              Login
            </button>

            <div className="text-center mt-4 text-sm text-gray-500">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
