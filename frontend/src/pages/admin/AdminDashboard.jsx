import { Button, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";


export default function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};

  return (
  <>
    {/* TOP NAVBAR */}
    <Navbar title="Admin Dashboard" />

    <div style={{ padding: "30px" }}>

      {/* PAGE HEADING */}
      <h2 style={{ marginBottom: "20px" }}>
        Administration Panel
      </h2>

      {/* ACTION CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}
      >

        <Card elevation={3} sx={{ borderRadius: 3 }}>
          <CardContent>
            <h3>Manage Users</h3>
            <p>
              Add doctors and receptionists, and manage system users.
            </p>

            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/admin/users")}
            >
              Go to User Management
            </Button>
          </CardContent>
        </Card>

        
      </div>
    </div>
  </>
);

}
