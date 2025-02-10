import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';



export const Footer = () => {
  return (
    <Navbar className="bg-body-tertiary" fixed="sticky-bottom">
      <Container>
        <Navbar.Brand href="#home">wordWizards</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            &copy; {new Date().getFullYear()} wordWizards. All Rights Reserved. Made with love &lt;3
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
