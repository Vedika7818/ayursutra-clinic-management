const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* Add consultation */
router.post("/", (req, res) => {
  const { patient_id, diagnosis, dosha, treatment_plan } = req.body;

  db.query(
    "INSERT INTO consultations (patient_id, diagnosis, dosha, treatment_plan) VALUES (?, ?, ?, ?)",
    [patient_id, diagnosis, dosha, treatment_plan],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Consultation added" });
    }
  );
});

/* View consultations by patient */
router.get("/:patientId", (req, res) => {
  db.query(
    "SELECT * FROM consultations WHERE patient_id = ?",
    [req.params.patientId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

module.exports = router;
