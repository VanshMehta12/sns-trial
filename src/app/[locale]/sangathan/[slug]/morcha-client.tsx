"use client"

import Priorities from "@/components/Priorities"
import ReachUsSection from "@/components/ReachUsSection"
import { useEffect } from "react"
import Swiper from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Autoplay, Navigation, Pagination } from "swiper/modules"

interface MorchaData {
    id: string
    banner_url: string
    name: string
    title: string
    short_desc: string
    long_desc: string
    link: string
    content?: string
}

export default function MorchaClient({ morchaData }: { morchaData: MorchaData }) {
    useEffect(() => {
        const swiper = new Swiper(".morcha_slider", {
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
        })

        return () => {
            // Cleanup swiper when component unmounts
            if (swiper) {
                swiper.destroy()
            }
        }
    }, [])

    return (
        <>
            <div className="breadcrumb_section">
                <div className="swiper morcha_slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <img
                                src={morchaData.banner_url || "/assets/img/khedut_morcha_slide.png"}
                                alt={`${morchaData.title}-slide`}
                            />
                        </div>
                        <div className="swiper-slide">
                            <img
                                src={morchaData.banner_url || "/assets/img/khedut_morcha_slide.png"}
                                alt={`${morchaData.title}-slide`}
                            />
                        </div>
                        <div className="swiper-slide">
                            <img
                                src={morchaData.banner_url || "/assets/img/khedut_morcha_slide.png"}
                                alt={`${morchaData.title}-slide`}
                            />
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
                                <h2 className="title_2">{morchaData.title}</h2>
                                <p className="lrg_body">{morchaData.short_desc}</p>
                                <p className="lrg_body">{morchaData.long_desc}</p>
                                {morchaData.content && <p className="lrg_body">{morchaData.content}</p>}
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-6">
                                <div className="morcha_top_img">
                                    <img src={morchaData.banner_url || "/assets/img/shri_S._Vaghela_takes.png"} alt={morchaData.title} />
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

