'use client';

import React, { useEffect, useState } from 'react';
import Fancybox from '@/components/Fancybox';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import ReachUsSection from '@/components/ReachUsSection';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'next/navigation';


interface Image {
    media_url: string;
  }

interface GalleryDetail {
    id: number;
    name: string;
    image: string;
    author: string;
    title: string;
    date: string;
    description: string;
    image_url: string;
    images?: { media_url: string }[];  // ✅ Add this
}


export default function GalleryDetailPage() {
    const slug = useParams();

    const [galleryData, setGalleryData] = useState<GalleryDetail | null>(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;
        console.log(slug.slug)

        const fetchGalleryDetails = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}HomeDetail/${slug.slug}?type=photo-gallery`);
                if (!response.ok) {
                    throw new Error("Failed to fetch gallery details");
                }
                const data = await response.json();
                setGalleryData(data.data);
            } 
            // catch (err: any) {
            //     setError(err.message);
            // } 
            finally {
                // setLoading(false);
            }
        };

        fetchGalleryDetails();
    }, [slug]);

    // if (loading) return <p>Loading gallery details...</p>;
    // if (error) return <p>Error: {error}</p>;
    if (!galleryData) return <p>No gallery data available.</p>;

    return (
        <>
            {/* Header Section */}
            <div className="sub_header_section" style={{ background: `url(${galleryData.image_url || '/assets/img/video_bg.jpg'})` }}>
                <div className="container">
                    <div className="page_bredcrumb_title">
                        <h1>{galleryData.title}</h1>
                        <div className="page_btootm_list mt_65">
                            <p className="tag">{"Gallery"}</p>
                            <p className="t_date">{galleryData.date || ""}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="about_area_section bg_light">
                <div className="container">
                    <div className="photo_gategory_bg mt-14">
                        <div className="lrg_body" dangerouslySetInnerHTML={{ __html: galleryData.description }} />
                    </div>

                    {/* Gallery Section */}
                    <Fancybox options={{ Carousel: { infinite: false } }}>
                        <div className='photo_gallery_grid'>
                            {galleryData.images?.map((image: Image, index: number) => (
                                <div key={index} className="photo_gallery_grid_hover">
                                    <div className="photo_card_img">
                                        <img src={image.media_url} alt={`Gallery Image ${index + 1}`} />
                                        <a className="gallery-link" href={image.media_url} data-fancybox="gallery" data-caption={`Caption Image ${index + 1}`}>
                                            <FontAwesomeIcon className='icon' icon={faPlus} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Fancybox>
                </div>
            </div>

            {/* Reach Us Section */}
            <ReachUsSection />
        </>
    );
}
