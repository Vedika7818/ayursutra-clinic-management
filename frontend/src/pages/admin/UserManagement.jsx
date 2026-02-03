import { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
  username: "",
  password: "",
  role: "",
  name: "",
  specialization: ""
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
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/users");
    setUsers(res.data);
  };

  const addUser = async () => {
  if (!form.username || !form.password || !form.role) {
    showSnack("All fields are required", "error");

    return;
  }

  if (form.password.length < 6) {
    showSnack("Password must be at least 6 characters");
    return;
  }

  if (form.role === "doctor" && !form.name) {
    showSnack("Doctor name is required");
    return;
  }

  try {
    await axios.post("http://localhost:5000/api/admin/add-user", form);
    showSnack("User added successfully");
    fetchUsers();
  } catch {
    showSnack("Error adding user");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin – Add Doctor / Receptionist</h2>

      <TextField
        label="Username"
        fullWidth
        margin="normal"
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <TextField
        select
        label="Role"
        fullWidth
        margin="normal"
        onChange={(e) =>
          setForm({ ...form, role: e.target.value })
        }
      >
        <MenuItem value="doctor">Doctor</MenuItem>
        <MenuItem value="receptionist">Receptionist</MenuItem>
      </TextField>

        {form.role === "doctor" && (
  <>
    <TextField
      label="Doctor Name"
      fullWidth
      margin="normal"
      onChange={(e) =>
        setForm({ ...form, name: e.target.value })
      }
    />

    <TextField
      label="Specialization"
      fullWidth
      margin="normal"
      onChange={(e) =>
        setForm({ ...form, specialization: e.target.value })
      }
    />
  </>
  
)}

      <Button variant="contained" onClick={addUser}>
        Add User
      </Button>

      <h3 style={{ marginTop: "30px" }}>Existing Users</h3>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.username}</TableCell>
              <TableCell>{u.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
    
  );
}
