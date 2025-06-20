"use client";
import React, { useEffect } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { usePathname } from "next/navigation";

interface Voice {
  id: string;
  image_url: string;
  file_url: string;
}

export default function PeopleVoiceSection({ voices }: { voices: Voice[] }) {
  const pathname = usePathname();
  const isGujarati = pathname.includes("/gu");

  Swiper.use([Autoplay]);

  useEffect(() => {
    const breakTheText = () => {
      const textElement = document.getElementById("people_text");
      if (textElement) {
        const text = textElement.textContent;
        const splittedText = text?.split("");
        const clutter = splittedText?.map((e) => `<span>${e}</span>`).join("");
        textElement.innerHTML = clutter ?? "";
      }
    };

    breakTheText();
  }, []);

  useEffect(() => {
    if (voices.length > 0) {
      const swiper = new Swiper(".peoplepowerslider", {
        slidesPerView: 7,
        spaceBetween: 15,
        freeMode: true,
        speed: 3000,
        loop: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".people-pagination",
          clickable: true,
        },
      });

      const swiperRtl = new Swiper(".peoplepowersliderrtl", {
        slidesPerView: 7,
        spaceBetween: 15,
        freeMode: true,
        speed: 3000,
        loop: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: true,
        },
        pagination: {
          el: ".people-pagination",
          clickable: true,
        },
      });

      return () => {
        swiper.destroy();
        swiperRtl.destroy();
      };
    }
  }, [voices]);

  return (
    <section className="people_power_section">
      <div className="container">
        <div className="title_info">
          <h2 className="title">
            {isGujarati
              ? "લોકશક્તિ ગુજરાતની અવાજ બનશે"
              : "Peoples power will become the voice of Gujarat"}
          </h2>
          <p className="lrg_body mt-2" id="people_text">
            {isGujarati
              ? "જુઓ કે હાલની સરકાર સત્તામાં રહીને પણ કેવી રીતે નિષ્ફળ ગઈ છે."
              : "See how the current government has failed while remaining in power."}
          </p>
        </div>
      </div>

      <div className="people_power_slider_section">
        <div className="swiper peoplepowerslider">
          <div className="swiper-wrapper">
            {voices.map((voiceItem) => (
              <div className="swiper-slide" key={`voice-${voiceItem.id}`}>
                <a className="popup-youtube hover_effect" href={voiceItem.file_url}>
                  <img src={voiceItem.image_url} alt={`Voice Thumbnail ${voiceItem.id}`} />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="swiper peoplepowersliderrtl">
          <div className="swiper-wrapper">
            {voices.map((voiceItem) => (
              <div className="swiper-slide" key={voiceItem.id}>
                <a className="popup-youtube hover_effect" href={voiceItem.file_url}>
                  <img src={voiceItem.image_url} alt={`Voice Thumbnail ${voiceItem.id}`} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="people_power_btn mt-53">
        <div className="container">
          <a href="#" className="theme_btn text-decoration-none">
            <span>{isGujarati ? "વધુ જુઓ" : "View more"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
