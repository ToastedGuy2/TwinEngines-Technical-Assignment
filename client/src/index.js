import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/styles";
import App from "./App";
import theme from "./theme";
import { CssBaseline } from "@mui/material";
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline> </CssBaseline>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
