"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Swiper from "swiper";
import Fancybox from "@/components/Fancybox";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

interface Motive {
  id: string;
  image_url: string;
  file_url: string;
}

export default function MotivesSection({ motives }: { motives: Motive[] }) {
  const pathname = usePathname()

  useEffect(() => {
    const prajamotive = new Swiper(".praja_motives_slider", {
      slidesPerView: 4,
      spaceBetween: 30,
      pagination: {
        el: ".praja-pagination",
        clickable: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    return () => {
      prajamotive.destroy(); // Cleanup
    };
  }, []);

  return (
    <Fancybox>
      <section className="pr_shakti_motives_section">
        <div className="container">
          <div className="title_info">
            <h2 className="title">
              {pathname.includes("/gu") ? "બાપુના વિચારો" : "Bapu Speaks"}
            </h2>
            <p className="lrg_body mt-43" id="aboutText">
              {pathname.includes("/gu")
                ? "પ્રજા શક્તિ લોકશાહી પાર્ટીનો મુખ્ય ઉદ્દેશ ગુજરાતમાં એક સાચી લોકશાહી સ્થાપિત કરવાનો છે, જ્યાં લોકોના હિતને પ્રથમ સ્થાન આપવામાં આવશે. અમારી પ્રાથમિકતા એ છે કે દરેક નાગરિકને સ્વતંત્રતા, સુરક્ષા, ન્યાય અને રોજગાર મળે."
                : "The main objective of Praja Shakti Democratic Party is to establish a true democratic system in Gujarat, where the interests of the people will be given first place. Our priority is that every citizen gets freedom, security, justice and employment."}
            </p>
          </div>

          <div className="swiper praja_motives_slider mt_65 services_carousel_active">
            <div className="swiper-wrapper">
              {motives.map((motive) => (
                <div key={motive.id} className="swiper-slide">
                  <a data-fancybox="motives-gallery" href={motive.file_url} className="popup-youtube hover_effect">
                    <img src={motive.image_url} alt={`Praja Motives ${motive.id}`} />
                  </a>
                </div>
              ))}
            </div>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </div>

          <div className="our_volunteers_btn">
            <a href="#" className="theme_btn text-decoration-none">
              <span><span>{pathname.includes("/gu") ? "વધુ જાણો" : "Know more"}</span></span>
            </a>
          </div>
        </div>
      </section>
    </Fancybox>
  );
}
