"use client";

import Priorities from "@/components/Priorities";
import ReachUsSection from "@/components/ReachUsSection";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";


interface Image {
  media_url: string;
}

interface Sangathan {
  id: number;
  name: string;
  image_url: string;
  author: string;
  title: string;
  date: string;
  description: string;
  long_desc: string;
  short_desc: string;
  author_name: string;
  banner_url?: string; // ✅ Add banner_url as optional
  images?: Image[]; // ✅ Add images array
}

export default function SangathanDetailPage() {
  const { slug } = useParams(); // Destructure to directly access slug
  const [data, setData] = useState<Sangathan | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}HomeDetail/${slug}?type=sangthan`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result.data);
      } 
      // catch (err: any) {
      //   setError(err.message);
      // } 
      finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, [slug]); // Added dependency array to avoid unnecessary re-renders

  useEffect(() => {
    if (!data) return;

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
  }, [data]); // Initialize Swiper only when data is available

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <>
      {/* Banner / Slider Section */}
      <div className="breadcrumb_section">
        <div className="swiper khedut_morcha_slider">
          <div className="swiper-wrapper">
            {data?.images?.length ? (
              data.images.map((img: Image, index: number) => (
                <div className="swiper-slide" key={index}>
                  <img src={img.media_url} alt={`slider-${index}`} />
                </div>
              ))
            ) : (
              <div className="swiper-slide">
                <img src={data?.banner_url || "/default-banner.jpg"} alt="banner" />
              </div>
            )}
          </div>
          <div className="swiper-pagination" />
          <div className="swiper-button-prev" />
          <div className="swiper-button-next" />
        </div>
      </div>

      {/* About / Description Section */}
      <div className="about_area_section">
        <div className="container">
          <div className="society_economy_sec">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h2 className="title_2">{data?.title || "Sangathan Details"}</h2>
                <div dangerouslySetInnerHTML={{ __html: data?.long_desc || "" }} />
              </div>
              <div className="col-md-6">
                <div className="morcha_top_img">
                  <img src={data?.banner_url || "/default-image.jpg"} alt={data?.title || "Sangathan"} />
                </div>
              </div>
            </div>
          </div>

          {/* Priorities Section */}
          <div className="priorities_section">
            {/* {data?.sangthan_section?.length ? (
              data.sangthan_section.map((section: any, index: number) => (
                <div key={index} className="priority_item">
                  <h3>{section.title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: section.long_desc }} />
                </div>
              ))
            ) : (
              <Priorities />
            )} */}
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
  );
}
