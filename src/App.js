import React from "react";
import './App.scss'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import SavedNotepads from "./Pages/SavedNotepads/SavedNotepads";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/saved" element={<SavedNotepads />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
