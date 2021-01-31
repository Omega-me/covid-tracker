import React, { useState } from 'react';
import styles from './Cards.module.css';
import Card from './Card/Card';
import useData from '../../global/DataLayer';

const Cards = () => {
  const [{ countryData, caseType }, dispatch] = useData();
  // const [isTotal, setIsTotal] = useState(true);
  const [isRecoverd, setIsRecovered] = useState(false);
  const [isDeath, setIsDeath] = useState(false);

  const handleTotal = () => {
    dispatch({
      type: 'set/CaseData',
      caseType: 'cases',
    });
  };
  const handleRecovered = () => {
    dispatch({
      type: 'set/CaseData',
      caseType: 'recovered',
    });
  };
  const handleDeaths = () => {
    dispatch({
      type: 'set/CaseData',
      caseType: 'deaths',
    });
  };

  return (
    <div className={styles.cards}>
      <Card
        cases
        isActive={caseType === 'cases'}
        onClick={handleTotal}
        title='Coronavirus Cases'
        casesToday={countryData.todayCases}
        totalCases={countryData.cases}
      />
      <Card
        recovered
        isActive={caseType === 'recovered'}
        onClick={handleRecovered}
        title='Recovered'
        casesToday={countryData.todayRecovered}
        totalCases={countryData.recovered}
      />
      <Card
        deaths
        isActive={caseType === 'deaths'}
        onClick={handleDeaths}
        title='Deaths'
        casesToday={countryData.todayDeaths}
        totalCases={countryData.deaths}
      />
    </div>
  );
};

export default Cards;
