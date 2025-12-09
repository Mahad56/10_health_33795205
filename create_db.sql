DROP DATABASE IF EXISTS health;
CREATE DATABASE health;
USE health;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  hashedPassword VARCHAR(255),
  first VARCHAR(50),
  last VARCHAR(50),
  email VARCHAR(100)
);

CREATE TABLE activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  activity VARCHAR(100),
  minutes INT,
  calories INT,
  date DATE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
