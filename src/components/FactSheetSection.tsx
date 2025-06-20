"use client";
import React, { useEffect, useState } from "react";
import Swiper from "swiper";
import { Navigation, Controller } from "swiper/modules";
import { usePathname } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";

interface FactSheet {
    id: string;
    slug: string;
    image_url: string;
    title: string;
    link: string;
    short_desc: string;
}

export default function FactSheetSection({ factSheets }: { factSheets: FactSheet[] }) {
    const pathname = usePathname();
    const isGujarati = pathname.includes("/gu");
    const lang = isGujarati ? "gu" : "en";

    useEffect(() => {
        const thumbs = new Swiper(".fact_sheet_thumb_slider", {
            modules: [Controller],
            slidesPerView: "auto",
            spaceBetween: 50,
            centeredSlides: true,
            loop: true,
            slideToClickedSlide: true,
        });

        const slider = new Swiper(".pov_slider_main", {
            modules: [Navigation, Controller],
            observer: true,
            observeParents: true,
            a11y: {
                enabled: true,
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "First slide",
                lastSlideMessage: "Last slide",
            },
            spaceBetween: 24,
            slidesPerView: 1,
            centeredSlides: true,
            autoHeight: true,
            keyboard: { enabled: true },
            loop: true,
            loopAdditionalSlides: 8,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            controller: { control: thumbs },
        });

        thumbs.controller.control = slider;

        return () => {
            slider.destroy();
            thumbs.destroy();
        };
    }, []);

    return (
        <section className="points_of_view_section">
            <div className="container">
                <div className="title_info">
                    <h2 className="title">{isGujarati ? "ફેક્ટ શીટ" : "Fact Sheet"}</h2>
                </div>
                <div className="fact_sheet_inner">
                    <div className="swiper fact_sheet_thumb_slider">
                        <div className="swiper-wrapper">
                            {factSheets.map((fact, index) => (
                                <div className="swiper-slide" key={fact.id}>
                                    <button
                                        onClick={() => {
                                            const mainSwiper = document.querySelector(".pov_slider_main") as HTMLElement & { swiper: Swiper };
                                            if (mainSwiper?.swiper) {
                                                mainSwiper.swiper.slideTo(index);
                                            }
                                        }}
                                    >
                                        {fact.title}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="fact_sheet_main_slider">
                <div className="swiper pov_slider_main">
                    <div className="swiper-wrapper">
                        {factSheets.map((fact) => (
                            <div className="swiper-slide" key={fact.id}>
                                <div className="fact_sheet_card">
                                    <div className="fact_card_top">
                                        <h3 className="fact_card_title">{fact.title}</h3>
                                        <p className="fact_card_dis">{fact.short_desc}</p>
                                    </div>
                                    <div className="fact_card_img">
                                        <img src={fact.image_url} alt={fact.title} />
                                    </div>
                                    <a className="white_btn text-decoration-none" href={`/${lang}/factsheet/${fact.slug}`}>
                                        <span>{isGujarati ? "વધુ જાણો" : "Know more"}</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="container">
                    <div className="fact_sheet_bottom">
                        <a href={`/${lang}/factsheet`} className="theme_btn text-decoration-none">
                            <span>{isGujarati ? "વધુ જાણો" : "Know more"}</span>
                        </a>
                        <div className="fact_sheet_navigation_btn">
                            <div className="swiper-button-next" />
                            <div className="swiper-button-prev" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
