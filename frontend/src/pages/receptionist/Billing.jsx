import { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";


export default function Billing() {
  const [patients, setPatients] = useState([]);
  const [bills, setBills] = useState([]);

  const [doctors, setDoctors] = useState([]);

  const [form, setForm] = useState({
  patient_id: "",
  doctor_id: "",
  amount: "",
  package_days: "",
  payment_mode: ""
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
  fetchPatients();
  fetchDoctors();
  fetchBills();
}, []);

  const fetchDoctors = async () => {
  const res = await axios.get("http://localhost:5000/api/doctors");
  setDoctors(res.data);
};

  const fetchPatients = async () => {
    const res = await axios.get("http://localhost:5000/api/patients");
    setPatients(res.data);
  };

  const fetchBills = async () => {
    const res = await axios.get("http://localhost:5000/api/billing");
    setBills(res.data);
  };

  const generateBill = async () => {
  if (!form.patient_id || !form.doctor_id || !form.amount || !form.payment_mode) {
    showSnack("All fields are required", "error");
    return;
  }

  if (form.amount <= 0) {
    showSnack("Amount must be greater than zero");
    return;
  }

  try {
    await axios.post("http://localhost:5000/api/billing", form);
    showSnack("Bill generated","Success");
    fetchBills();
  } catch {
    showSnack("Billing failed","error");
  }
};

  return (
  <>
    <Navbar title="Billing & Payments" />

    <div style={{ padding: "30px" }}>

      <Typography variant="h4" gutterBottom>
        Billing & Payments
      </Typography>

      {/* BILLING FORM */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Generate Bill
          </Typography>

          <Grid container spacing={3}>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                sx={{ minWidth: 250 }}
                label="Patient"
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
                label="Doctor"
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

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Amount"
                onChange={(e) =>
                  setForm({ ...form, amount: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                sx={{ minWidth: 250 }}
                label="Package Days"
                onChange={(e) =>
                  setForm({ ...form, package_days: e.target.value })
                }
              >
                <MenuItem value={7}>7 Days</MenuItem>
                <MenuItem value={14}>14 Days</MenuItem>
                <MenuItem value={21}>21 Days</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                sx={{ minWidth: 250 }}
                label="Payment Mode"
                onChange={(e) =>
                  setForm({ ...form, payment_mode: e.target.value })
                }
              >
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="UPI">UPI</MenuItem>
                <MenuItem value="Online">Online</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                onClick={generateBill}
              >
                Generate Bill
              </Button>
            </Grid>

          </Grid>
        </CardContent>
      </Card>

      {/* BILLING TABLE */}
      <Typography variant="h6" gutterBottom>
        Billing Records
      </Typography>

      <Paper elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "#e8f5e9" }}>
            <TableRow>
              <TableCell><b>Patient</b></TableCell>
              <TableCell><b>Doctor</b></TableCell>
              <TableCell><b>Amount</b></TableCell>
              <TableCell><b>Package</b></TableCell>
              <TableCell><b>Mode</b></TableCell>
              <TableCell><b>Status</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {bills.map((b) => (
              <TableRow hover key={b.id}>
                <TableCell>{b.patient}</TableCell>
                <TableCell>{b.doctor}</TableCell>
                <TableCell>{b.amount}</TableCell>
                <TableCell>{b.package_days} days</TableCell>
                <TableCell>{b.payment_mode}</TableCell>
                <TableCell>{b.payment_status}</TableCell>
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
