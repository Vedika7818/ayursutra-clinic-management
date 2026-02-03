import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";
import Navbar from "../../components/Navbar";


export default function DoctorConsultation() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    patient_id: "",
    diagnosis: "",
    dosha: "",
    treatment_plan: ""
  });

  const [snack, setSnack] = useState({
  open: false,
  message: "",
  severity: "success"
});
const showSnack = (message, severity = "success") => {
  setSnack({ open: true, message, severity });
};

  useEffect(() => {
    axios.get("http://localhost:5000/api/patients")
      .then(res => setPatients(res.data));
  }, []);

  const submitConsultation = async () => {
    await axios.post("http://localhost:5000/api/consultations", form);
    showSnack("Consultation saved");
  };

  return (
  <>
    <Navbar title="Doctor Consultation" />

    <div style={{ padding: "30px" }}>

      <Typography variant="h4" gutterBottom>
        Doctor Consultation
      </Typography>

      <Card sx={{ maxWidth: 900, margin: "auto" }}>
        <CardContent>

          <Typography variant="h6" gutterBottom>
            Consultation Details
          </Typography>

          <Grid container spacing={3}>

            <Grid item xs={12}>
              <TextField
                select
                label="Select Patient"
                fullWidth
                sx={{ minWidth: 250 }}
                onChange={(e) =>
                  setForm({ ...form, patient_id: e.target.value })
                }
              >
                {patients.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Diagnosis"
                multiline
                rows={2}
                fullWidth
                onChange={(e) =>
                  setForm({ ...form, diagnosis: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Dosha Analysis"
                fullWidth
                onChange={(e) =>
                  setForm({ ...form, dosha: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Treatment Plan"
                fullWidth
                onChange={(e) =>
                  setForm({ ...form, treatment_plan: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                onClick={submitConsultation}
              >
                Save Consultation
              </Button>
            </Grid>

          </Grid>

        </CardContent>
      </Card>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert
          severity={snack.severity}
          onClose={() => setSnack({ ...snack, open: false })}
        >
          {snack.message}
        </Alert>
      </Snackbar>

    </div>
  </>
);

}