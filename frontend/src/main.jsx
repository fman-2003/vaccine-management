import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Everything here is in rem so MUI's own components scale with the rest of the
// app (see the fluid root font-size in index.css). MUI's typography is already
// rem-based; spacing and a few component internals are px by default.
const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  // sx={{ gap: 2 }}, <Grid spacing={4}> etc. -> multiples of 0.5rem (8px at 1440px wide)
  spacing: (factor) => `${0.5 * factor}rem`,
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        // Same as MUI's defaults (16.5px 14px, 8.5px when small), in rem.
        // Sides next to an adornment stay at MUI's 0.
        root: ({ ownerState }) => ({
          ...(ownerState.startAdornment && { paddingLeft: "0.875rem" }),
          ...(ownerState.endAdornment && { paddingRight: "0.875rem" }),
          ...(ownerState.multiline && {
            padding: ownerState.size === "small" ? "0.53rem 0.875rem" : "1.03rem 0.875rem",
          }),
        }),
        input: ({ ownerState }) =>
          ownerState.multiline
            ? {}
            : {
                paddingTop: ownerState.size === "small" ? "0.53rem" : "1.03rem",
                paddingBottom: ownerState.size === "small" ? "0.53rem" : "1.03rem",
                ...(!ownerState.startAdornment && { paddingLeft: "0.875rem" }),
                ...(!ownerState.endAdornment && { paddingRight: "0.875rem" }),
              },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: { padding: "0.5625rem" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { padding: "0.375rem 1rem", minWidth: "4rem" },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: { padding: "0.5rem" },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minWidth: "5.625rem",
          minHeight: "3rem",
          padding: "0.75rem 1rem",
        },
        labelIcon: { minHeight: "4.5rem" },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: { width: "2.5rem", height: "2.5rem" },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: { minHeight: "3rem", padding: "0.375rem 1rem" },
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
