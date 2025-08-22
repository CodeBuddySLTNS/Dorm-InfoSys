import { coleAPI } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMainStore } from "@/store";
import { toast } from "sonner";
import type { AxiosError } from "axios";

type loginCred = { username: string; password: string };

const Login: React.FC = () => {
  const navigate = useNavigate();

  const { mutateAsync: login } = useMutation({
    mutationFn: coleAPI("/auth/login", "POST"),
    onSuccess: (d) => {
      useMainStore.getState().setLoggedIn(true);
      useMainStore.getState().setUser(d.user);
      localStorage.setItem("token", d.token);
      navigate("/");
      reset();
    },
    onError: (error) => {
      if (error instanceof Error) {
        const axErr = error as AxiosError<Error>;
        if (axErr.response?.data.message)
          return toast.error(axErr.response.data.message);
        toast.error("Unable to connect to the server");
      }
    },
  });

  const { register, handleSubmit, reset } = useForm<loginCred>();

  const onSubmit = async (data: loginCred) => {
    try {
      await login(data);
    } catch (error) {
      if (error) return;
    }
  };

  return (
    <div className="w-full h-dvh md:grid md:[grid-template-columns:1fr_2fr] md:overflow-hidden">
      <div className="flex items-center justify-center py-3 md:py-0  [background-image:linear-gradient(rgba(0,171,194,0.35),rgba(0,171,194,0.35)),url('/img/pac.jpg')] bg-right bg-cover">
        <img className="w-[30%]" src="/img/logo.png" alt="logo" />
      </div>

      <div className="w-full md:h-dvh flex items-center justify-center md:overflow-y-auto">
        <div className="w-full max-w-md h-full md:h-max flex flex-col items-center gap-3 p-4 bg-white rounded">
          <img
            className="w-[30%] hidden md:block"
            src="/img/logo.png"
            alt="logo"
          />
          <h1 className="text-2xl text-center">Dormitory Information System</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex flex-col gap-2">
              <input
                {...register("username")}
                type="text"
                placeholder="Username"
                className="w-full px-1 py-1.5 border-b-2 border-gray-200 outline-0"
                required
              />
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="w-full px-1 py-1.5 border-b-2 border-gray-200 outline-0"
                required
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
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
