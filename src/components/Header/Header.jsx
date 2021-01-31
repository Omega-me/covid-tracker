import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useEffect } from 'react';
import styles from './Header.module.css';
import useData from '../../global/DataLayer';
import axios from 'axios';
import Image from 'next/image';

const Header = () => {
  const [{ countries, country }, dispatch] = useData();

  useEffect(() => {
    const CountryData = async () => {
      const res = await axios.get('https://disease.sh/v3/covid-19/all');
      const data = await res.data;
      dispatch({
        type: 'set/countryData',
        countryData: data,
      });
      dispatch({
        type: 'set/zoom',
        zoom: 2,
      });
      dispatch({
        type: 'set/latitude',
        latitude: 51.505,
      });
      dispatch({
        type: 'set/longtitude',
        longtitude: -0.09,
      });
    };
    CountryData();
  }, []);

  const onCountryChange = e => {
    dispatch({
      type: 'set/country',
      country: e.target.value,
    });

    let Url;
    if (e.target.value === 'worldwide') {
      Url = 'https://disease.sh/v3/covid-19/all';
      dispatch({
        type: 'set/zoom',
        zoom: 1.5,
      });
    } else {
      Url = `https://disease.sh/v3/covid-19/countries/${e.target.value}`;
    }
    fetch(Url)
      .then(r => r.json())
      .then(d => {
        dispatch({
          type: 'set/countryData',
          countryData: d,
        });
        dispatch({
          type: 'set/zoom',
          zoom: 5.5,
        });
        dispatch({
          type: 'set/latitude',
          latitude: d.countryInfo?.lat || 51.505,
        });
        dispatch({
          type: 'set/longtitude',
          longtitude: d.countryInfo?.long || -0.09,
        });
      });
  };

  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>
        <Image
          className={styles.header__image}
          src='/img/covid-19.svg'
          alt='logo'
          width='80px'
          height='80px'
        />
        <h1>COVID-19 Tracker</h1>
      </div>

      <FormControl className={styles.header__dropdown}>
        <Select variant='outlined' value={country} onChange={onCountryChange}>
          <MenuItem value='worldwide'>Worldwide</MenuItem>
          {countries.map((country, i) => (
            <MenuItem key={i} value={country.countryInfo.iso2}>
              {country.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Header;
