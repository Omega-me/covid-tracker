import React from 'react';
import styles from './TableContainer.module.css';
import Table from './Table/Table';
import LineGraph from './LineGraph/LineGraph';

const TableContainer = () => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.table}>
          <h1>Cases by country</h1>
          <Table />
        </div>
        <div className={styles.graph}>
          <LineGraph />
        </div>
      </div>
    </div>
  );
};

export default TableContainer;
