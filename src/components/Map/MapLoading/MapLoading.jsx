import React from 'react';
import styles from './MapLoading.module.css';

const MapLoading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__spinner} />
    </div>
  );
};

export default MapLoading;
