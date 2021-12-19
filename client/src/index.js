import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import Index from "./Components/Pages/Index";
import theme from "./theme";
import { CssBaseline } from "@mui/material";
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline> </CssBaseline>
    <Index />
  </ThemeProvider>,
  document.getElementById("root")
);
