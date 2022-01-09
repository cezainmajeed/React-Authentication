import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";


import Signup from "./Signup";
import Dashboard from "./Dashboard";
import { AuthProvider } from "../contexts/AuthContext";

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
    <div className="w-100" style={{maxWidth:"350px"}}>
    <Router>
       <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Dashboard/>}/>
            <Route path="/signup" element={<Signup/>} />
          </Routes>
       </AuthProvider>
    </Router>
    </div>
    </Container>
  );
}

export default App;
