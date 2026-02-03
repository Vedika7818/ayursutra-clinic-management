import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Typography,
  Chip
} from "@mui/material";
import Navbar from "../../components/Navbar";


export default function ReceptionTherapyManagement() {
  const [therapies, setTherapies] = useState([]);

  const fetchTherapies = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/reception/therapies"
    );
    setTherapies(res.data);
  };

  const completeTherapy = async (id, notes) => {
    await axios.put(
      `http://localhost:5000/api/reception/complete/${id}`,
      { notes }
    );
    fetchTherapies();
  };

  useEffect(() => {
    fetchTherapies();
  }, []);

  return (
  <>
    <Navbar title="Therapy Management" />

    <div style={{ padding: "30px" }}>

      <Typography variant="h4" gutterBottom>
        Therapy Management
      </Typography>

      <Grid container spacing={3}>

        {therapies.map((t) => (
          <Grid item xs={12} md={6} key={t.id}>
            <Card>
              <CardContent>

                <Typography variant="h6">
                  {t.patient}
                </Typography>

                <Typography color="text.secondary">
                  Therapy: {t.therapy}
                </Typography>

                <Typography>
                  Date: {t.therapy_date} | Time: {t.therapy_time}
                </Typography>

                <Chip
                  label={t.status}
                  color={t.status === "Completed" ? "success" : "warning"}
                  sx={{ mt: 1, mb: 2 }}
                />

                {t.status === "Scheduled" && (
                  <>
                    <TextField
                      fullWidth
                      size="small"
                      label="Therapy Notes"
                      sx={{ mb: 2 }}
                      onChange={(e) => (t.notes = e.target.value)}
                    />

                    <Button
                      variant="contained"
                      onClick={() => completeTherapy(t.id, t.notes)}
                    >
                      Mark Completed
                    </Button>
                  </>
                )}

              </CardContent>
            </Card>
          </Grid>
        ))}

      </Grid>
    </div>
  </>
);

}
