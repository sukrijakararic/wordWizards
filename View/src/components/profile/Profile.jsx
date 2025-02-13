import React, { useContext, useEffect } from "react";
import styles from "./Profile.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { UserContext } from "../../context-api/UserContext";
import { getUser } from "../../utils/services";
import { MyBlogs } from "../MyBlogs/MyBlogs";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


export const Profile = () => {
  const { loggedUser, setLoggedUser } = useContext(UserContext);

  const getUserFromDb = async () => {
    const user = await getUser();
    setLoggedUser(user);
  };

  useEffect(() => {
    getUserFromDb();
  }, []);

  return (
    <div className={styles.profileCard}>
      {loggedUser ? (
        <>
        <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Welcome to your profile</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        </Navbar.Collapse>
      </Container>
    </Navbar>
          <Card style={{ width: "18rem" }} className={styles.profileContainer}>
            <Card.Header>
              <p className={styles.profileExtras}>Wizard Card</p>
            </Card.Header>
            <ListGroup variant="flush" className={styles.listGroup}>
              <ListGroup.Item>Email: {loggedUser.email}</ListGroup.Item>
              <ListGroup.Item>Username: {loggedUser.username}</ListGroup.Item>
            </ListGroup>
          </Card>
          <h1>My Blogs</h1>
          <th></th>
          <MyBlogs />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
