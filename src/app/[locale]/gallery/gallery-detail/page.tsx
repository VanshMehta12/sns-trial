'use client';

import React from 'react';
import Fancybox from '@/components/Fancybox';  // Make sure the path is correct
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import ReachUsSection from '@/components/ReachUsSection';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function GalleryDetailPage() {

    return (
        <>
            <div className="sub_header_section" style={{ background: "url(/assets/img/video_bg.jpg)" }}>
                <div className="container">
                    <div className="page_bredcrumb_title ">
                        <h1>
                            The first executive meeting of the Praja Shakti Democratic<br />
                            Party was held today at Praja Shakti Bhavan
                        </h1>
                        <div className="page_btootm_list mt_65">
                            <p className="tag">Events</p>
                            <p className="t_date">19-02-2025</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about_area_section bg_light">
                <div className="container">
                    <div className="photo_gategory_bg mt-14">
                        <p className="lrg_body">
                            Today, the first executive meeting of the Praja Shakti Democratic
                            Party was held at Praja Shakti Bhavan under the chairmanship of former
                            Chief Minister Shri Shankarsinh Vaghela Bapu.
                        </p>
                        <p className="lrg_body">
                            During this meeting, the strategy to make the organization more
                            capable and strong was discussed keeping in mind the upcoming
                            by-elections to the Legislative Assembly as well as the upcoming local
                            self-government, municipal and municipal elections. Along with this,
                            important issues in the interest of the people were considered in
                            depth.
                        </p>
                    </div>
                    <Fancybox options={{ Carousel: { infinite: false } }}>
                        <div className='photo_gallery_grid'>
                            <div className='photo_grid_items'>
                                {[1, 4, 7].map((num, index) => (
                                    <div key={index} className="photo_gallery_grid_hover">
                                        <div key={index} className="photo_card_img">
                                            <img src={`/assets/img/gallery_detail/gallery${num}.png`} alt="Image Gallery" />
                                            <a className="gallery-link" href={`/assets/img/gallery_detail/gallery${num}.png`} data-fancybox="gallery" data-caption={`Caption Images ${num}`}>
                                                <FontAwesomeIcon className='icon' icon={faPlus} />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='photo_grid_items'>
                                {[2, 5, 8].map((num, index) => (
                                    <div key={index} className="photo_gallery_grid_hover">
                                        <div key={index} className="photo_card_img">
                                            <img src={`/assets/img/gallery_detail/gallery${num}.png`} alt="Image Gallery" />
                                            <a className="gallery-link" href={`/assets/img/gallery_detail/gallery${num}.png`} data-fancybox="gallery" data-caption={`Caption Images ${num}`}>
                                                <FontAwesomeIcon className='icon' icon={faPlus} />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='photo_grid_items'>
                                {[3, 6, 9].map((num, index) => (
                                    <div key={index} className="photo_gallery_grid_hover">
                                        <div key={index} className="photo_card_img">
                                            <img src={`/assets/img/gallery_detail/gallery${num}.png`} alt="Image Gallery" />
                                            <a className="gallery-link" href={`/assets/img/gallery_detail/gallery${num}.png`} data-fancybox="gallery" data-caption={`Caption Images ${num}`}>
                                                <FontAwesomeIcon className='icon' icon={faPlus} />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </Fancybox>
                </div>
            </div>
            <ReachUsSection />
        </>
    );
}
