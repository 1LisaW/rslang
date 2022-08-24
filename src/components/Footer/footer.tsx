import React from 'react';
import './footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__rs-logo" />
      <div className="footer__github-info">
        <a className="footer__github-link" href="https://github.com/1lisaw" target="_blank" rel="noreferrer">1lisaw</a>
        <a className="footer__github-link" href="https://github.com/Weranika" target="_blank" rel="noreferrer">Weranika</a>
        <a className="footer__github-link" href="https://github.com/madkorney" target="_blank" rel="noreferrer">madkorney</a>
      </div>
      <p className="footer__year">2022</p>
    </footer>
  );
}

export default Footer;
