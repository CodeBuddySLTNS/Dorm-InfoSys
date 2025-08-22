/*
 INSERT INTO users(name, password, role, year)
      VALUES ('admin', '$2b$10$D1n72/umpykU8kigc8Mm2.FAP0nbobOxKenwsDAyrKah5PPTEWCiS', 'admin', 1)
*/

export const sqlTableQueries = `
    CREATE TABLE departments (
        departmentId INT PRIMARY KEY AUTO_INCREMENT,
        acronym VARCHAR(15) NOT NULL,
        departmentName VARCHAR(255) NOT NULL
    );

    CREATE TABLE users (
        userId INT PRIMARY KEY AUTO_INCREMENT,
        studentId INT,
        firstName VARCHAR(30) NOT NULL,
        middleName VARCHAR(30),
        lastName VARCHAR(30) NOT NULL,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255),
        address VARCHAR(255),
        guardian VARCHAR(80),
        phone VARCHAR(255),
        departmentId INT,
        year INT,
        role ENUM('student', 'admin') NOT NULL DEFAULT "student",
        FOREIGN KEY (departmentId) REFERENCES departments(departmentId) ON DELETE CASCADE
    );

    INSERT INTO users(firstName, lastName, username, password, role)
      VALUES ('Juan', 'Tamad', 'juan', '$2b$10$D1n72/umpykU8kigc8Mm2.FAP0nbobOxKenwsDAyrKah5PPTEWCiS', 'admin');

    INSERT INTO departments (departmentName, acronym) VALUES 
        ("Bachelor of Science in Computer Science", "BSCS"),
        ("Bachelor of Science in Information Technology", "BSIT"),
        ("Bachelor of Science in Social Work", "BSSW"),
        ("Bachelor of Early Childhood Education", "BECED");
`;
