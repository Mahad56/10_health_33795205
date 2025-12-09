module.exports = function validate(req, res, next) {
    const { activity, minutes, calories, date } = req.body;

    if (!activity || activity.trim().length === 0) {
        return res.send("Activity name cannot be empty.");
    }

    // Minutes and rhe calories must be numbers
    if (isNaN(minutes) || isNaN(calories)) {
        return res.send("Minutes and calories must be numeric.");
    }

    // Convert to numbers
    const mins = Number(minutes);
    const cals = Number(calories);

    // Must be positive
    if (mins <= 0 || cals <= 0) {
        return res.send("Minutes and calories must be greater than zero.");
    }

    // Must be integers
    if (!Number.isInteger(mins) || !Number.isInteger(cals)) {
        return res.send("Minutes and calories must be whole numbers.");
    }

    // Date must be valid
    if (!date || isNaN(Date.parse(date))) {
        return res.send("Please enter a valid date.");
    }

    next();
};
