import { useNavigate } from "react-router-dom";
import { Button, TextField, MenuItem, Box, Typography, Card, CardContent } from "@mui/material";
import { useState } from "react";
import { login } from "../../services/authService";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "", role: "" });
  const navigate = useNavigate();
  const [snack, setSnack] = useState({
  open: false,
  message: "",
  severity: "success"
});
  const showSnack = (message, severity = "success") => {
  setSnack({ open: true, message, severity });
};

  const handleLogin = async () => {
  if (!form.username || !form.password || !form.role) {
    showSnack("All fields are required", "error");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        username: form.username,
        password: form.password
      }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("username", res.data.username);

    showSnack("Login Successful", "success");

    if (res.data.role === "admin") {
      navigate("/admin");
    } else if (res.data.role === "doctor") {
      navigate("/doctor");
    } else if (res.data.role === "receptionist") {
      navigate("/reception");
    }

  } catch (err) {
    showSnack("Invalid login credentials", "error");
  }
};

  return (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #e8f5e9, #ffffff)"
    }}
  >
    <Card sx={{ width: 380 }}>
      <CardContent>

        {/* TITLE */}
        <Typography variant="h4" align="center" gutterBottom>
          AyurSutra
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Ayurvedic Clinic Management System
        </Typography>

        {/* USERNAME */}
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        {/* PASSWORD */}
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* ROLE */}
        <TextField
          select
          fullWidth
          label="Role"
          margin="normal"
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="doctor">Doctor</MenuItem>
          <MenuItem value="receptionist">Receptionist</MenuItem>
        </TextField>

        {/* LOGIN BUTTON */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{ mt: 3 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        {/* FORGOT PASSWORD */}
        <Button
          variant="text"
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </Button>

      </CardContent>
    </Card>

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

  </Box>
);

}
