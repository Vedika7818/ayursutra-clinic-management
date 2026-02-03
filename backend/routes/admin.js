const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../config/db");

/* VIEW USERS */
router.get("/users", (req, res) => {
  db.query(
    "SELECT id, username, role FROM users",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

/* ADD DOCTOR / RECEPTIONIST */
router.post("/add-user", async (req, res) => {
  const { username, password, role, name, specialization } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (role !== "doctor" && role !== "receptionist") {
    return res.status(400).json({ message: "Invalid role" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
    [username, hashedPassword, role],
    (err, result) => {
      if (err) return res.status(500).json(err);

      const userId = result.insertId;

      if (role === "doctor") {
        db.query(
          "INSERT INTO doctors (user_id, name, specialization) VALUES (?, ?, ?)",
          [userId, name, specialization],
          () => res.json({ message: "Doctor added successfully" })
        );
      } else {
        res.json({ message: "Receptionist added successfully" });
      }
    }
  );
});

module.exports = router;
