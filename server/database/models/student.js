import { sqlQuery } from "../sqlQuery.js";

export const Student = {
  getAll: async () => {
    return await sqlQuery(`
      SELECT 
        u.userId as studentId,
        CONCAT(u.lastName, ', ', u.firstName, ' ', IFNULL(u.middleName, '')) AS name,
        u.firstName,
        u.middleName,
        u.lastName,
        u.username,
        u.address,
        u.guardian,
        u.phone,
        d.acronym AS department,
        d.departmentId
      FROM users u
      LEFT JOIN departments d ON u.departmentId = d.departmentId
      WHERE u.role = 'student';
    `);
  },
  getById: async (userId) => {
    return (
      (
        await sqlQuery(
          `
      SELECT 
        u.userId as studentId,
        CONCAT(u.lastName, ', ', u.firstName, ' ', IFNULL(u.middleName, '')) AS name,
        u.firstName,
        u.middleName,
        u.lastName,
        u.username,
        u.address,
        u.guardian,
        u.phone,
        d.acronym AS department,
        d.departmentId
      FROM users u
      LEFT JOIN departments d ON u.departmentId = d.departmentId
      WHERE u.role = 'student' AND u.userId = ?;
    `,
          [userId]
        )
      )[0] || null
    );
  },
  delete: async (studentId) => {
    return await sqlQuery(`DELETE FROM users WHERE userId = ?`, [studentId]);
  },
};
