import React, { useState } from "react";
import styles from "./LandingPage.module.css";
import { Registration } from "../Registration/Registration";

export const LandingPage = () => {
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
};
