const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

module.exports = (db) => {

  // REGISTER PAGE
  router.get('/register', (req, res) => {
    res.render('register');
  });

  router.post('/register', (req, res) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.send("Error hashing password.");

      const sql = "INSERT INTO users (username, password_hash) VALUES (?, ?)";
      db.query(sql, [username, hash], (err) => {
        if (err) return res.send("User already exists or DB error.");
        res.redirect('/login');
      });
    });
  });

  // LOGIN PAGE 
  router.get('/login', (req, res) => {
    res.render('login');
  });

  // LOGIN POST
  router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], (err, rows) => {
        if (err || rows.length === 0) {
            return res.send("Invalid username or password.");
        }

        const user = rows[0];

        bcrypt.compare(password, user.password_hash, (err, match) => {
            if (!match) {
                return res.send("Invalid username or password.");
            }

            // FIX: save session correctly
            req.session.user = user;
            req.session.save(() => {
                res.redirect('/activities');
            });
        });
    });
  });

  // LOGOUT
  router.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  });

  return router;
};
