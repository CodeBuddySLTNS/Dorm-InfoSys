import React, { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { coleAPI } from "@/lib/utils";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Department, StudentData } from "@/types/data.types";
import type { AxiosError } from "axios";

interface InputData {
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  password: string;
  address: string;
  guardian: string;
  phone: string;
  departmentId: number;
}

const UpdateInformation: React.FC<{ student: StudentData }> = ({ student }) => {
  const { data: departments } = useQuery<Department[]>({
    queryKey: ["departments"],
    queryFn: coleAPI("/departments", "GET"),
  });

  const { mutateAsync: updateStudent, isPending } = useMutation({
    mutationFn: coleAPI("/students/update", "PATCH"),
    onError: (error) => {
      if (error instanceof Error) {
        const axErr = error as AxiosError<Error>;
        if (axErr.response?.data.message)
          return toast.error(axErr.response.data.message);
        toast.error("Unable to connect to the server");
      }
    },
    onSuccess: () => {
      toast.success("Information updated successfully");
    },
  });

  const { register, setValue, handleSubmit, reset, watch } = useForm<InputData>(
    {
      defaultValues: {
        firstName: student?.firstName ?? "",
        middleName: student?.middleName ?? "",
        lastName: student?.lastName ?? "",
        username: student?.username ?? "",
        password: "",
        address: student?.address ?? "",
        guardian: student?.guardian ?? "",
        phone: student?.phone ?? "",
        departmentId: student?.departmentId ?? undefined,
      },
    }
  );
  const departmentId = watch("departmentId");

  useEffect(() => {
    reset({
      firstName: student?.firstName ?? "",
      middleName: student?.middleName ?? "",
      lastName: student?.lastName ?? "",
      username: student?.username ?? "",
      password: "",
      address: student?.address ?? "",
      guardian: student?.guardian ?? "",
      phone: student?.phone ?? "",
      departmentId: student?.departmentId ?? undefined,
    });
  }, [student, reset]);

  const onSubmit = async (data: InputData) => {
    const studentData = {
      ...student,
      ...data,
      departmentId: Number(data.departmentId),
    };
    await updateStudent(studentData);
  };

  return (
    <div className="md:mt-10 p-2.5 pb-6 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <h1 className="font-bold uppercase sm:text-center text-xl mb-4">
          Update My Information
        </h1>
        <div className="flex flex-col md:flex-row md:space-x-2 md:items-end">
          <div className="flex-1 mb-2 md:mb-0">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              {...register("firstName", { required: true })}
              type="text"
              required
              placeholder="First Name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="flex-1 mb-2 md:mb-0">
            <Label htmlFor="middleName">Middle Name</Label>
            <Input
              id="middleName"
              {...register("middleName")}
              type="text"
              placeholder="Middle Name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="flex-1 mb-2 md:mb-0">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              {...register("lastName", { required: true })}
              type="text"
              required
              placeholder="Last Name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-2 md:items-end">
          <div className="flex-1 mb-2 md:mb-0">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              {...register("username", { required: true })}
              type="text"
              required
              placeholder="Username"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="flex-1 mb-2 md:mb-0">
            <Label htmlFor="password">New Password (optional)</Label>
            <Input
              id="password"
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            {...register("address", { required: true })}
            type="text"
            required
            placeholder="Address"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div className="flex flex-col md:flex-row md:space-x-2 md:items-end">
          <div className="flex-1 mb-2 md:mb-0">
            <Label htmlFor="guardian">Parent/Guardian</Label>
            <Input
              id="guardian"
              {...register("guardian", { required: true })}
              type="text"
              required
              placeholder="Enter Name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="flex-1 mb-2 md:mb-0">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              {...register("phone", { required: true })}
              type="number"
              required
              placeholder="Phone Number"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="departmentId">Program/Course</Label>
          <Select
            onValueChange={(value) => setValue("departmentId", Number(value))}
            value={departmentId !== undefined ? String(departmentId) : ""}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Program" />
            </SelectTrigger>
            <SelectContent>
              {departments?.map((department) => (
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

        <Button
          type="submit"
          disabled={isPending}
          className="w-full mt-3 Nunito-SemiBold"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default UpdateInformation;
