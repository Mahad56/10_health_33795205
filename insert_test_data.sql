USE health;

INSERT INTO users (username, password_hash)
VALUES ('gold', '$2a$10$uZQY0FUj8HnV/KxZtL8IMEQqsF.rXRIHdv8ImZ/Sc7Vc8GvqbU92a');

INSERT INTO activities (user_id, activity, minutes, calories, date)
VALUES
(1, 'Running', 20, 200, '2025-01-01'),
(1, 'Cycling', 30, 350, '2025-01-02');
