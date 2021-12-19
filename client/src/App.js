import React from "react";
import Index from "./Components/Pages/Index.jsx";
import Add from "./Components/Pages/Add.jsx";
import Edit from "./Components/Pages/Edit.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route path="/add">
          <Add />
        </Route>
        <Route path="/edit">
          <Edit />
        </Route>
      </Switch>
    </Router>
  );
}
