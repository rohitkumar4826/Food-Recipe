const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  // Check if the user already exists in the database
  console.log("Received Register request", req.body.email);
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists!" });
  }

  // Create a new user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    // Generate a token for the new user
    const accessToken = jwt.sign(
      {
        id: savedUser._id,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    res.status(201).json({ user: savedUser, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  console.log("Received login request", req.body.loginEmail);
  try {
     const user = await User.findOne({ loginEmail: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.loginPassword) {
      console.log("Password does not match, sending 401 response");
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    console.log("Password matches, generating access token");
    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    console.log("Access token generated, sending response");
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
