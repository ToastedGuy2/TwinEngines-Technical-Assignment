import React from "react";
import Index from "./Components/Pages/Index.jsx";
import Add from "./Components/Forms/AddForm/AddForm.jsx";
import Edit from "./Components/Pages/Edit.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}
