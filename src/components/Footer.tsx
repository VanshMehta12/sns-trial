"use client"
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Footer() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const pathname = usePathname(); // Get current path
  const [LanguageRoute, setLanguageRoute] = useState("")

  useEffect(() => {
    const lang = localStorage.getItem("language");
    if (lang) {
      setLanguageRoute(`/${lang}/`);
    }
  }, [pathname])


  const toggleSection = (section: string) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <footer>
      <div className="container">
        <div className="footer_top_logo">
          <div className="footer_logo">
            <img src="/assets/img/logo.svg" alt="Logo" />
          </div>
          <h2>We will show by doing what we say..</h2>
        </div>

        <h4 className="footer_title hide_desktop" onClick={() => toggleSection("menu")}>
          Our Menu
        </h4>
        <div className={`footer_navigation collapsed-content ${openSections.menu ? "footerbar_show" : ""}`}>
          <ul>
            <li><a href={`${LanguageRoute}`} className="text-decoration-none">Praja Shakti</a></li>
            <li><a href={`${LanguageRoute}about`} className="text-decoration-none">About Party</a></li>
            <li><a href={`${LanguageRoute}sangathan`} className="text-decoration-none">Sangathan</a></li>
            <li><a href={`${LanguageRoute}media`} className="text-decoration-none">Media</a></li>
            <li><a href={`${LanguageRoute}contestelection`} className="text-decoration-none">Contest Election</a></li>
            <li><a href={`${LanguageRoute}events`} className="text-decoration-none">Event</a></li>
            <li><a href={`${LanguageRoute}shop`} className="text-decoration-none">Shop</a></li>
            <li><a href={`${LanguageRoute}e-greetings`} className="text-decoration-none">E-Greetings</a></li>
          </ul>
        </div>

        <div className="row bottom_footer">
          <div className="col-lg-5">
            <div className="single_footer_widget">
              <div className="widget_head">
                <h4 className="footer_title" onClick={() => toggleSection("app")}>Get the App</h4>
                <div className={`apps_image collapsed-content ${openSections.app ? "footerbar_show" : ""}`}>
                  <a href="#"><img src="/assets/img/google_play.svg" alt="Google Play" /></a>
                  <a href="#"><img src="/assets/img/app_store.svg" alt="App Store" /></a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="single_footer_widget">
              <div className="widget_head">
                <h4 className="footer_title" onClick={() => toggleSection("party")}>Party</h4>
                <div className={`footer_btn collapsed-content ${openSections.party ? "footerbar_show" : ""}`}>
                  <a href={`${LanguageRoute}donation`} className="top_btn donate_btn text-decoration-none">Donation</a>
                  <a href={`/join`} className="top_btn jont_party_btn text-decoration-none">Join Party</a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="single_footer_widget">
              <div className="widget_head">
                <h4 className="footer_title" onClick={() => toggleSection("location")}>Location</h4>
                <div className={`footer_loc collapsed-content ${openSections.location ? "footerbar_show" : ""}`}>
                  <ul className="footer_location">
                    <li>Adalaj Bridge, Sarkhej - </li>
                    <li>Gandhinagar Hwy, </li>
                    <li>Adalaj, Gujarat 382421</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer_bottom_wrapper">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-3">
                <div className="footer_social">
                  <h4>Follow</h4>
                  <ul>
                    <li><a href="#"><img src="/assets/img/fb.svg" alt="Facebook" /></a></li>
                    <li><a href="#"><img src="/assets/img/ins.svg" alt="Instagram" /></a></li>
                    <li><a href="#"><img src="/assets/img/twi.svg" alt="Twitter" /></a></li>
                    <li><a href="#"><img src="/assets/img/youtube.svg" alt="YouTube" /></a></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-9">
                <p className="copy_right">
                  © Praja Shakti Democratic Party All rights reserved. ॰ Privacy Policy Refund ॰ Cancellation Terms and Conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
