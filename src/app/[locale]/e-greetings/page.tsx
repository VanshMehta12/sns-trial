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

export default function EgreetingsPage() {
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

    const normalizeClassName = (name: string) => name.replace(/\s+/g, "_")

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}greetingTemplate`
                )
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
                const data = await response.json()

                if (Array.isArray(data.data)) {
                    setPhotoItems(data.data)

                    // Extract unique, normalized categories
                    const uniqueCategories: string[] = Array.from(
                        new Set<string>(
                            data.data.map((item: PhotoItem) => String(item.category_name).trim())
                        )
                    )

                    setCategories(uniqueCategories.sort())
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
    }, [])

    const handleFilterClick = (key: string) => {
        setFilterKey(key)
    }

    return (
        <>
            <div
                className="breadcrumb_section"
                style={{
                    background: "url(/assets/img/about_the_party/about-the-party-bg.png)",
                }}
            >
                <div className="container">
                    <div className="page_title">
                        <h1>E-greetings</h1>
                    </div>
                </div>
            </div>

            <div data-js="hero-demo">
                <div className="about_area_section">
                    <div className="container">
                        <div className="photo_gategory_bg">
                            <div className="ui-group">
                                <div className="e_greetings_filters button-group js-radio-button-group device-type">
                                    <button
                                        className={`button ${filterKey === "*" ? "is-checked" : ""}`}
                                        onClick={() => handleFilterClick("*")}
                                    >
                                        All
                                    </button>
                                    {categories.map((category) => {
                                        const classKey = normalizeClassName(category)
                                        return (
                                            <button
                                                key={classKey}
                                                className={`button ${filterKey === classKey ? "is-checked" : ""}`}
                                                onClick={() => handleFilterClick(classKey)}
                                            >
                                                {category}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <ul className="grid" ref={gridRef}>
                            {isLoading ? (
                                <p>Loading greeting cards...</p>
                            ) : photoItems.length > 0 ? (
                                photoItems.map((item) => (
                                    <li className={`element-item ${item.category_name}`} key={item.id} data-category={item.category_name}>
                                        <div className="">
                                            <div className="">
                                                <Link href={`${LanguageRoute}e-greetings/${item.id}`}>
                                                        <img src={item.image_url || "/placeholder.svg"} alt={item.title} />
                                                </Link>

                                            </div>
                                            <Link href={`${LanguageRoute}e-greetings/${item.id}`}>
                                                <div className="gallery_cad_des">
                                                    <h4>{item.title}</h4>
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
                            <span>Next</span>
                        </a>
                    </div>
                </div>
            </div>
            <ReachUsSection />
        </>
    )
}
