import React, { useContext, useEffect } from "react";
import styles from "./Profile.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { UserContext } from "../../context-api/UserContext";
import { getUser } from "../../utils/services";
import { Link } from "react-router-dom";

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
        <Card style={{ width: "18rem" }} className={styles.profile}>
          <Card.Header>
            <p className={styles.profileExtras}>Wizard Card</p>
          </Card.Header>
          <ListGroup variant="flush" className={styles.listGroup}>
            <ListGroup.Item>Email: {loggedUser.email}</ListGroup.Item>
            <ListGroup.Item>Username: {loggedUser.username}</ListGroup.Item>
            <ListGroup.Item>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
