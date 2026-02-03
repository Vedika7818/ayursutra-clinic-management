import { Button, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";


export default function ReceptionDashboard() {
  const navigate = useNavigate();
const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};

  return (
  <>
    {/* TOP NAVBAR */}
    <Navbar title="Reception Dashboard" />

    <div style={{ padding: "30px" }}>

      {/* PAGE TITLE */}
      <h2 style={{ marginBottom: "20px" }}>
        Reception Panel
      </h2>

      {/* ACTION CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}
      >

        {/* PATIENT CARD */}
        <Card>
          <CardContent>
            <h3>Patient Management</h3>
            <p>
              Register new patients and view existing patient records.
            </p>

            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/patients")}
            >
              Manage Patients
            </Button>
          </CardContent>
        </Card>

        {/* THERAPY CARD */}
        <Card>
          <CardContent>
            <h3>Therapy Scheduling</h3>
            <p>
              Schedule Panchkarma therapies and manage sessions.
            </p>

            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/therapy")}
            >
              Schedule Therapy
            </Button>
          </CardContent>
        </Card>

        {/* BILLING CARD */}
        <Card>
          <CardContent>
            <h3>Billing & Payments</h3>
            <p>
              Generate bills and manage patient payments.
            </p>

            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/billing")}
            >
              Billing
            </Button>
          </CardContent>
        </Card>

        <Card>
  <CardContent>
    <h3>Therapy Management</h3>
    <p>
      View and complete scheduled therapy sessions.
    </p>

    <Button
      variant="contained"
      fullWidth
      onClick={() => navigate("/reception/therapies")}
    >
      Manage Therapies
    </Button>
  </CardContent>
</Card>


      </div>
    </div>
  </>
);

}
