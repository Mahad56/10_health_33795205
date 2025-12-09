module.exports = function validate(req, res, next) {
    const { activity, minutes, calories, date } = req.body;

    if (!activity || !minutes || !calories || !date) {
        return res.send("All fields are required.");
    }

    if (isNaN(minutes) || isNaN(calories)) {
        return res.send("Minutes and calories must be numbers.");
    }

    next();
};
