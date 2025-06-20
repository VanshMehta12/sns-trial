"use client";
import { usePathname } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';

export default function ReachUsSection() {
  const [activeTab, setActiveTab] = useState("karyalay");
  const pathname = usePathname();
  const isGujarati = pathname.includes("/gu");

  const joinIframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = joinIframeRef.current;

    const handleIframeLoad = () => {
      try {
        const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document;
        if (iframeDoc) {
          const header = iframeDoc.querySelector('header, .header');
          if (header) header.remove();

          const footer = iframeDoc.querySelector('footer, .footer');
          if (footer) footer.remove();

          const navigationElements = iframeDoc.querySelectorAll('nav, .navigation');
          navigationElements.forEach(el => el.remove());

          const styleTag = iframeDoc.createElement('style');
          styleTag.textContent = `
            body { margin: 0 !important; padding: 0 !important; }
            header, footer, nav { display: none !important; }
            .container { padding: 0 !important; }
          `;
          iframeDoc.head.appendChild(styleTag);
        }
      } catch (error) {
        console.warn('Cannot modify iframe content:', error);
      }
    };

    iframe?.addEventListener('load', handleIframeLoad);
    return () => iframe?.removeEventListener('load', handleIframeLoad);
  }, [activeTab]);

  return (
    <section className="reach_us_section">
      <div className="container">
        <div className="title_info">
            <h2 className="title text-white">
              {isGujarati ? "કાર્યાલય સુધી પહોંચો" : "Reach us to Karyalay"}
            </h2>
        </div>

        <div className="reach_us_bg mt-65">
          <ul className="toggle-tabs">
            <li
              className={activeTab === "karyalay" ? "active-tab" : ""}
              onClick={() => setActiveTab("karyalay")}
            >
              {isGujarati ? "અમારું કાર્યાલય" : "Our Karyalay"}
            </li>
            <li
              className={activeTab === "join" ? "active-tab" : ""}
              onClick={() => setActiveTab("join")}
            >
              {isGujarati ? "પાર્ટીમાં જોડાઓ" : "Join Party"}
            </li>
          </ul>

          <div className="tabbed-content-wrap">
            {activeTab === "karyalay" && (
              <div className="content-box active-content-box">
                <div className="pr_party_detail">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="pr_party_map">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.9727319663252!2d72.57614459999999!3d23.1711953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c29fb6cec308f%3A0xb29c955f5a3b437!2sPRAJA%20SHAKTI%20BHAVAN!5e0!3m2!1sen!2sin!4v1742984546701!5m2!1sen!2sin"
                          width="400"
                          height="300"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="pr_karyalay_info">
                        <div className="pr_karyalay_thumb">
                          <img src="/assets/img/karyalay_logo.png" alt="" />
                        </div>
                        <div className="pr_karyalay_ditail">
                          <ul>
                            <li>Praja Shakti Democratic Party</li>
                            <li>
                              <strong>{isGujarati ? "સ્થળ: " : "Location: "}</strong>
                              Adalaj Bridge, Sarkhej - Gandhinagar Hwy, Adalaj, Gujarat 382421
                            </li>
                            <li>
                              <strong>{isGujarati ? "ફોન: " : "Phone:"}</strong>
                              +91 12345 67890
                            </li>
                          </ul>
                        </div>
                      </div>
                      <hr />
                      <div className="joint_whatups_wrap">
                        <div className="whatsup_info">
                          <h4 className="title-4">
                            {isGujarati ? "અમારું WhatsApp ગ્રુપ જોડાઓ" : "Join Our WhatsApp Group"}
                          </h4>
                          <p>
                            Praja Shakti Democratic Party(Gandhinagar)
                          </p>
                        </div>
                        <div className="whatus_account">
                          <div className="scanner_box">
                            <div className="scanner_title">
                              <h4>
                                <strong>QR Code</strong> {isGujarati ? " ગ્રુપ જોડવા માટે" : " to Join Group"}
                              </h4>
                            </div>
                            <div className="scanner_img">
                              <img src="/assets/img/scanner.svg" alt="" />
                            </div>
                          </div>
                          <div className="option_text">{isGujarati ? "અથવા" : "OR"}</div>
                          <div className="jont_link">
                            <div className="wht_icon">
                              <img src="/assets/img/whatsapp-icon.svg" alt="" />
                            </div>
                            <div className="joint_link_info">
                              <p>
                                {isGujarati ? "જોડાવા માટે લિંક ક્લિક કરો" : "Click to Link for Join Group"}
                              </p>
                              <a href="#">https://wats/gjthba</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "join" && (
              <div className="content-box active-content-box">
                <iframe
                  ref={joinIframeRef}
                  src={`/join`}
                  width="100%"
                  height="500px"
                  frameBorder="0"
                  allowFullScreen
                  style={{ border: 'none', overflow: 'hidden' }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
