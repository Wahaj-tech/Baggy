const express = require("express");
const passport = require("passport");
const jwt=require('jsonwebtoken')
const router = express.Router();

// Start Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Generate JWT for the Google user
    const token = jwt.sign(
      { email: req.user.email, id: req.user._id },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );

    // Set JWT as cookie
    res.cookie("token", token, { httpOnly: true });

    // Redirect to protected route
    res.redirect("/shop");
  }

);

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;
