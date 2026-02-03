import { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [snack, setSnack] = useState({
  open: false,
  message: "",
  severity: "success"
});
const showSnack = (message, severity = "success") => {
  setSnack({ open: true, message, severity });
};

  const resetPassword = async () => {
  if (!username || !password) {
    showSnack("All fields are required", "error");

    return;
  }

  if (password.length < 6) {
    showSnack("Password must be at least 6 characters");
    return;
  }

  try {
    await axios.post("http://localhost:5000/api/auth/forgot-password", {
      username,
      password
    });
    showSnack("Password updated successfully");
    navigate("/");
  } catch {
    showSnack("User not found");
  }
};


  return (
    <Box sx={{ width: 350, margin: "100px auto", textAlign: "center" }}>
      <Typography variant="h5">Reset Password</Typography>

      <TextField
        fullWidth
        label="Username"
        margin="normal"
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextField
        fullWidth
        label="New Password"
        type="password"
        margin="normal"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={resetPassword}>
        Update Password
      </Button>
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
