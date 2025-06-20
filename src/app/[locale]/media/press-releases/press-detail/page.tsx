"use client"
import ReachUsSection from '@/components/ReachUsSection';
import React, { useEffect, useState } from 'react'

export default function PressDetailPage() {
    const [activeTab, setActiveTab] = useState("Facebook");

    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse();
        } else {
            const script = document.createElement("script");
            script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v14.0";
            script.async = true;
            script.defer = true;
            script.crossOrigin = "anonymous";
            script.onload = () => {
                if (window.FB) {
                    window.FB.XFBML.parse();
                }
            };
            document.body.appendChild(script);
        }
    });

    // Load Twitter Widgets
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
    });


    const handleTabClick = (tab: React.SetStateAction<string>) => {
        setActiveTab(tab);
    };
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
                            <p className="pd_date">19-02-2025</p>
                            <ul className="follow_grid">
                                <li>
                                    <a href="#">
                                        <img src="/assets/img/f_share.svg" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <img src="/assets/img/x_share.svg" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <img src="/assets/img/s_share.svg" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <h2 className="title_2">
                            Praja Shakti Democratic Party’s state office in Gandhinagar’s Adalaj
                        </h2>
                        <h6 className='mt-4 ms-1'>
                            By <span className='pd-title'>Shankar singh Vaghela</span>
                        </h6>
                    </div>
                    <div className="press_content p-5">
                        <div className="row">
                            <div className="col-sm-12 col-md-8 col-lg-8">
                                <div className="pres_post_content">
                                    <p className="lrg_body">
                                        Praja Shakti Democratic Party is a strong and pro-people
                                        political party working for the rights and interests of the
                                        citizens of Gujarat. Under the leadership of Shri Shankarsinh
                                        Vaghela “Bapu”, this party is committed to bringing good,
                                        transparent and fair governance for the people of Gujarat
                                        through true democratic governance and pro-people policies.
                                    </p>
                                    <p className="lrg_body">
                                        In Gujarat, abuse of governance, corruption, exploitation of the
                                        poor and middle class, and political support to bootleggers are
                                        seen. The voice of the people is suppressed by misusing the
                                        system, the youth are unemployed, farmers do not get equal value
                                        despite their hard work, women are insecure, and small
                                        industries are suppressed by giving benefits to big industries
                                    </p>
                                    <div className="press_post_img">
                                        <img src="/assets/img/press_post.png" alt="img" />
                                    </div>
                                    <p className="lrg_body">
                                        3). Free and effective health service – Every citizen should get
                                        modern health facilities free of cost or at a low cost, so that
                                        no one has to go without treatment due to lack of money.
                                    </p>
                                    <div className="press_post_img">
                                        <img src="/assets/img/praja-shakti-party.png" alt="img" />
                                    </div>
                                    <p className="lrg_body">
                                        4). Justice and assistance for farmers – To waive the debts of
                                        farmers, ensure fair prices and introduce modern farming methods
                                        so that farmers become economically strong.
                                    </p>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4 col-lg-4">
                                <div className="side_bar_sec">
                                    <div className="side_bar_title">
                                        <h3>Social Media Updates</h3>
                                    </div>
                                    <div className="side_bar_tab">
                                        <ul className="sidebar_toggle-tabs">
                                            <li
                                                className={activeTab === "Facebook" ? "sidebar_active-tab" : ""}
                                                onClick={() => handleTabClick("Facebook")}
                                            >
                                                Facebook
                                            </li>
                                            <li
                                                className={activeTab === "Instagram" ? "sidebar_active-tab" : ""}
                                                onClick={() => handleTabClick("Instagram")}
                                            >
                                                Instagram
                                            </li>
                                            <li
                                                className={activeTab === "Twitter" ? "sidebar_active-tab" : ""}
                                                onClick={() => handleTabClick("Twitter")}
                                            >
                                                Twitter (X)
                                            </li>
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
                                            {activeTab === "Twitter" && (
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
                                            )}
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
    )
}
