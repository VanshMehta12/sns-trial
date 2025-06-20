"use client";

import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation';

interface PageSection {
    id: number;
    title: string;
    long_desc: string;
    image_position: string | null;
    images: {
        media_url: string;
    }[];
}

interface PageData {
    title: string;
    banner_url: string;
    page_section: PageSection[];
}

export default function AboutParty() {
    const params = useParams();
    const slug = params?.slug ?? 'default-slug';

    const [data, setData] = useState<PageData | null>(null);
    const [loading, setLoading] = useState(true);
    const API_URL = `${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}pageDetail/${slug}?lang=eng`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(API_URL);
                if (!res.ok) throw new Error(`API error: ${res.status}`);
                const json = await res.json();
                setData(json.data);
            } catch (err) {
                console.error("Failed to fetch:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [API_URL]);

    if (loading) return <div className="container py-5 text-center">Loading...</div>;
    if (!data) return <div className="container py-5 text-center">No data available.</div>;

    return (
        <>
            {/* Banner Section */}
            <div
                className="breadcrumb_section"
                style={{
                    backgroundImage: `url('${data.banner_url}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="container">
                    <div className="page_title">
                        <h1>{data.title}</h1>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="about_area_section py-5">
                <div className="container">
                    {data.page_section.map((section) => {
                        const hasImage = section.images?.[0]?.media_url;
                        const isLeft = section.image_position === "left";
                        const isRight = section.image_position === "right";
                        const hasSideImage = isLeft || isRight;

                        return (
                            <div
                                key={section.id}
                                className={`section mb-5 ${hasSideImage ? "row align-items-center" : ""}`}
                            >
                                {isLeft && hasImage && (
                                    <div className="col-md-6 mb-3 mb-md-0">
                                        <img
                                            src={section.images[0].media_url}
                                            alt={section.title}
                                            className="img-fluid rounded"
                                        />
                                    </div>
                                )}

                                <div className={hasSideImage ? "col-md-6" : ""}>
                                    <h2 className="title_2">{section.title}</h2>
                                    <div
                                        className="lrg_body"
                                        dangerouslySetInnerHTML={{ __html: section.long_desc }}
                                    />
                                </div>

                                {isRight && hasImage && (
                                    <div className="col-md-6 mt-3 mt-md-0">
                                        <img
                                            src={section.images[0].media_url}
                                            alt={section.title}
                                            className="img-fluid rounded"
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* CTA Button */}
                    <div className="our_volunteers_btn text-center mt-4">
                        <a href="#" className="theme_btn text-decoration-none">
                            <span>Know more</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
