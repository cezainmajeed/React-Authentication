import React, {useRef,useState} from "react";
import { Form,Button,Card,Alert } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Signup(){
  const emailRef=useRef();
  const passwordRef=useRef();
  const confirmPasswordRef=useRef();
  const { signup,signInWithGoogle } = useAuth();
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if(passwordRef.current.value !== confirmPasswordRef.current.value)
    {
      return setError("Password do not match.");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value,passwordRef.current.value);
      navigate("/verify-email");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  async function googleLogin() {
    try{
      setError("");
      setLoading(true);
      await signInWithGoogle();
      navigate("/");
    } catch {
      setError("Failed to log in");
    }
  }

  return (
    <>
    <Card>
    <Card.Body>
    <h2 className="text-center mb-4">Signup</h2>
    {error && <Alert variant="danger">{error}</Alert>}
    <Form onSubmit={handleSubmit}>

    <Form.Group id="email">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" ref={emailRef} required />
    </Form.Group>

    <Form.Group id="password">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" ref={passwordRef} required />
    </Form.Group>

    <Form.Group id="confirm-password">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control type="password" ref={confirmPasswordRef} required />
    </Form.Group>

    <Button disabled={loading} className="w-100 mt-4" type="submit">Signup</Button>

    </Form>
    </Card.Body>
    </Card>
    <Button variant="danger" className="w-100 mt-4 mb-2" onClick={googleLogin}>Signup with Google</Button>
    <div className="w-100 text-center mt-2">
      Already have an account? <Link to="/login">Login</Link>
    </div>
    </>
  );
}
