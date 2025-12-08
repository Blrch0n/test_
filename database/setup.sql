CREATE DATABASE IF NOT EXISTS team6_event_portal
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE team6_event_portal;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('student', 'host', 'admin') DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  location VARCHAR(100),
  start_datetime DATETIME NOT NULL,
  end_datetime DATETIME,
  host_id INT NOT NULL,
  max_attendees INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (host_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_start_datetime (start_datetime),
  INDEX idx_category (category),
  INDEX idx_host_id (host_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_registration (user_id, event_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_event_id (event_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO users (name, email, password, role) VALUES
  ('Admin User', 'admin@eventportal.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye1J9N4qIzNqhKNiNQzFgHGCsqUCppKBC', 'admin'),
  ('John Host', 'john@host.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye1J9N4qIzNqhKNiNQzFgHGCsqUCppKBC', 'host'),
  ('Jane Student', 'jane@student.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye1J9N4qIzNqhKNiNQzFgHGCsqUCppKBC', 'student');

INSERT INTO events (title, description, category, location, start_datetime, end_datetime, host_id, max_attendees) VALUES
  (
    'Web Development Workshop',
    'Learn modern web development with React and Node.js. Perfect for beginners and intermediate developers.',
    'Workshop',
    'Computer Lab A',
    '2025-01-15 14:00:00',
    '2025-01-15 17:00:00',
    2,
    30
  ),
  (
    'Campus Soccer Tournament',
    'Annual inter-department soccer tournament. Teams of 5 players. Registration closes one week before event.',
    'Sports',
    'Main Sports Field',
    '2025-01-20 09:00:00',
    '2025-01-20 18:00:00',
    2,
    100
  ),
  (
    'Career Fair 2025',
    'Meet top employers and explore career opportunities. Bring your resume!',
    'Academic',
    'Conference Hall',
    '2025-01-25 10:00:00',
    '2025-01-25 16:00:00',
    2,
    NULL
  );

INSERT INTO registrations (user_id, event_id) VALUES
  (3, 1),
  (3, 2);

SHOW TABLES;

SELECT id, name, email, role, created_at FROM users;

SELECT e.id, e.title, e.category, e.start_datetime, u.name AS host_name
FROM events e
JOIN users u ON e.host_id = u.id;

SELECT e.title, COUNT(r.id) AS registrations
FROM events e
LEFT JOIN registrations r ON e.id = r.event_id
GROUP BY e.id, e.title;
