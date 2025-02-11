import React, { useContext } from "react";
import styles from "./LandingPage.module.css";
import { Registration } from "../Registration/Registration";
import { AuthContext } from "../../context-api/AuthContext";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  const { loggedIn } = useContext(AuthContext);

  if (loggedIn) {
    return (
      <div className={styles.landingPage}>
        <div className={styles.title}>
          <h1>
            Welcome to <span className={styles.wordWizards}>wordWizards</span>
          </h1>
          <h3>Unleash the power of words!</h3>{" "}
          <h5>Lets get to writing, <Link to="/createBlog" className={styles.shallWe}>shall we?</Link></h5>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.landingPage}>
        <div className={styles.title}>
          <h1>
            Welcome to <span className={styles.wordWizards}>wordWizards</span>
          </h1>
          <h3>Unleash the power of words!</h3>{" "}
        </div>
        <Registration />
      </div>
    );
  }
};
