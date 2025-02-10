import React from "react";
import styles from "./Registration.module.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { addUser } from "../../services";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOauth } from "../googleOauth/GoogleOauth";

export const Registration = () => {
  const Navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const user = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    };
    const response = await addUser(user);
    event.target.reset();
    document.getElementById("responseStatus").textContent = response.message;
    if (response.message === "User created") {
      Navigate("/profile");
    }
  };

  return (
    <form className={styles.registrationForm} onSubmit={handleSubmit}>
      <h3>Register</h3>
      <FloatingLabel
        controlId="floatingInput1"
        label="username"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="" name="username" />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput1"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="" name="email" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password" name="password" />
      </FloatingLabel>
      <Button
        variant="success"
        type="submit"
        className={styles.registrationSubmit}
      >
        Submit
      </Button>{" "}
      <p className={styles.responseStatus} id="responseStatus"></p>
      <p className={styles.oauthRegister}>Or register with</p>
      <GoogleOauth />
      <p className={styles.oauthRegister}>
        Already have an account?{" "}
        <Link to="/login" className={styles.loginLink}>
          Login
        </Link>
      </p>
    </form>
  );
};
