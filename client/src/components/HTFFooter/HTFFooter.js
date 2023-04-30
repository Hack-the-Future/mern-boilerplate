import './HTFFooter.css'
import React from 'react'

import footerLogo from '../images/HTF-abbrev-logo.png'

function HTFFooter() {
  return (    

    /**
     * Add this component to your other files.
     * It will display a short footer crediting Hack the Future for developing this site.
     * 
     * IMPORTANT: You will need to include the abbreviated "HTF" Hack the Future logo in your project for the logo to appear.
     *            This can be downloaded here: https://htfpurdue.org/assets/images/logo/main.png.
     *            In this file, on line 4, the image is assumed to be named HTF-abbrev-logo.png.
     *            You will need to update this path and image name for your project.
     */

    <div>
      <footer className="htf-footer-main">
        {/* Logo */}
        <a href="https://htfpurdue.org" target="_blank" rel="noreferrer">
        <img
          className="htf-footer-logo"
          alt="Hack the Future Logo"
          src={footerLogo}
        ></img>
        </a>

        {/* Each section of the footer is in a "footer-box" for styling */}

        {/* Blurb stating it was created by Hack the Future */}
        <div className="htf-footer-box-one">
          <p className="htf-footer-text-one">
            Website developed by <a className="htf-link" href="https://htfpurdue.org" target="_blank" rel="noreferrer">Hack the Future</a>, a club at Purdue University.
          </p>
        </div>

        {/* Contant links for Hack the Future */}
        <div className="htf-footer-links">
            {/* Hack the Future email */}
            <div className="htf-footer-box-two">
            <p className="htf-footer-text-two">
                <a className="htf-link" href="mailto:htfpurdue@gmail.com">
                htfpurdue@gmail.com
                </a>
            </p>
            </div>

            {/* Hack the Future instagram link */}
            <div className="htf-footer-box-one">
            <p className="htf-footer-text-two">
                <a className="htf-link" href="https://www.instagram.com/hackthefuturepurdue/" target="_blank" rel="noreferrer">
                Instagram
                </a>
            </p>
            </div>
        </div>
      </footer>
    </div>
  )
}

export default HTFFooter
