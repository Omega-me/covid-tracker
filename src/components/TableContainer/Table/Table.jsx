import React from 'react';
import styles from './Table.module.css';
import useData from '../../../global/DataLayer';
import numeral from 'numeral';
import { sortArray } from '../../../utils/utils';

const Table = () => {
  const [{ countries }] = useData();
  const sortedData = sortArray(countries);

  return (
    <div className={styles.table}>
      {sortedData?.map((country, i) => (
        <tr key={i} className={styles.td}>
          <td>{country.country}</td>
          <td>
            <strong>{numeral(country.cases).format('0,0')}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
