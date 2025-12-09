const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/auth');
const validate = require('../middleware/validate');

module.exports = (db) => {

  // sql
  const sql = `
    SELECT 
      id,
      activity,
      minutes,
      calories,
      DATE_FORMAT(date, '%d %b %Y') AS nice_date
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

  // ADD ACTIVITY POST
  router.post("/add-activity", requireLogin, validate, (req, res) => {
      const { activity, minutes, calories, date } = req.body;

      db.query(
          "INSERT INTO activities (user_id, activity, minutes, calories, date) VALUES (?, ?, ?, ?, ?)",
          [req.session.user.id, activity, minutes, calories, date],
          () => res.redirect('activities')
      );
  });

  // EDIT PAGE
  router.get("/edit/:id", requireLogin, (req, res) => {
      db.query(
          "SELECT * FROM activities WHERE id = ? AND user_id = ?",
          [req.params.id, req.session.user.id],
          (err, rows) => {
              if (err || rows.length === 0) return res.send("Not found.");
              res.render("edit-activity", { activity: rows[0] });
          }
      );
  });

  // EDIT POST
  router.post("/edit/:id", requireLogin, validate, (req, res) => {
      const { activity, minutes, calories, date } = req.body;

      const updateSql = `
          UPDATE activities 
          SET activity=?, minutes=?, calories=?, date=?
          WHERE id=? AND user_id=?
      `;

      db.query(updateSql,
          [activity, minutes, calories, date, req.params.id, req.session.user.id],
          (err) => {
              if (err) return res.send("Update failed.");
              res.redirect("activities");
          }
      );
  });

  // DELETE
  router.post("/delete/:id", requireLogin, (req, res) => {
      db.query(
          "DELETE FROM activities WHERE id = ? AND user_id = ?",
          [req.params.id, req.session.user.id],
          (err) => {
              if (err) return res.send("Delete failed.");
              res.redirect("activities");
          }
      );
  });

  return router;
};
