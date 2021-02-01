exports.getAll = (req, res, next) => {
    res.json({ message: "Welcome to my application." });
    next();
  };