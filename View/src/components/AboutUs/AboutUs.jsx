import React from "react";
import styles from "./AboutUs.module.css";

export const AboutUs = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutContent}>
        <h1 className={styles.aboutTitle}> 📜 Welcome to WordWizards! ✨</h1>
        <p className={styles.aboutText}>
          At <span className={styles.highlight}>WordWizards</span>, Whether
          you're a seasoned writer, an aspiring blogger, or just someone who
          loves a good read, you've found your haven.
        </p>
        <p className={styles.aboutText}>
          Our mission? To weave stories, share knowledge, and spark
          conversations—one post at a time.
        </p>
        <p className={styles.aboutText}>
          So grab your quill (or keyboard) and join us in fun and productive
          conversations! 📝✨
        </p>
        <div className={styles.aboutFooter}>
          <p>📖 Happy Writing! — The WordWizards Team</p>
        </div>
      </div>
    </div>
  );
};
