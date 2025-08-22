import { coleAPI } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { Department } from "@/types/data.types";

type SignupData = {
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  password: string;
  address: string;
  guardian: string;
  phone: string;
  departmentId: number;
};

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const { data } = useQuery<Department[]>({
    queryKey: ["departments"],
    queryFn: coleAPI("/departments", "GET"),
  });

  const { mutateAsync: signup } = useMutation({
    mutationFn: coleAPI("/auth/signup", "POST"),
    onSuccess: () => {
      toast.success("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },
    onError: (error) => {
      if (error instanceof Error) {
        const axErr = error as AxiosError<Error>;
        if (axErr.response?.data.message) {
          if (axErr.response?.data.message === "Already exists!")
            return toast.error("Username already taken, please try another.");
          return toast.error(axErr.response.data.message);
        }
        toast.error("Unable to connect to the server");
      }
    },
  });

  const { register, setValue, handleSubmit } = useForm<SignupData>();

  const onSubmit = async (data: SignupData) => {
    try {
      await signup(data);
    } catch (error) {
      if (error) return;
    }
  };

  return (
    <div className="w-full h-dvh md:grid md:[grid-template-columns:1fr_2fr] md:overflow-hidden">
      <div className="flex items-center justify-center py-3 md:py-0  [background-image:linear-gradient(rgba(0,171,194,0.35),rgba(0,171,194,0.35)),url('/img/pac.jpg')] bg-right bg-cover">
        <img className="w-[30%]" src="/img/logo.png" alt="logo" />
      </div>

      <div className="w-full h-dvh flex justify-center md:overflow-y-auto">
        <div className="w-full max-w-md h-full md:mt-4 md:h-max flex flex-col items-center gap-3 p-4 bg-white rounded">
          <h1 className="text-2xl mb-4 text-center">Student Registration</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex flex-col md:flex-row md:space-x-2 md:items-end">
              <div className="flex-1 mb-2 md:mb-0">
                <label
                  className="block text-sm font-medium text-gray-600 mb-1"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  {...register("firstName")}
                  type="text"
                  required
                  placeholder="First Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="flex-1 mb-2 md:mb-0">
                <label
                  className="block text-sm font-medium text-gray-600 mb-1"
                  htmlFor="middleName"
                >
                  Middle Name
                </label>
                <input
                  id="middleName"
                  {...register("middleName")}
                  type="text"
                  placeholder="Middle Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="flex-1 mb-2 md:mb-0">
                <label
                  className="block text-sm font-medium text-gray-600 mb-1"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  {...register("lastName")}
                  type="text"
                  required
                  placeholder="Last Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-2 md:items-end">
              <div className="flex-1 mb-2 md:mb-0">
                <label
                  className="block text-sm font-medium text-gray-600 mb-1"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  id="username"
                  {...register("username")}
                  type="text"
                  required
                  placeholder="Username"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="flex-1 mb-2 md:mb-0">
                <label
                  className="block text-sm font-medium text-gray-600 mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  {...register("password")}
                  type="password"
                  required
                  placeholder="Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-600 mb-1"
                htmlFor="address"
              >
                Address
              </label>
              <input
                id="address"
                {...register("address")}
                type="text"
                required
                placeholder="Address"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="flex flex-col md:flex-row md:space-x-2 md:items-end">
              <div className="flex-1 mb-2 md:mb-0">
                <label
                  className="block text-sm font-medium text-gray-600 mb-1"
                  htmlFor="guardian"
                >
                  Parent/Guardian
                </label>
                <input
                  id="guardian"
                  {...register("guardian")}
                  type="text"
                  required
                  placeholder="Enter Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="flex-1 mb-2 md:mb-0">
                <label
                  className="block text-sm font-medium text-gray-600 mb-1"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  {...register("phone")}
                  type="number"
                  required
                  placeholder="Phone Number"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-600 mb-1"
                htmlFor="departmentId"
              >
                Program/Course
              </label>
              <Select
                onValueChange={(value) => {
                  setValue("departmentId", Number(value));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Program" />
                </SelectTrigger>
                <SelectContent>
                  {data?.map((department) => (
                    <SelectItem
                      key={department.departmentId}
                      value={String(department.departmentId)}
                    >
                      {department.departmentName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded mt-1 transition duration-300"
            >
              Sign Up
            </button>
            <p className="mt-2 pb-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
