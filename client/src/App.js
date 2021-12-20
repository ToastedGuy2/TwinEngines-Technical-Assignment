import React from "react";
import Index from "./Components/Pages/Index.jsx";
import Add from "./Components/Forms/AddForm/AddForm.jsx";
import Edit from "./Components/Forms/EditForm/EditForm.jsx";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterLuxon from "@mui/lab/AdapterLuxon";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route
          path="/add"
          element={
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <Add />
            </LocalizationProvider>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              {/* <Edit /> */}
            </LocalizationProvider>
          }
        />
      </Routes>
    </Router>
  );
}
