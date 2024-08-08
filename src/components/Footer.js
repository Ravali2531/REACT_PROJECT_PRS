import React from 'react';
import { Footer } from 'flowbite-react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';
import '../css/Footer.css'; 

const MyFooter = () => {
  return (
    <Footer bgDark>
      <div className="footer-container">
        <div className="footer-content">
          <Footer.Link href="/about">About</Footer.Link>
          <Footer.Link href="/privacy-policy">Privacy Policy</Footer.Link>
          <Footer.Link href="/licensing">Licensing</Footer.Link>
          <Footer.Link href="/terms-and-conditions">Terms & Conditions</Footer.Link>
          <Footer.Link href="#">Contact Us</Footer.Link>
        </div>
        <div className="footer-bottom">
          <Footer.Copyright href="#" by="BookStore" year={2024} />
          <div className="social-icons">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default MyFooter;
