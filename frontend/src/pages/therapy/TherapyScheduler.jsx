import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import Navbar from "../../components/Navbar";

export default function TherapyScheduler() {
  const [patients, setPatients] = useState([]);
  const [therapies, setTherapies] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [form, setForm] = useState({
    patient_id: "",
    therapy_id: "",
    doctor_id: "",
    therapy_date: "",
    therapy_time: ""
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
    axios.get("http://localhost:5000/api/patients").then(res => setPatients(res.data));
    axios.get("http://localhost:5000/api/therapy/therapies").then(res => setTherapies(res.data));
    axios.get("http://localhost:5000/api/doctors").then(res => setDoctors(res.data));
  }, []);

  const scheduleTherapy = async () => {
    const { patient_id, therapy_id, doctor_id, therapy_date, therapy_time } = form;

    if (!patient_id || !therapy_id || !doctor_id || !therapy_date || !therapy_time) {
      showSnack("All fields are required", "error");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/therapy", form);
      showSnack("Therapy scheduled successfully");
      setForm({
        patient_id: "",
        therapy_id: "",
        doctor_id: "",
        therapy_date: "",
        therapy_time: ""
      });
    } catch {
      showSnack("Scheduling failed", "error");
    }
  };

  return (
    <>
      <Navbar title="Therapy Scheduling" />

      <div style={{ padding: "30px" }}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Panchkarma Therapy Scheduling
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  sx={{ minWidth: 250 }}
                  label="Patient"
                  value={form.patient_id}
                  onChange={(e) =>
                    setForm({ ...form, patient_id: e.target.value })
                  }
                >
                  {patients.map(p => (
                    <MenuItem key={p.id} value={p.id}>
                      {p.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  sx={{ minWidth: 250 }}
                  label="Therapy"
                  value={form.therapy_id}
                  onChange={(e) =>
                    setForm({ ...form, therapy_id: e.target.value })
                  }
                >
                  {therapies.map(t => (
                    <MenuItem key={t.id} value={t.id}>
                      {t.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  sx={{ minWidth: 250 }}
                  label="Doctor"
                  value={form.doctor_id}
                  onChange={(e) =>
                    setForm({ ...form, doctor_id: e.target.value })
                  }
                >
                  {doctors.map(d => (
                    <MenuItem key={d.id} value={d.id}>
                      {d.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  type="date"
                  fullWidth
                  label="Date"
                  InputLabelProps={{ shrink: true }}
                  value={form.therapy_date}
                  onChange={(e) =>
                    setForm({ ...form, therapy_date: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  type="time"
                  fullWidth
                  label="Time"
                  InputLabelProps={{ shrink: true }}
                  value={form.therapy_time}
                  onChange={(e) =>
                    setForm({ ...form, therapy_time: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={scheduleTherapy}
                >
                  Schedule Therapy
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
