import React from 'react'
import styles from './LoadingSpinner.module.scss'

const LoadingSpinner = () => {
  return (
    <div className={styles.mySpinnerContainer}>
      <div className={styles.mySpinner}></div>
    </div>
  )
}

export default LoadingSpinner
