const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* Get therapies */
router.get("/therapies", (req, res) => {
  db.query("SELECT * FROM therapies", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* Schedule therapy */
router.post("/schedule", (req, res) => {
  const { patient_id, therapy_id, therapist_name, therapy_date, therapy_time } = req.body;

  // basic conflict check
  db.query(
    "SELECT * FROM therapy_schedule WHERE therapist_name = ? AND therapy_date = ? AND therapy_time = ?",
    [therapist_name, therapy_date, therapy_time],
    (err, result) => {
      if (result.length > 0) {
        return res.status(400).json({ message: "Therapist already booked" });
      }

      db.query(
        "INSERT INTO therapy_schedule (patient_id, therapy_id, therapist_name, therapy_date, therapy_time) VALUES (?, ?, ?, ?, ?)",
        [patient_id, therapy_id, therapist_name, therapy_date, therapy_time],
        (err) => {
          if (err) return res.status(500).json(err);
          res.json({ message: "Therapy scheduled" });
        }
      );
    }
  );
});

module.exports = router;
