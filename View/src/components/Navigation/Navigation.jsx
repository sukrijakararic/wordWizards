import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context-api/AuthContext";
import { logout } from "../../utils/services";

export const Navigation = () => {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
  };
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="light"
        data-bs-theme="light"
      >
        <Container>
          <Navbar.Brand>
            <Link to="/" className={styles.navLink}>
              wordWizards
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/" className={styles.navLink}>
                  tbd
                </Link>
              </Nav.Link>
              {loggedIn === true ? (
                <>
                  <Nav.Link>
                    <Link to="/profile" className={styles.navLink}>
                      Profile
                    </Link>
                  </Nav.Link>

                  <Nav.Link>
                    <Link to="/" onClick={handleLogout} className={styles.navLink}>
                      Logout
                    </Link>
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link>
                  <Link to="/login" className={styles.navLink}>
                    Login
                  </Link>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
