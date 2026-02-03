const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/db");

/* LOGIN */
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, result) => {
      if (err) return res.status(500).json({ message: "DB Error" });

      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        "SECRET_KEY",
        { expiresIn: "1h" }
      );

      res.json({
        token,
        role: user.role,
        username: user.username,
        userId: user.id
      });
    }
  );
});

/* FORGOT PASSWORD */
router.post("/forgot-password", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const hashed = await bcrypt.hash(password, 10);

  db.query(
    "UPDATE users SET password=? WHERE username=?",
    [hashed, username],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "Password updated" });
    }
  );
});

module.exports = router;
