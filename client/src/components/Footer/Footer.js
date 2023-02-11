import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import React from "react";
import "../Footer/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerInfo">
        <p>Kontakt:</p>
        <p>
          <i>
            <FontAwesomeIcon icon={faPhone} />
          </i>
          <span>+48 111 111 111</span>
        </p>
        <p>
          <i>
            <FontAwesomeIcon icon={faEnvelope} />
          </i>
          <span>dobraksiazka@gmail.com</span>
        </p>
      </div>
      <div className="footerLink">
        <p>
          <FaFacebookSquare size={32} />
          <FaInstagramSquare size={32} />
        </p>
      </div>
      <div className="footerCopyright">
        <p>Copyright © 2022 DobraKsiążka.pl</p>
      </div>
    </footer>
  );
};

export default Footer;
