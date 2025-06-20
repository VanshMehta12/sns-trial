"use client";
import ReachUsSection from "@/components/ReachUsSection";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface PressDetail {
  id: number;
  name: string;
  image_url: string;
  author: string;
  title: string;
  date: string;
  description: string;
  long_desc: string;
  short_desc: string;
  author_name: string;
}

export default function PressDetailPage() {
  const { slug } = useParams();
  const [pressDetails, setPressDetails] = useState<PressDetail | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Facebook");

  useEffect(() => {
    if (slug) {
      const fetchPressDetails = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}HomeDetail/${slug}?type=press-releases`
          );
          if (!response.ok) throw new Error("Failed to fetch event details");

          const msg = await response.json();
          const dt = msg.data;

          setPressDetails(dt);
          console.log("Fetched press details:", dt);
        } 
        // catch (err) {
        //   setError(
        //     err instanceof Error ? err.message : "An unknown error occurred"
        //   );
        // } 
        finally {
        //   setLoading(false);
        }
      };

      fetchPressDetails();
    }
  }, [slug]);

  // Load Facebook SDK only once
  useEffect(() => {
    if (!window.FB) {
      const script = document.createElement("script");
      script.src =
        "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v14.0";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.onload = () => window.FB?.XFBML.parse();
      document.body.appendChild(script);
    } else {
      window.FB.XFBML.parse();
    }
  });

  // Load Twitter Widgets only once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);
  });

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // if (loading) return <p>Loading event details...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div
        className="breadcrumb_section"
        style={{ background: "url(/assets/img/press_detail_bg.jpg)" }}
      ></div>
      <div className="about_area_section bg_light">
        <div className="container">
          <div className="photo_gategory_bg border-bottom border-3 shadow">
            <div className="page_btootm_list">
              <p className="pd_date">
                {pressDetails?.date || "Date not available"}
              </p>
            </div>
            <h2 className="title_2">{pressDetails?.title || "Press Title"}</h2>
            <h6 className="mt-4 ms-1">
              By{" "}
              <span className="pd-title">
                {pressDetails?.author_name || "Unknown"}
              </span>
            </h6>
          </div>
          <div className="press_content p-5">
            <div className="row">
              <div className="col-md-8">
                <div className="pres_post_content">
                  <p className="lrg_body">
                    {pressDetails?.short_desc || "No description available."}
                  </p>
                  <p
                    className="lrg_body"
                    dangerouslySetInnerHTML={{
                      __html:
                        pressDetails?.long_desc || "No description available.",
                    }}
                  />
                  {pressDetails?.image_url && (
                    <div className="press_post_img">
                      <img src={pressDetails.image_url} alt="Event Image" />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="side_bar_sec">
                  <div className="side_bar_title">
                    <h3>Social Media Updates</h3>
                  </div>
                  <div className="side_bar_tab">
                    <ul className="sidebar_toggle-tabs">
                      {["Facebook", "Instagram"].map((tab) => (
                        <li
                          key={tab}
                          className={
                            activeTab === tab ? "sidebar_active-tab" : ""
                          }
                          onClick={() => handleTabClick(tab)}
                        >
                          {tab}
                        </li>
                      ))}
                    </ul>
                    <div className="sidebar_tabbed-content-wrap">
                      {activeTab === "Facebook" && (
                        <div className="sidebar_content-box sidebar_active-content-box">
                          <div id="fb-root" />
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
                      )}
                      {activeTab === "Instagram" && (
                        <div className="sidebar_content-box sidebar_active-content-box">
                          <iframe
                            style={{ width: "100%", height: "440px" }}
                            src="https://www.instagram.com/psdpgujarat/embed/"
                            title="Instagram Embed"
                          />
                        </div>
                      )}
                      {/* {activeTab === "Twitter" && (
                        <div className="sidebar_content-box sidebar_active-content-box">
                          <a
                            className="twitter-timeline"
                            href="https://twitter.com/PSDPGujarat?ref_src=twsrc%5Etfw"
                            data-width="380"
                            data-height="447"
                          >
                            Tweets by PSDPGujarat
                          </a>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
                <div className="side_bar_sec">
                  <div className="side_bar_title">
                    <h3>Youtube Updates</h3>
                  </div>
                  <div className="sidebar_body">YOU TUBE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReachUsSection />
    </>
  );
}
