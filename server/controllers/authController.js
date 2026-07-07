
const User = require("../models/postgres/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {
  return res.status(400).json({
    message: "User already exists",
  });
}

// Hash the password
const hashedPassword = await bcrypt.hash(password, 10);

// Create the user in PostgreSQL
const newUser = await User.create({
  name,
  email,
  password: hashedPassword,
});

// Send success response
res.status(201).json({
  message: "User registered successfully",
  user: {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  },
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const login = async (req, res) => {
  try {
   const { email, password } = req.body;

// Find user by email
const user = await User.findOne({
  where: { email },
});

if (!user) {
  return res.status(404).json({
    message: "User not found",
  });
}

// Now compare password
const isPasswordValid = await bcrypt.compare(
  password,
  user.password
);

if (!isPasswordValid) {
  return res.status(401).json({
    message: "Invalid password",
  });

}
// Generate JWT Token
const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d",
  }
);


res.status(200).json({
  message: "User found",
  token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
  },
});
}

   catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};