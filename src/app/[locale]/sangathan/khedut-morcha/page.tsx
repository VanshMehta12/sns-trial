"use client"
import Priorities from '@/components/Priorities';
import ReachUsSection from '@/components/ReachUsSection';
// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect } from 'react'
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

export default function KhedutMorchaPage() {
    // useGSAP(() => {
    //     gsap.registerPlugin(ScrollTrigger);

    //     // Fade-in animation for the breadcrumb section
    //     gsap.from(".breadcrumb_section", {
    //         opacity: 0,
    //         y: -50,
    //         duration: 1,
    //         ease: "power2.out",
    //     });

    //     // Fade-in effect for about section
    //     gsap.from(".society_economy_sec", {
    //         opacity: 0,
    //         y: 50,
    //         duration: 1.2,
    //         ease: "power2.out",
    //         scrollTrigger: {
    //             trigger: ".society_economy_sec",
    //             start: "top 80%",
    //             toggleActions: "play none none none",
    //         },
    //     });

    //     // Scroll-triggered animation for the president message section
    //     gsap.from(".priorities_section", {
    //         opacity: 0,
    //         x: -100,
    //         duration: 1.2,
    //         ease: "power2.out",
    //         scrollTrigger: {
    //             trigger: ".priorities_section",
    //             start: "top 85%",
    //             toggleActions: "play none none none",
    //         },
    //     });

    //     // Button animation
    //     gsap.from(".our_volunteers_btn", {
    //         opacity: 0,
    //         scale: 0.8,
    //         duration: 1,
    //         ease: "back.out(1.7)",
    //         scrollTrigger: {
    //             trigger: ".our_volunteers_btn",
    //             start: "top 90%",
    //             toggleActions: "play none none none",
    //         },
    //     });

    // }, []);
    useEffect(() => {
        new Swiper(".khedut_morcha_slider", {
            modules: [Navigation, Pagination, Autoplay],
            spaceBetween: 30,
            centeredSlides: true,
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    }, []);

    return (
        <>
            <div className="breadcrumb_section">
                <div className="swiper khedut_morcha_slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <img src="/assets/img/khedut_morcha_slide.png" alt='khedut-morcha' />
                        </div>
                        <div className="swiper-slide">
                            <img src="/assets/img/khedut_morcha_slide.png" alt='khedut-morcha' />
                        </div>
                        <div className="swiper-slide">
                            <img src="/assets/img/khedut_morcha_slide.png" alt='khedut-morcha' />
                        </div>
                    </div>
                    <div className="swiper-pagination" />
                    <div className="swiper-button-prev" />
                    <div className="swiper-button-next" />
                </div>
            </div>
            <div className="about_area_section">
                <div className="container">
                    <div className="society_economy_sec">
                        <div className="row align-items-center">
                            <div className="col-sm-12 col-md-6 col-lg-6">
                                <h2 className="title_2">Khedut Morcha</h2>
                                <p className="lrg_body">
                                    For the last several years, the ruling parties in Gujarat have
                                    been oppressing the people through false promises and
                                    unpredictable rule. Power is being misused to suppress the voice
                                    of the people, unemployment is increasing, atrocities on women are
                                    increasing, and a huge web of corruption is being woven, while the
                                    people are constantly troubled.
                                </p>
                                <p className="lrg_body">
                                    The main objective of the Praja Shakti Democratic Party is to
                                    establish a true democratic system in Gujarat,
                                </p>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-6">
                                <div className="morcha_top_img">
                                    <img src="/assets/img/shri_S._Vaghela_takes.png" alt="img" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="priorities_section">
                        <Priorities />
                    </div>
                    <div className="know_more_btn_wrap">
                        <a href="#" className="theme_btn text-decoration-none">
                            <span>Join the party</span>
                        </a>
                    </div>
                </div>
            </div>
            <ReachUsSection />
        </>
    )
}
