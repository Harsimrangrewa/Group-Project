create database garden_with_us;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gardens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_gardens_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE flowers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  common_name VARCHAR(100) NOT NULL,
  scientific_name VARCHAR(150),
  season VARCHAR(50),
  color VARCHAR(80),
  description TEXT,
  CONSTRAINT fk_flowers_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  garden_id INT NOT NULL,
  organizer_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  event_date DATETIME NOT NULL,
  max_attendees INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_events_garden FOREIGN KEY (garden_id) REFERENCES gardens(id),
  CONSTRAINT fk_events_user FOREIGN KEY (organizer_id) REFERENCES users(id)
);
show databases;
show tables;
INSERT INTO users
(name, email, password_hash, bio)
VALUES
('Luna Green', 'luna@example.com', 'pass123', 'Urban gardening enthusiast'),
('Oliver Bloom', 'oliver@example.com', 'pass123', 'Loves growing roses'),
('Maya Fern', 'maya@example.com', 'pass123', 'Community garden volunteer');
INSERT INTO gardens
(user_id, name, description, location)
VALUES
(1, 'Moonlight Garden', 'A peaceful flower garden', 'Toronto'),
(2, 'Rose Haven', 'Specialized in colorful roses', 'Kitchener'),
(3, 'Fern Valley', 'Community garden for local residents', 'Waterloo');
INSERT INTO flowers
(user_id, common_name, scientific_name, season, color, description)
VALUES
(1, 'Blue Orchid', 'Orchidaceae', 'Spring', 'Blue', 'Rare decorative flower'),
(2, 'Golden Rose', 'Rosa Aurea', 'Summer', 'Yellow', 'Bright golden petals'),
(3, 'Silver Lily', 'Lilium Argentum', 'Spring', 'White', 'Elegant fragrant lily');
INSERT INTO events
(garden_id, organizer_id, title, description, event_date, max_attendees)
VALUES
(1, 1, 'Spring Blossom Festival',
 'Celebrate seasonal blooms',
 '2026-07-15 10:00:00',
 50),

(2, 2, 'Rose Care Workshop',
 'Learn professional rose maintenance',
 '2026-08-01 14:00:00',
 30),

(3, 3, 'Community Planting Day',
 'Volunteer planting event',
 '2026-08-20 09:00:00',
 75);