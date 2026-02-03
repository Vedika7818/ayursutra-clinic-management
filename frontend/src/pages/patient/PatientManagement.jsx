import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Grid,
  Paper,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";
import Navbar from "../../components/Navbar";


export default function PatientManagement() {
  const [patients, setPatients] = useState([]);
  const [snack, setSnack] = useState({
  open: false,
  message: "",
  severity: "success"
});
const showSnack = (message, severity = "success") => {
  setSnack({ open: true, message, severity });
};

  const [form, setForm] = useState({
  name: "",
  age: "",
  gender: "",
  phone: "",
  prakriti: "",
  vikriti: "",
  doctor_id: ""
});


  const fetchPatients = async () => {
    const res = await axios.get("http://localhost:5000/api/patients");
    setPatients(res.data);
  };

  const addPatient = async () => {
  const { name, age, gender, phone, prakriti, vikriti, doctor_id } = form;

  if (!name || !age || !gender || !phone || !prakriti || !vikriti || !doctor_id) {
    showSnack("Please fill all fields");
    return;
  }

  if (age <= 0 || age > 120) {
    showSnack("Enter valid age");
    return;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    showSnack("Enter valid 10-digit phone number");
    return;
  }

  try {
    await axios.post("http://localhost:5000/api/patients", form);
    showSnack("Patient added successfully");
    fetchPatients();
  } catch {
    showSnack("Error adding patient");
  }
};

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/doctors")
    .then(res => setDoctors(res.data));
  }, []);

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
  <>
    <Navbar title="Patient Management" />

    <div style={{ padding: "30px" }}>

      <Typography variant="h4" gutterBottom>
        Patient Management
      </Typography>

      {/* ADD PATIENT */}
      <Card sx={{ mb: 4 }}>
        <CardContent>

          <Typography variant="h6" gutterBottom>
            Add Patient
          </Typography>

          <Grid container spacing={3}>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Name"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                type="number"
                label="Age"
                onChange={(e) =>
                  setForm({ ...form, age: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                sx={{ minWidth: 250 }}
                label="Gender"
                value={form.gender}
                onChange={(e) =>
                  setForm({ ...form, gender: e.target.value })
                }
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                sx={{ minWidth: 250 }}
                label="Consulting Doctor"
                onChange={(e) =>
                  setForm({ ...form, doctor_id: e.target.value })
                }
              >
                {doctors.map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Phone"
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                sx={{ minWidth: 250 }}
                label="Prakriti"
                value={form.prakriti}
                onChange={(e) =>
                  setForm({ ...form, prakriti: e.target.value })
                }
              >
                <MenuItem value="Vata">Vata</MenuItem>
                <MenuItem value="Pitta">Pitta</MenuItem>
                <MenuItem value="Kapha">Kapha</MenuItem>
                <MenuItem value="Vata-Pitta">Vata–Pitta</MenuItem>
                <MenuItem value="Pitta-Kapha">Pitta–Kapha</MenuItem>
                <MenuItem value="Vata-Kapha">Vata–Kapha</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                sx={{ minWidth: 250 }}
                label="Vikriti"
                value={form.vikriti}
                onChange={(e) =>
                  setForm({ ...form, vikriti: e.target.value })
                }
              >
                <MenuItem value="Vata Imbalance">Vata Imbalance</MenuItem>
                <MenuItem value="Pitta Imbalance">Pitta Imbalance</MenuItem>
                <MenuItem value="Kapha Imbalance">Kapha Imbalance</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                onClick={addPatient}
              >
                Add Patient
              </Button>
            </Grid>

          </Grid>
        </CardContent>
      </Card>

      {/* PATIENT LIST */}
      <Typography variant="h6" gutterBottom>
        Patient List
      </Typography>

      <Paper elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "#e8f5e9" }}>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Age</b></TableCell>
              <TableCell><b>Gender</b></TableCell>
              <TableCell><b>Phone</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {patients.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.age}</TableCell>
                <TableCell>{p.gender}</TableCell>
                <TableCell>{p.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* SNACKBAR */}
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
