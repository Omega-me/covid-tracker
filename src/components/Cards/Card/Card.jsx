import React from 'react';
import styles from './Card.module.css';
import numeral from 'numeral';
import useData from '../../../global/DataLayer';
import { styled } from '@material-ui/core';

const Card = ({
  title,
  casesToday,
  totalCases,
  isActive,
  cases,
  recovered,
  deaths,
  ...props
}) => {
  const [{ caseType }] = useData();
  return (
    <>
      {isActive ? (
        <>
          {isActive && cases ? (
            <div
              onClick={props.onClick}
              className={`${styles.card} ${styles.activeCases}`}>
              <h5 className={styles.card__title}>{title}</h5>
              <h3>{casesToday}</h3>
              <h5 className={styles.card__total}>
                {numeral(totalCases).format('+0.00a')}
                {''} Total
              </h5>
            </div>
          ) : isActive && recovered ? (
            <div
              onClick={props.onClick}
              className={`${styles.card} ${styles.activeRecovered}`}>
              <h5 className={styles.card__title}>{title}</h5>
              <h3>{casesToday}</h3>
              <h5 className={styles.card__total}>
                {numeral(totalCases).format('+0.00a')}
                {''} Total
              </h5>
            </div>
          ) : (
            <div
              onClick={props.onClick}
              className={`${styles.card} ${styles.activeDeaths}`}>
              <h5 className={styles.card__title}>{title}</h5>
              <h3>{casesToday}</h3>
              <h5 className={styles.card__total}>
                {numeral(totalCases).format('+0.00a')}
                {''} Total
              </h5>
            </div>
          )}
        </>
      ) : (
        <>
          {cases ? (
            <div
              onClick={props.onClick}
              className={`${styles.card} ${styles.cases}`}>
              <h5 className={styles.card__title}>{title}</h5>
              <h3>{casesToday}</h3>
              <h5 className={styles.card__total}>
                {numeral(totalCases).format('+0.00a')}
                {''} Total
              </h5>
            </div>
          ) : recovered ? (
            <div
              onClick={props.onClick}
              className={`${styles.card} ${styles.recovered}`}>
              <h5 className={styles.card__title}>{title}</h5>
              <h3>{casesToday}</h3>
              <h5 className={styles.card__total}>
                {numeral(totalCases).format('+0.00a')}
                {''} Total
              </h5>
            </div>
          ) : (
            <div
              onClick={props.onClick}
              className={`${styles.card} ${styles.deaths}`}>
              <h5 className={styles.card__title}>{title}</h5>
              <h3>{casesToday}</h3>
              <h5 className={styles.card__total}>
                {numeral(totalCases).format('+0.00a')}
                {''} Total
              </h5>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Card;
