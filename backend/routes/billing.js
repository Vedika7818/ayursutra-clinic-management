const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* Create bill */
router.post("/", (req, res) => {
  const { patient_id, doctor_id, amount, package_days, payment_mode } = req.body;

    db.query(
  "INSERT INTO billing (patient_id, doctor_id, amount, package_days, payment_mode, payment_status) VALUES (?, ?, ?, ?, ?, 'Paid')",
  [patient_id, doctor_id, amount, package_days, payment_mode],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Bill generated" });
    }
  );
});

/* View all bills */
router.get("/", (req, res) => {
  db.query(
    `SELECT 
        b.id,
        p.name AS patient,
        d.name AS doctor,
        b.amount,
        b.package_days,
        b.payment_mode,
        b.payment_status,
        b.created_at
     FROM billing b
     JOIN patients p ON b.patient_id = p.id
     JOIN doctors d ON b.doctor_id = d.id`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});


module.exports = router;
