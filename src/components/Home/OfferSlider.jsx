'use client'
import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from "next/image";
import { placeholderImage, useIsRtl } from "@/utils";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import Link from "next/link";
import { Autoplay, Navigation } from "swiper/modules";
import { userSignUpData } from "@/redux/reuducer/authSlice";
import { useSelector } from "react-redux";

const OfferSlider = ({ sliderData }) => {
    const swiperRef = useRef();
    const isRtl = useIsRtl();
    const userData = useSelector(userSignUpData);

    useEffect(() => {
        if (swiperRef && swiperRef?.current) {
            swiperRef?.current?.changeLanguageDirection(isRtl ? 'rtl' : 'ltr');
        }
    }, [isRtl]);


    const swipePrev = () => {
        if (swiperRef?.current) {
            swiperRef.current.slidePrev();
        }
    };

    const swipeNext = () => {
        if (swiperRef?.current) {
            swiperRef.current.slideNext();
        }
    };

    const breakpoints = {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 1.2,
        },
        1400: {
            slidesPerView: 1.5,
        }
    };

    return (
        <div className="offer_slider pop_categ_mrg_btm my-0">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {
                            sliderData && sliderData.filter((ele) => ele.type === "slider").length > 0 && (
                                <div className="offer_slider_swiper">
                                    <Swiper
                                        centeredSlides={true}
                                        onSwiper={(swiper) => {
                                            swiperRef.current = swiper;
                                        }}
                                        dir={isRtl ? "rtl" : "ltr"}
                                        spaceBetween={20}
                                        slidesPerView={1}
                                        modules={[Navigation, Autoplay]}
                                        breakpoints={breakpoints}
                                        autoplay={{
                                            delay: 3000,
                                            disableOnInteraction: false,
                                            stopOnLastSlide: false
                                        }}
                                        slideToClickedSlide={true}
                                    >
                                        {sliderData
                                            .filter((ele) => ele.type === "slider")
                                            .map((ele, index) => {
                                                let href;
                                                if (ele?.model_type === 'App\\Models\\Item') {
                                                    if (userData && userData?.id === ele?.model?.user_id) {
                                                        href = `/my-listing/${ele?.model?.slug}`;
                                                    } else {
                                                        // Otherwise, link to the product details page
                                                        href = `/product-details/${ele?.model?.slug}`;
                                                    }
                                                } else if (ele?.model_type === null) {
                                                    href = ele?.third_party_link;
                                                } else if (ele?.model_type === 'App\\Models\\Category') {
                                                    href = `/category/${ele.model.slug}`;
                                                } else {
                                                    href = '/';
                                                }
                                                return (
                                                    <SwiperSlide key={index}>
                                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                                                            <Link href={href} target={ele?.model_type === null ? "_blank" : ""}>
                                                                {ele.type === "slider" && (
                                                                    <Image
                                                                        src={ele.image}
                                                                        width={1200}
                                                                        height={500}
                                                                        alt={ele.id || "offer image"}
                                                                        onError={placeholderImage}
                                                                        className="offer_slider_img"
                                                                    />
                                                                )}
                                                            </Link>
                                                        </div>
                                                    </SwiperSlide>

                                                )
                                            })}
                                    </Swiper>
                                    {sliderData.filter((ele) => ele.type === "slider").length > 1 && (
                                        <>
                                            <button className="pop_cat_btns pop_cat_left_btn" onClick={swipePrev}>
                                                <RiArrowLeftLine size={24} color="white" />
                                            </button>
                                            <button className="pop_cat_btns pop_cat_right_btn" onClick={swipeNext}>
                                                <RiArrowRightLine size={24} color="white" />
                                            </button>
                                        </>
                                    )}

                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OfferSlider;