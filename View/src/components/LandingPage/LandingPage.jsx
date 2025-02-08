import React from 'react'
import styles from './LandingPage.module.css'

export const LandingPage = () => {
  return (
    <div>
        <div className={styles.container}>
            <div className={styles.title}>Welcome to the Landing Page</div>
            <div className={styles.subtitle}>This is a simple landing page</div>
        </div>
    </div>
  )
}
