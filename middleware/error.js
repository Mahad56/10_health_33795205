module.exports = (err, req, res, next) => {
  console.error("🔥 ERROR:", err.stack);
  res.status(500).render("error", {
    message: "Something went wrong. Please try again."
  });
};
