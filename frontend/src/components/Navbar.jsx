import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Navbar({ title, onLogout }) {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#2e7d32" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        {onLogout && (
          <Button color="inherit" onClick={onLogout}>
            LOGOUT
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
