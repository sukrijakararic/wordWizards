import React, { useContext} from "react";
import styles from "./Login.module.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../context-api/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/services";
import { GoogleOauth } from "../googleOauth/GoogleOauth";

export const Login = () => {
  const { setLoggedIn } = useContext(AuthContext);
  const Navigate = useNavigate();

const handleLogin = async (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  const user = {
    email: data.get("email"),
    password: data.get("password"),
  };
  const response = await login(user);
  event.target.reset();
  if (response.message === "Logged in") {
    setLoggedIn(true);
    Navigate("/");
  } else {
    document.getElementById("responseStatus").textContent = response.message;
  }
};

  return (
    <div className={styles.loginContainer}>
    <form onSubmit={handleLogin} className={styles.loginForm}>
      <h2 className={styles.loginTitle}>Login</h2>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" name="email" placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" name="password" placeholder="Password" />
      </FloatingLabel>
      <p className={styles.responseStatus} id="responseStatus"></p>
      <Button variant="success" type="submit">
        Submit
      </Button>
      <p>Or log in with</p>
      <GoogleOauth />
      <p>
        Don't have an account? <Link to="/" className={styles.registerLink}>Register</Link>
      </p>
    </form>
    </div>
  );
};
