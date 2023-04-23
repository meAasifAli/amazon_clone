import React from "react";
import FooterBottom from "./FooterBottom";
import FooterMiddle from "./FooterMiddle";
import FooterTop from "./FooterTop";

const Footer = () => {
  return (
    <div className="font-titleFont flex flex-col items-center justify-center">
      <FooterTop />
      <FooterMiddle />
      <FooterBottom />
    </div>
  );
};

export default Footer;
