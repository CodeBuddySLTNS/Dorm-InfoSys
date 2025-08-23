import status from "http-status";
import { Student } from "../database/models/student.js";
import { CustomError } from "../lib/utils.js";
import { User } from "../database/models/users.js";

const students = async (req, res) => {
  const result = await Student.getAll();
  res.send(result);
};

const studentsById = async (req, res) => {
  const result = await Student.getById(res.locals.userId);
  res.send(result);
};

const addStudent = async (req, res) => {
  const { studentId, name, departmentId, year } = req.body || {};

  if (!name || !departmentId || !year) {
    throw new CustomError("All fields are required", status.BAD_REQUEST);
  }

  const result = await Student.add(req.body);
  res.status(status.CREATED).send(result);
};

const editStudent = async (req, res) => {
  const { studentId } = req.body || {};

  if (!studentId) {
    throw new CustomError("All fields are required", status.BAD_REQUEST);
  }

  req.body.userId = studentId;
  delete req.body.studentId;

  const result = await User.update(studentId, req.body);
  res.status(status.CREATED).send(result);
};

const deleteStudent = async (req, res) => {
  const { studentId } = req.body || {};

  if ((await User.getInfo(res.locals.userId))?.role !== "admin") {
    throw new CustomError(
      "You are not authorized to edit this student",
      status.FORBIDDEN
    );
  }

  const result = await Student.delete(studentId);

  if (result.affectedRows === 0)
    throw new CustomError("No user found.", status.NOT_FOUND);

  res.send(result);
};

export default {
  students,
  addStudent,
  editStudent,
  deleteStudent,
  studentsById,
};
