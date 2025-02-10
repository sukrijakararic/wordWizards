import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import styles from "./GoogleOauth.module.css";

export const GoogleOauth = () => {

  const handleGoogleOauth = async () => {
    window.location = `/api/google`;
  };

  return (
    <Button variant="light" onClick={handleGoogleOauth}>
      <img
        className={styles.oauthIcons}
        src="/google_icon.webp"
        alt="Icon of Google"
      />
    </Button>
  );
};
