"use client";
import React, { useEffect } from "react";
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface BannerImage {
  id: string;
  name: string;
  file_url: string;
}

export default function HeroSlider({ bannerImages }: { bannerImages: BannerImage[] }) {
  useEffect(() => {
    // Initialize Swiper only if images are available
    if (bannerImages.length > 0) {
      new Swiper(".bannerSlider", {
        modules: [Autoplay, Navigation, Pagination],
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }
  }, [bannerImages]);

  return (
    <section className="hero_banner">
      <div className="swiper bannerSlider">
        <div className="swiper-wrapper">
          {bannerImages.map((image) => (
            <div key={image.id} className="swiper-slide hero_banner_img">
              <img src={image.file_url} alt={image.name} />
            </div>
          ))}
        </div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-pagination"></div>
      </div>
    </section>
  );
}
