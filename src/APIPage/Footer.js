import React from "react";

const Footer = () => {
  return (
    <footer className="a-footer">
      <div className="footer-container">
        <p className="a-footer-text">
          &copy; {new Date().getFullYear()} Footymetrics. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
