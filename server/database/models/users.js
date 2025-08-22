import bcrypt from "bcryptjs";
import { sqlQuery } from "../sqlQuery.js";

export const User = {
  getInfo: async (userId) => {
    return (
      await sqlQuery(`SELECT * FROM users WHERE userId = ?`, [userId])
    )[0];
  },
  getInfoByUsername: async (username) => {
    return (
      await sqlQuery(`SELECT * FROM users WHERE username = ?`, [username])
    )[0];
  },
  add: async ({
    studentId,
    firstName,
    middleName,
    lastName,
    username,
    password,
    address,
    guardian,
    phone,
    departmentId,
    year,
    role = "student",
  }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await sqlQuery(
      `INSERT INTO users (
        studentId,
        firstName,
        middleName,
        lastName,
        username,
        password,
        address,
        guardian,
        phone,
        departmentId,
        year,
        role
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        studentId,
        firstName,
        middleName,
        lastName,
        username,
        hashedPassword,
        address,
        guardian,
        phone,
        departmentId,
        year,
        role,
      ]
    );
    return result.insertId;
  },
  update: async (
    userId,
    {
      studentId,
      firstName,
      middleName,
      lastName,
      username,
      password,
      address,
      guardian,
      phone,
      departmentId,
      year,
      role,
    }
  ) => {
    let updates = [];
    let values = [];

    if (studentId !== undefined) {
      updates.push("studentId = ?");
      values.push(studentId);
    }
    if (firstName) {
      updates.push("firstName = ?");
      values.push(firstName);
    }
    if (middleName !== undefined) {
      updates.push("middleName = ?");
      values.push(middleName);
    }
    if (lastName) {
      updates.push("lastName = ?");
      values.push(lastName);
    }
    if (username) {
      updates.push("username = ?");
      values.push(username);
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push("password = ?");
      values.push(hashedPassword);
    }
    if (address !== undefined) {
      updates.push("address = ?");
      values.push(address);
    }
    if (guardian !== undefined) {
      updates.push("guardian = ?");
      values.push(guardian);
    }
    if (phone !== undefined) {
      updates.push("phone = ?");
      values.push(phone);
    }
    if (departmentId !== undefined) {
      updates.push("departmentId = ?");
      values.push(departmentId);
    }
    if (year !== undefined) {
      updates.push("year = ?");
      values.push(year);
    }
    if (role) {
      updates.push("role = ?");
      values.push(role);
    }

    if (updates.length === 0) {
      return false;
    }

    values.push(userId);

    const result = await sqlQuery(
      `UPDATE users SET ${updates.join(", ")} WHERE userId = ?`,
      values
    );

    return result.affectedRows > 0;
  },
};
