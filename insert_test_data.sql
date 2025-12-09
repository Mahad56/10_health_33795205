USE health;

INSERT INTO users (username, hashedPassword, first, last, email)
VALUES ('gold', 'TEMPORARY', 'Gold', 'User', 'gold@example.com');

INSERT INTO activities (user_id, activity, minutes, calories, date)
VALUES
(1, 'Running', 20, 200, '2025-01-01'),
(1, 'Cycling', 30, 350, '2025-01-02');
