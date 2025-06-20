"use client"

import { useEffect, useState, useRef } from "react"
import Isotope from "isotope-layout"
import { Fancybox } from "@fancyapps/ui"
import "@fancyapps/ui/dist/fancybox/fancybox.css"
import ReachUsSection from "@/components/ReachUsSection"
import { usePathname } from "next/navigation"

interface VideoItem {
  id: number
  category_name: string
  video: string
  video_type: string
  file_url: string
  image_url: string
  title: string
}

export default function VideoGalleryPage() {
  const gridRef = useRef<HTMLUListElement>(null)
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [filterKey, setFilterKey] = useState("*")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isotope, setIsotope] = useState<Isotope | null>(null)
  const pathname = usePathname()
  const [Language, setLanguage] = useState("")

  const LanguagePicker = () => {
    if (pathname.includes("/gu")) {
      setLanguage("guj")
    } else if (pathname.includes("/en")) {
      setLanguage("eng")
    } else {
      setLanguage("eng")
    }
  }

  useEffect(() => {
    LanguagePicker()
  }, [pathname])

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}HomeAll?lang=${Language}`
        )
        if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`)
        const data = await res.json()

        const videoGallery: VideoItem[] = data.videoGallery || []
        setVideos(videoGallery)

        // Extract and normalize category names
        const uniqueCategories = Array.from(
          new Set(videoGallery.map((item) => item.category_name.trim()))
        ).sort()

        setCategories(uniqueCategories)
        setError(null)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Failed to load videos. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [Language])

  useEffect(() => {
    if (gridRef.current && videos.length > 0) {
      const iso = new Isotope(gridRef.current, {
        itemSelector: ".element-item",
        layoutMode: "fitRows",
      })
      setIsotope(iso)
    }
    return () => isotope?.destroy()
  }, [videos])

  useEffect(() => {
    if (isotope) {
      const filterValue = filterKey === "*" ? "*" : `.${filterKey}`
      isotope.arrange({ filter: filterValue })
    }
  }, [filterKey, isotope])

  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {
      Thumbs: false,
      Toolbar: false,
    })
    return () => Fancybox.destroy()
  }, [videos])

  const handleFilterClick = (key: string) => {
    setFilterKey(key)
  }

  const normalizeClassName = (str: string) => str.replace(/\s+/g, "_")

  return (
    <>
      <div className="sub_header_section" style={{ background: "url(/assets/img/video_bg.jpg)" }}>
        <div className="container">
          <div className="page_bredcrumb_title h_2">
            <h1>
              The first executive meeting of the Praja Shakti Democratic
              <br /> Party was held today at Praja Shakti Bhavan
            </h1>
            <div className="page_btootm_list">
              <p className="t_date">19-02-2025</p>
            </div>
          </div>
        </div>
      </div>

      <div className="about_area_section">
        <div className="container">
          <div className="photo_gategory_bg">
            <h2 className="title_2">Videos by Category</h2>
            <div className="ui-group">
              <div className="filters button-group js-radio-button-group device-type">
                <button
                  className={`button ${filterKey === "*" ? "active" : ""}`}
                  onClick={() => handleFilterClick("*")}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`button ${
                      filterKey === normalizeClassName(category) ? "active" : ""
                    }`}
                    onClick={() => handleFilterClick(normalizeClassName(category))}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading && <div className="text-center py-5">Loading...</div>}
          {error && <div className="alert alert-danger mt-3">{error}</div>}

          <ul className="grid" ref={gridRef}>
            {videos.map((item) => (
              <li
                key={item.id}
                className={`element-item ${normalizeClassName(item.category_name)}`}
                data-category={item.category_name}
              >
                <div className="video_card hover_img">
                  <div className="video_card_img">
                    <img src={item.image_url} alt={item.video} />
                  </div>
                  <a data-fancybox href={item.file_url} className="hover_effect">
                    <div className="video_cad_des">
                      <div className="video_icon">
                        <img src="/assets/img/yout_icn.svg" alt="Play Video" />
                      </div>
                      <div className="video_des">
                        <h4>{item.title}</h4>
                        <p className="v_time">20.02</p>
                      </div>
                    </div>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ReachUsSection />
    </>
  )
}
