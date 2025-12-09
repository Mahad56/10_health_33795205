const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/auth');

module.exports = (db) => {

  // PROTECT SEARCH PAGE
  router.get('/search', requireLogin, (req, res) => {
    res.render('search', { rows: [] });
  });

  // PROTECT SEARCH ACTION
  router.post('/search', requireLogin, (req, res) => {
    const term = `%${req.body.term}%`;

    const sql = `
      SELECT * FROM activities
      WHERE user_id = ? AND activity LIKE ?
    `;

    db.query(sql, [req.session.user.id, term], (err, rows) => {
      if (err) return res.send("Database error");
      res.render('search', { rows });
    });
  });

  return router;
};
