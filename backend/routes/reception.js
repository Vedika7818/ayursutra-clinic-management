const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* View scheduled therapies */
router.get("/therapies", (req, res) => {
  db.query(
    `SELECT ts.id, p.name AS patient, t.name AS therapy,
            ts.therapy_date, ts.therapy_time, ts.status, ts.notes
     FROM therapy_schedule ts
     JOIN patients p ON ts.patient_id = p.id
     JOIN therapies t ON ts.therapy_id = t.id`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

/* Mark therapy completed */
router.put("/complete/:id", (req, res) => {
  const { notes } = req.body;

  db.query(
    "UPDATE therapy_schedule SET status='Completed', notes=? WHERE id=?",
    [notes, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Therapy marked completed" });
    }
  );
});

module.exports = router;
