"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Extend global window with FB and twttr
declare global {
  interface Window {
    FB: any;
    twttr: any;
  }
}

export default function MediaSection() {
  const [activeTab, setActiveTab] = useState("social");
  const pathname = usePathname();
  const isGujarati = pathname.includes("/gu");

  // Load Facebook SDK once
  useEffect(() => {
    if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v14.0";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.onload = () => {
        if (window.FB) window.FB.XFBML.parse();
      };
      document.body.appendChild(script);
    } else if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, [activeTab]);

  // Load Twitter SDK once
  useEffect(() => {
    if (!document.querySelector("script[src*='platform.twitter.com/widgets.js']")) {
      const twitterScript = document.createElement("script");
      twitterScript.src = "https://platform.twitter.com/widgets.js";
      twitterScript.async = true;
      document.body.appendChild(twitterScript);
    } else if (window.twttr?.widgets?.load) {
      window.twttr.widgets.load();
    }
  }, [activeTab]);

  const iframeStyle = { width: "100%", height: "500px", border: "none" };

  return (
    <section className="social_media_video_section">
      <div className="container">
        <div className="title_info">
            <h2 className="title">
              {isGujarati ? "સોશિયલ મીડિયા અને વીડિયો" : "Social Media and Videos"}
            </h2>
        </div>

        <div className="social_media_btn_grid">
          <ul className="social_media_toggle">
            <li
              className={activeTab === "social" ? "social_active-tab" : ""}
              onClick={() => setActiveTab("social")}
            >
              SOCIAL
            </li>
            <li
              className={activeTab === "videos" ? "social_active-tab" : ""}
              onClick={() => setActiveTab("videos")}
            >
              VIDEOS
            </li>
          </ul>

          <div className="social_tabbed-content-wrap container">
            {activeTab === "social" && (
              <div className="social_content-box social_active-content-box">
                <div className="row justify-content-around">
                  {/* Facebook Embed */}
                  <div className="col-sm-12 col-md-4 col-lg-4">
                    <div className="pr_social_widget">
                      <div className="pr_social_icon">
                        <i className="bi bi-facebook" />
                      </div>
                      <div className="pr_social_iframe">
                        <div
                          className="fb-page"
                          data-href="https://www.facebook.com/PSDPGujarat/"
                          data-tabs="timeline"
                          data-width="380"
                          data-height="447"
                          data-small-header="false"
                          data-adapt-container-width="true"
                          data-hide-cover="false"
                          data-show-facepile="true"
                        >
                          <blockquote
                            cite="https://www.facebook.com/PSDPGujarat/"
                            className="fb-xfbml-parse-ignore"
                          >
                            <a href="https://www.facebook.com/PSDPGujarat/">
                              Praja Shakti Democratic Party
                            </a>
                          </blockquote>
                        </div>
                      </div>
                    </div>
                    <div className="follow_btn">
                      <a href="https://www.facebook.com/PSDPGujarat/" className="theme_btn text-decoration-none" target="_blank">
                        <span>Follow</span>
                      </a>
                    </div>
                  </div>

                  {/* Instagram Embed */}
                  <div className="col-sm-12 col-md-4 col-lg-4">
                    <div className="pr_social_widget">
                      <div className="pr_social_icon">
                        <i className="bi bi-instagram" />
                      </div>
                      <div className="pr_social_iframe">
                        <iframe
                          style={iframeStyle}
                          src="https://www.instagram.com/psdpgujarat/embed/"
                          title="Instagram"
                        />
                      </div>
                    </div>
                    <div className="follow_btn">
                      <a href="https://www.instagram.com/psdpgujarat" className="theme_btn text-decoration-none" target="_blank">
                        <span>Follow</span>
                      </a>
                    </div>
                  </div>

                  {/* Twitter (X) Embed */}
                  {/* <div className="col-sm-12 col-md-4 col-lg-4">
                    <div className="pr_social_widget">
                      <div className="pr_social_icon">
                        <img src="assets/img/x-social.svg" alt="X" />
                      </div>
                      <div className="pr_social_iframe">
                        <a
                          className="twitter-timeline"
                          href="https://twitter.com/PSDPGujarat?ref_src=twsrc%5Etfw"
                          data-width="380"
                          data-height="447"
                        >
                          Tweets by PSDPGujarat
                        </a>
                      </div>
                    </div>
                    <div className="follow_btn">
                      <a href="https://twitter.com/PSDPGujarat" className="theme_btn text-decoration-none" target="_blank">
                        <span>Follow</span>
                      </a>
                    </div>
                  </div> */}
                </div>
              </div>
            )}

            {/* Videos Grid */}
            {activeTab === "videos" && (
              <div className="social_content-box social_active-content-box">
                <div className="social_videos_grid">
                  {["banner_1.jpg", "banner_2.jpg", "banner_3.jpg", "banner_4.jpg"].map((img, index) => (
                    <div className="social_video_items" key={index}>
                      <a
                        className="popup-youtube hover_effect"
                        href="https://www.youtube.com/embed/0O2aH4XLbto?si=65RHrq01PUC8YP69"
                      >
                        <img src={`assets/img/${img}`} alt={`Video ${index + 1}`} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
