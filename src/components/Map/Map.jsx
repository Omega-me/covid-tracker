import React, { useEffect, useState } from 'react';
import styles from './Map.module.css';
import { MapContainer, Marker, Circle, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useData from '../../global/DataLayer';
import numeral from 'numeral';

const Map = () => {
  const [
    { latitude, longtitude, zoom, country, countries, caseType },
  ] = useData();
  const position = [latitude, longtitude];

  return (
    <div className={styles.map}>
      <MapContainer
        center={position}
        zoom={country === 'worldwide' ? 1.5 : zoom}
        scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {countries?.map((country, i) => (
          <Circle
            key={i}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            pathOptions={{
              color:
                caseType === 'cases'
                  ? ' #ff7b00'
                  : caseType === 'recovered'
                  ? ' green'
                  : ' red',
            }}
            radius={
              caseType === 'cases'
                ? Math.sqrt(country.cases) * 200
                : caseType === 'recovered'
                ? Math.sqrt(country.recovered) * 200
                : Math.sqrt(country.deaths) * 200
            }>
            <Popup className={styles.map__popup}>
              <img
                className={styles.map__popupImage}
                src={country.countryInfo.flag}
                alt={country.country}
              />
              <h4 className={styles.map__popupCountryName}>
                {country.country}
              </h4>
              <p className={styles.popup__cases}>
                {caseType === 'cases'
                  ? country.todayCases
                  : caseType === 'recovered'
                  ? country.todayRecovered
                  : country.todayDeaths}{' '}
                {''} Today
              </p>
              <p className={styles.popup__cases}>
                {caseType === 'cases'
                  ? numeral(country.cases).format('+0.00a')
                  : caseType === 'recovered'
                  ? numeral(country.recovered).format('+0.00a')
                  : numeral(country.deaths).format('+0.00a')}
                {''} Total
              </p>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
