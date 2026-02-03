const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", (req, res) => {
  const { name, age, gender, phone, prakriti, vikriti } = req.body;

  db.query(
    "INSERT INTO patients (name, age, gender, phone, prakriti, vikriti) VALUES (?, ?, ?, ?, ?, ?)",
    [name, age, gender, phone, prakriti, vikriti],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Patient added" });
    }
  );
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM patients", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

module.exports = router;
