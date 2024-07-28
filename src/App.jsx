import React from "react";
import "./index.css";
import Dashboard from "./component/pages/dashboard/Dashboard";
import Login from "./component/pages/dashboard/sign in/Signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Dashboard />
    </>
  );
}

export default App;
