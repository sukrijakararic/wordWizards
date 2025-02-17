import React, { useContext, useEffect } from "react";
import styles from "./Profile.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { UserContext } from "../../context-api/UserContext";
import { getUser } from "../../utils/services";
import { MyBlogs } from "../MyBlogs/MyBlogs";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


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
        <div className={styles.profileContainer}>
          <h1>Profile</h1>
          <Card style={{ width: "20rem" }} className={styles.profileContainer}>
            <Card.Header>
              <p className={styles.profileExtras}>Wizard Card</p>
            </Card.Header>
            <ListGroup variant="flush" className={styles.listGroup}>
              <ListGroup.Item>Email: {loggedUser.email}</ListGroup.Item>
              <ListGroup.Item>Username: {loggedUser.username}</ListGroup.Item>
            </ListGroup>
          </Card>
          </div>
          <Tabs
      defaultActiveKey="myBlogs"
      id="uncontrolled-tab-example"
      className="mb-3"
      style={{ margin: "1rem" }}
    >
      <Tab eventKey="myBlogs" title="My Blogs">
        <MyBlogs />
      </Tab>
      <Tab eventKey="myComments" title="My Comments">
        Tab content for Profile
      </Tab>
    </Tabs>

          
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
