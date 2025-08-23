import UpdateInformation from "@/components/student-portal-update";
import { coleAPI } from "@/lib/utils";
import type { StudentData } from "@/types/data.types";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

const StudentPortal = () => {
  const { data: student, isLoading } = useQuery<StudentData>({
    queryKey: ["student"],
    queryFn: coleAPI("/students/byid"),
  });

  if (isLoading && !student)
    return (
      <div className="w-full h-dvh flex items-center justify-center">
        <Loader size={60} className="animate-spin text-primary" />
      </div>
    );

  return <UpdateInformation student={student || ({} as StudentData)} />;
};

export default StudentPortal;
