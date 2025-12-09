const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/auth');

module.exports = (db) => {

  // SQL WITH CLEAN DATE FORMAT
const sql = `
  SELECT 
    activity,
    minutes,
    calories,
    DATE(date) AS nice_date
  FROM activities
  WHERE user_id = ?
  ORDER BY date DESC
`;


  // SHOW ALL ACTIVITIES
  router.get("/activities", requireLogin, (req, res) => {
      db.query(sql, [req.session.user.id], (err, rows) => {
          if (err) return res.status(500).send("DB error");
          res.render("activities", { rows });
      });
  });

  // ADD ACTIVITY PAGE
  router.get("/add-activity", requireLogin, (req, res) => {
      res.render("add-activity");
  });

  // ADD ACTIVITY (POST)
  router.post("/add-activity", requireLogin, (req, res) => {
      const { activity, minutes, calories, date } = req.body;

      db.query(
          "INSERT INTO activities (user_id, activity, minutes, calories, date) VALUES (?, ?, ?, ?, ?)",
          [req.session.user.id, activity, minutes, calories, date],
          () => res.redirect('/activities')
      );
  });

  return router;
};
