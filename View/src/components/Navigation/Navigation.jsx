import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const Navigation = () => {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">tbd</Nav.Link>
            <Nav.Link href="#features">tbd</Nav.Link>
            <Nav.Link href="#pricing">tbd</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
