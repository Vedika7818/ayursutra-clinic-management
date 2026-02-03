import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

/* CREATE THEME FIRST */
const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#4CAF50",   // soft balanced green
      light: "#A5D6A7",
      dark: "#388E3C"
    },

    secondary: {
      main: "#81C784",   // pastel green
      light: "#C8E6C9"
    },

    background: {
      default: "#c9e9d7", // very light mint background
      paper: "#FFFFFF"
    },

    text: {
      primary: "#2E3A34",
      secondary: "#5F6F68"
    }
  },

  typography: {
    fontFamily: "Roboto, Arial",
    h4: {
      fontWeight: 600
    },
    h5: {
      fontWeight: 500
    },
    button: {
      textTransform: "none",
      fontWeight: 600
    }
  },

  shape: {
    borderRadius: 12
  }
});


/* SINGLE RENDER */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
