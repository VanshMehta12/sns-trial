"use client"
import { useRef, useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import Image from "next/image"
import { placeholderImage, useIsRtl } from "@/utils"
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri"
import Link from "next/link"
import { Autoplay, Navigation } from "swiper/modules"
import { userSignUpData } from "@/redux/reuducer/authSlice"
import { useSelector } from "react-redux"
import { settingsData } from "@/redux/reuducer/settingSlice"
import { getKilometerRange } from "@/redux/reuducer/locationSlice.js"
import NoData from "../NoDataFound/NoDataFound"
import React from "react"

const OfferSlider = ({ sliderData, cityData }) => {
    const swiperRef = useRef()
    const isRtl = useIsRtl()
    const userData = useSelector(userSignUpData)

    const KmRange = useSelector(getKilometerRange)
    const systemSettingsData = useSelector(settingsData)
    const settings = systemSettingsData?.data
    const isDemoMode = settings?.demo_mode

    console.log("Initial props:", { cityData, sliderData, isDemoMode, KmRange })

    const [filteredSliderData, setFilteredSliderData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // Filter based on location data
    useEffect(() => {
        if (!sliderData) {
            setFilteredSliderData([])
            setIsLoading(false)
            return
        }

        setIsLoading(true)

        // Use a timeout to prevent UI blocking during filtering
        const filterTimeout = setTimeout(() => {
            try {
                let filtered = sliderData

                // Only apply filtering if not in demo mode and we have location data
                if (!isDemoMode && sliderData.length > 0 && cityData) {
                    if (cityData.city || cityData.state || cityData.country) {
                        filtered = sliderData.filter((item) => {
                            // City match
                            if (cityData.city && item.city && item.city === cityData.city) {
                                return true
                            }

                            // State match
                            if (
                                cityData.state &&
                                ((item.state && item.state === cityData.state) ||
                                    (item.state_id && item.state_id.toString() === cityData.state))
                            ) {
                                return true
                            }

                            // Country match
                            if (cityData.country && item.country && item.country === cityData.country) {
                                return true
                            }

                            return false
                        })
                    }
                }

                setFilteredSliderData(filtered)
            } catch (error) {
                console.error("Error during filtering:", error)
                setFilteredSliderData(sliderData || [])
            } finally {
                setIsLoading(false)
            }
        }, 0)

        // Cleanup timeout on component unmount or dependency change
        return () => clearTimeout(filterTimeout)
    }, [cityData, KmRange, sliderData, isDemoMode])

    // Log whenever filteredSliderData changes
    useEffect(() => {
        console.log("filteredSliderData updated:", filteredSliderData.length)
    }, [filteredSliderData])

    useEffect(() => {
        if (swiperRef && swiperRef?.current) {
            swiperRef?.current?.changeLanguageDirection(isRtl ? "rtl" : "ltr")
        }
    }, [isRtl])

    const swipePrev = () => {
        if (swiperRef?.current) {
            swiperRef.current.slidePrev()
        }
    }

    const swipeNext = () => {
        if (swiperRef?.current) {
            swiperRef.current.slideNext()
        }
    }

    const breakpoints = {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 1.2,
        },
        1400: {
            slidesPerView: 1.5,
        },
    }

    const getItemHref = (ele) => {
        if (!ele) return "/"

        try {
            if (ele.model_type === "App\\Models\\Item" && ele.model?.slug) {
                if (userData && userData?.id === ele?.model?.user_id) {
                    return `/my-listing/${ele.model.slug}`
                } else {
                    return `/product-details/${ele.model.slug}`
                }
            } else if (ele.model_type === null && ele.third_party_link) {
                return ele.third_party_link
            } else if (ele.model_type === "App\\Models\\Category" && ele.model?.slug) {
                return `/category/${ele.model.slug}`
            }
        } catch (error) {
            console.error("Error generating href:", error)
        }

        return "/"
    }

    const sliderItems = React.useMemo(() => {
        return sliderData ? sliderData.filter((ele) => ele.type === "slider" && ele.event_id === null) : []
    }, [sliderData])

    return (
        <div>
            {isLoading ? (
                <div className="loader servicesSectionLoader"></div>
            ) : filteredSliderData && filteredSliderData.length > 0 ? (
                <div className="offer_slider pop_categ_mrg_btm my-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                {sliderData &&
                                    sliderData.filter((ele) => ele.type === "slider" && ele.event_id === null).length > 0 && (
                                        <div className="offer_slider_swiper">
                                            <Swiper
                                                centeredSlides={true}
                                                onSwiper={(swiper) => {
                                                    swiperRef.current = swiper
                                                }}
                                                dir={isRtl ? "rtl" : "ltr"}
                                                spaceBetween={20}
                                                slidesPerView={1}
                                                modules={[Navigation, Autoplay]}
                                                breakpoints={breakpoints}
                                                autoplay={{
                                                    delay: 3000,
                                                    disableOnInteraction: false,
                                                    stopOnLastSlide: false,
                                                }}
                                                slideToClickedSlide={true}
                                            >
                                                {sliderItems.map((ele, index) => {
                                                    const href = getItemHref(ele)
                                                    return (
                                                        <SwiperSlide key={index}>
                                                            <div
                                                                style={{
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    width: "100%",
                                                                }}
                                                            >
                                                                <Link href={href || "/"} target={ele?.model_type === null ? "_blank" : ""}>
                                                                    {ele.type === "slider" && ele.event_id === null && (
                                                                        <Image
                                                                            src={ele.image || "/placeholder.svg"}
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
                                            {sliderData.filter((ele) => ele.type === "slider" && ele.event_id === null).length > 1 && (
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
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <NoData name={"Banner"} />
            )}
        </div>
    )
}

export default OfferSlider
