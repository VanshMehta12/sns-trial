"use client"
import ReachUsSection from '@/components/ReachUsSection';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';


interface FactSheet {
    id: number;
    name: string;
    image: string;
    author: string;
    title: string;
    date: string;
    description: string;
  }

export default function FactsheetDetailPage() {
    const { slug } = useParams();
    const [factSheet, setfactSheet] = useState<FactSheet| null>(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("Facebook");

    useEffect(() => {
        if (slug) {
            const fetchfactSheet = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}HomeDetail/${slug}?type=fact-sheet`);
                    if (!response.ok) throw new Error("Failed to fetch factsheet details");
                    const data = await response.json();
                    setfactSheet(data.data);
                } 
                // catch (err: any) {
                //     // setError(err.message);
                // } 
                finally {
                    // setLoading(false);
                }
            };
            fetchfactSheet();
        }
    }, [slug]);

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

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
    });

    const handleTabClick = (tab: React.SetStateAction<string>) => {
        setActiveTab(tab);
    };

    // if (loading) return <p>Loading factsheet details...</p>;
    // if (error) return <p>Error: {error}</p>;

    return (
        <>
            <div className="breadcrumb_section" style={{ background: "url(/assets/img/press_detail_bg.jpg)" }}></div>
            <div className="about_area_section bg_light">
                <div className="container">
                    <div className="photo_gategory_bg border-bottom border-3 shadow">
                        <div className="page_btootm_list">
                            <p className="pd_date">{factSheet?.date || "Date not available"}</p>
                        </div>
                        <h2 className="title_2">{factSheet?.title || "Factsheet Title"}</h2>
                        <h6 className='mt-4 ms-1'>
                            By <span className='pd-title'>{factSheet?.author || "Unknown"}</span>
                        </h6>
                    </div>
                    <div className="press_content p-5">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="pres_post_content">
                                    <p className="lrg_body" dangerouslySetInnerHTML={{ __html: factSheet?.description || "No description available." }} />
                                    {factSheet?.image && (
                                        <div className="press_post_img">
                                            <img src={factSheet.image} alt="Factsheet Image" />
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
                                            {["Facebook", "Instagram", "Twitter"].map((tab) => (
                                                <li key={tab} className={activeTab === tab ? "sidebar_active-tab" : ""} onClick={() => handleTabClick(tab)}>
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
                                                        <blockquote cite="https://www.facebook.com/PSDPGujarat/" className="fb-xfbml-parse-ignore">
                                                            <a href="https://www.facebook.com/PSDPGujarat/">Praja Shakti Democratic Party</a>
                                                        </blockquote>
                                                    </div>
                                                </div>
                                            )}
                                            {activeTab === "Instagram" && (
                                                <div className="sidebar_content-box sidebar_active-content-box">
                                                    <iframe style={{ width: "100%", height: "440px" }} src="https://www.instagram.com/psdpgujarat/embed/" title="Instagram Embed" />
                                                </div>
                                            )}
                                            {activeTab === "Twitter" && (
                                                <div className="sidebar_content-box sidebar_active-content-box">
                                                    <a className="twitter-timeline" href="https://twitter.com/PSDPGujarat?ref_src=twsrc%5Etfw" data-width="380" data-height="447">
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
    );
}
