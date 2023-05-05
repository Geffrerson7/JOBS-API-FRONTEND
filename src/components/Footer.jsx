import React from "react";

const Footer = () => {
  return (
    <footer className="shadow bg-gradient-to-r from-green-500 to-blue-500 h-md text-xs text-right pr-2 text-white relative">
      <small>
        Developed and designed by Gefferson Casasola. &copy;{new Date().getFullYear()}. All rights
        reserved.
      </small>
    </footer>
  );
};

export default Footer;
