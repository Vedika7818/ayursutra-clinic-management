import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar({ title }) {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          {title || "AyurSutra"}
        </Typography>

        <div>
          <Typography
            variant="body1"
            style={{ marginRight: "20px", display: "inline-block" }}
          >
            Role: {role}
          </Typography>

          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
