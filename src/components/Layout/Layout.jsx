import React from 'react';
import styles from './Layout.module.css';
import Footer from '../Footer/Footer';
import Head from 'next/head';
import useData from '../../global/DataLayer';

const Layout = ({ children }) => {
  const [{ caseType }] = useData();
  return (
    <div className={styles.layout}>
      <Head>
        <title>Covid-19 {caseType}</title>
        <link rel='icon' href='/img/virus.svg' />
      </Head>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
