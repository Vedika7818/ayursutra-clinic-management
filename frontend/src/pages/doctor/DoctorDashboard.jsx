import { Button, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";


export default function DoctorDashboard() {
  const navigate = useNavigate();

const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};

  return (
  <>
    {/* TOP NAVBAR */}
    <Navbar title="Doctor Dashboard" onLogout={logout} />

    <div style={{ padding: "30px" }}>

      {/* PAGE TITLE */}
      <h2 style={{ marginBottom: "20px" }}>
        Doctor Panel
      </h2>

      {/* ACTION CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}
      >

        {/* CONSULTATION CARD */}
        <Card>
          <CardContent>
            <h3>Patient Consultation</h3>
            <p>
              Add diagnosis, dosha analysis, and treatment plans.
            </p>

            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/consultation")}
            >
              Start Consultation
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  </>
);

}
