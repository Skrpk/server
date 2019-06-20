const Bcrypt = require('bcryptjs');
const User = require('../models/user');

async function getCurrentUser(req, res, next) {
  const { email, password } = req.query;
  let user;

  try {
    user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    if(!Bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({ message: "The password is invalid" });
    }

  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }

  return res.json(user);
}

async function createUser(req, res, next) {
  const credentials = req.body;
  console.log({credentials});
  credentials.password = Bcrypt.hashSync(credentials.password, 10);
  let user;
  try {
    user = await User.create(credentials);
  } catch ({ message }) {
    console.log('MESSAGE:', message);
    return next({
      status: 400,
      message,
    });
  }

  return res.json(user);
}

module.exports = {
  getCurrentUser,
  createUser,
};