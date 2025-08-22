export interface User {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  address: string;
  role: string;
}

export interface StudentData {
  studentId: number;
  name: string;
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  address: string;
  guardian: string;
  phone: string;
  department: string;
  departmentId: number;
}

export type Department = {
  departmentId: number;
  departmentName: string;
  acronym: string;
};
