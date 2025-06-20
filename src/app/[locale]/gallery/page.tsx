"use client"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Fancybox } from "@fancyapps/ui"
import "@fancyapps/ui/dist/fancybox/fancybox.css"
import ReachUsSection from "@/components/ReachUsSection"
import { usePathname } from "next/navigation"

interface IsotopeInstance {
  arrange(options: { filter?: string }): void
  destroy(): void
}

interface PhotoItem {
  id: number
  slug: string
  category_name: string
  image_url: string
  title: string
  date: string
}

export default function GalleryPage() {
  const gridRef = useRef<HTMLUListElement>(null)
  const [isotope, setIsotope] = useState<IsotopeInstance | null>(null)
  const [filterKey, setFilterKey] = useState("*")
  const [photoItems, setPhotoItems] = useState<PhotoItem[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const [Language, setLanguage] = useState("")
  const [LanguageRoute, setLanguageRoute] = useState("")

  useEffect(() => {
    const lang = localStorage.getItem("language")
    if (lang) {
      setLanguageRoute(`/${lang}/`)
    }
  }, [pathname])

  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {})
    return () => {
      Fancybox.destroy()
    }
  }, [photoItems])

  useEffect(() => {
    let isoInstance: IsotopeInstance | null = null
    if (typeof window !== "undefined" && gridRef.current && photoItems.length > 0) {
      import("isotope-layout").then((IsotopeModule) => {
        const Isotope = IsotopeModule.default
        isoInstance = new Isotope(gridRef.current!, {
          itemSelector: ".element-item",
          layoutMode: "fitRows",
        }) as IsotopeInstance
        setIsotope(isoInstance)
      })
    }
    return () => {
      if (isoInstance) {
        isoInstance.destroy()
      }
    }
  }, [photoItems])

  useEffect(() => {
    if (isotope) {
      const filterValue = filterKey === "*" ? "*" : `.${filterKey}`
      isotope.arrange({ filter: filterValue })
    }
  }, [filterKey, isotope])

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
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}HomeAll?lang=${Language}`
        )
        const data = await response.json() as { photoGallery: PhotoItem[] }

        if (Array.isArray(data.photoGallery)) {
          setPhotoItems(data.photoGallery)

          const uniqueCategories: string[] = Array.from(
            new Set(data.photoGallery.map((item) => item.category_name))
          )
          const sortedCategories = uniqueCategories.sort()
          setCategories(sortedCategories)
        } else {
          console.error("Unexpected API response format:", data)
          setPhotoItems([])
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setPhotoItems([])
      } finally {
        setIsLoading(false)
      }
    }


    fetchData()
  }, [Language])

  const handleFilterClick = (key: string) => {
    setFilterKey(key)
  }

  return (
    <>
      <div
        className="breadcrumb_section"
        style={{ background: "url(/assets/img/photo_gallery_bg.jpg)" }}
      >
        <div className="container">
          <div className="page_title">
            <h1>Photo Gallery</h1>
          </div>
        </div>
      </div>

      <div data-js="hero-demo">
        <div className="about_area_section">
          <div className="container">
            <div className="photo_gategory_bg">
              <h2 className="title_2">Photos by Category</h2>
              <div className="ui-group">
                <div className="filters button-group js-radio-button-group device-type">
                  {["*", ...categories].map((category) => (
                    <button
                      key={category}
                      className={`button ${filterKey === category ? "is-checked" : ""}`}
                      onClick={() => handleFilterClick(category)}
                    >
                      {category === "*" ? "All" : category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <ul className="grid" ref={gridRef}>
              {isLoading ? (
                <p>Loading photos...</p>
              ) : photoItems.length > 0 ? (
                photoItems.map((item) => (
                  <li
                    className={`element-item ${item.category_name}`}
                    key={item.id}
                    data-category={item.category_name}
                  >
                    <div className="gallery_card hover_img">
                      <div className="gallery_card_img">
                        <a
                          href={item.image_url || "/placeholder.svg"}
                          data-fancybox="gallery"
                          data-caption={item.title}
                        >
                          <img
                            src={item.image_url || "/placeholder.svg"}
                            alt={item.title}
                          />
                        </a>
                      </div>
                      <ul className="photo_share">
                        <li>
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                              window.location.href
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src="/assets/img/photo_gallery/photofb.png"
                              alt="Share on Facebook"
                            />
                          </a>
                        </li>
                        <li>
                          <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                              window.location.href
                            )}&text=${encodeURIComponent(item.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src="/assets/img/photo_gallery/photo_t.png"
                              alt="Tweet"
                            />
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              if (navigator.share) {
                                navigator
                                  .share({
                                    title: item.title,
                                    url: window.location.href,
                                  })
                                  .catch(console.error)
                              } else {
                                alert("Sharing is not supported in your browser")
                              }
                            }}
                          >
                            <img
                              src="/assets/img/photo_gallery/photo_share.png"
                              alt="Share"
                            />
                          </a>
                        </li>
                      </ul>
                      <Link href={`${LanguageRoute}/gallery/${item.slug}`}>
                        <div className="gallery_cad_des">
                          <h4>{item.title}</h4>
                          <span className="date">{item.date}</span>
                        </div>
                      </Link>
                    </div>
                  </li>
                ))
              ) : (
                <p>No photos available</p>
              )}
            </ul>
          </div>

          <div className="know_more_btn_wrap pt-2">
            <a href="#" className="theme_btn text-decoration-none">
              <span>Know more</span>
            </a>
          </div>
        </div>
      </div>
      <ReachUsSection />
    </>
  )
}
