import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h5>
        &copy;{''} {new Date().getFullYear()} {''} Omega-me
      </h5>
    </footer>
  );
};

export default Footer;
