"use client"
import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import { usePathname } from "next/navigation"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface Inspiration {
  id: string
  image_url: string
  name: string
  title: string
  banner_url: string
}

export default function InspirationSection({ inspirations }: { inspirations: Inspiration[] }) {
  const [showDetail, setShowDetail] = useState(false)
  const [selectedBanner, setSelectedBanner] = useState<string | null>(null)
  const pathname = usePathname()

  const handleShowDetail = (bannerUrl: string) => {
    setSelectedBanner(bannerUrl)
    setShowDetail(true)
  }

  const handleCloseDetail = () => {
    setShowDetail(false)
    setSelectedBanner(null)
  }

  return (
    <section className="our_inspiration_section">
      <div className="container">
        <div className="pr_shakti_title_sec">
          <h2 className="title">
            {pathname.includes("/gu") ? "અમારું પ્રેરણાસ્રોત" : "Our Inspiration"}
          </h2>
          <div className="person_arrow">
            <div className="swiper-button-prev prev" />
            <div className="swiper-button-next next" />
          </div>
        </div>
      </div>

      {!showDetail ? (
        <Swiper
          slidesPerView={4}
          spaceBetween={5}
          loop={true}
          modules={[Navigation, Pagination]}
          navigation={{ nextEl: ".next", prevEl: ".prev" }}
          pagination={{ el: ".person-pagination", clickable: true }}
          className="person_slider mt-65"
          id="servicesBox"
        >
          {inspirations.map((person) => (
            <SwiperSlide key={person.id}>
              <div className="person_card">
                <div className="person_card_info">
                  <h3>{person.name}</h3>
                  <p>({person.title})</p>
                  <button onClick={() => handleShowDetail(person.banner_url)} className="view-detail-btn btn">
                    <img src="assets/img/arrow1.svg" alt="Arrow" />
                  </button>
                </div>
                <div className="person_card_img">
                  <img src={person.image_url || "/placeholder.svg"} alt={person.name} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="volunteers_detail_view" id="hiddenDiv">
          <div className="volunteers_inner_div">
            <button id="closeBtn" className="close-btn" onClick={handleCloseDetail}>
              <span>X</span>
            </button>
            {selectedBanner && <img src={selectedBanner} alt="Inspiration Banner" className="banner-image" />}
          </div>
        </div>
      )}
    </section>
  )
}
