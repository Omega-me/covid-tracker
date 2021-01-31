import axios from 'axios'
import dynamic from 'next/dynamic'
import React, { useEffect, useMemo } from 'react'
import styles from '../styles/PageStyles/HomePageStyles/Home.module.css'
import Layout from '../components/Layout/Layout'
import Header from '../components/Header/Header'
import Cards from '../components/Cards/Cards'
import MapLoading from '../components/Map/MapLoading/MapLoading.jsx'
import TableContainer from '../components/TableContainer/TableContainer'
import useData from '../global/DataLayer'


const CountriesUrl = 'https://disease.sh/v3/covid-19/countries';

export default function Home({ data }) {
  const [{ caseType, zoom, latitude, longtitude, country, countryData }, dispatch] = useData()

  useEffect(() => {
    dispatch({
      type: 'set/countries',
      countries: data
    })
  }, [data])


  /////////here we prepare the map for rendering on next js this is a next js way for rendering//////////////
  ////////leaflet map because the normal way not work on next.js
  const Map = React.useMemo(() => dynamic(
    () => import('../components/Map/Map'),//we import the map component here
    {
      loading: () => <MapLoading />, //this is a loading state
      ssr: false // This line is important. It's what prevents server-side render
    }
  ), [caseType, zoom, latitude, longtitude, country, countryData])//we add caseType variable there for rerendering the map when the caseType changes 
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Layout >
      <div className={styles.container}>
        <div className={styles.constainer__left}>
          <Header />
          <Cards />
          <Map /> {/* this is the map importetd form the functiom from useMemo */}
        </div>
        <div className={styles.container__right}>
          <TableContainer />
        </div>
      </div>
    </Layout>
  )
}


export async function getServerSideProps(context) {
  const res = await axios.get(CountriesUrl);
  const data = res.data;

  return {
    props: {
      data,
    },
  };
}