"use client"
import ReachUsSection from "@/components/ReachUsSection"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type React from "react"
import { useEffect, useState } from "react"

interface PressRelease {
    id: number
    imageUrl: string
    title: string
    date: string
    link: string
}

interface ApiResponse {
    factSheet?: {
        id: number
        title: string
        image_url: string
        date: string
        slug: string
    }[]
    // Add other properties from the API as needed
}

export default function EventPage() {
    const [activeTab, setActiveTab] = useState("Facebook")
    const [pressReleases, setPressReleases] = useState<PressRelease[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const pathname = usePathname(); // Get current path
    const [Language, setLanguage] = useState("")
    const [LanguageRoute, setLanguageRoute] = useState("")

    useEffect(() => {
        const lang = localStorage.getItem("language");
        if (lang) {
            setLanguageRoute(`/${lang}/`);
        }
    }, [pathname])

    const LanguagePicker = () => {
        if (pathname.includes("/gu")) {
            setLanguage("guj")
        } else if (pathname.includes("/en")) {
            setLanguage("eng")
        } else {
            // Default to English if no language is specified
            setLanguage("eng")
        }
    }
    useEffect(() => {
        LanguagePicker()
    }, [pathname])

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}HomeAll?lang=${Language}`)

                if (!response.ok) {
                    throw new Error("Failed to fetch data")
                }

                const data: ApiResponse = await response.json()

                // Transform API data to match our component's expected format
                if (data.factSheet && Array.isArray(data.factSheet)) {
                    const formattedEvents = data.factSheet.map((factSheet) => ({
                        id: factSheet.id,
                        imageUrl: factSheet.image_url || "/assets/img/press_img.png", // Fallback image
                        title: factSheet.title,
                        date: factSheet.date,
                        link: `${LanguageRoute}factsheet/${factSheet.slug}`,
                    }))

                    setPressReleases(formattedEvents)
                } else {
                    // Fallback to empty array if no events
                    setPressReleases([])
                }
            } catch (err) {
                console.error("Error fetching data:", err)
                setError("Failed to load events. Please try again later.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    // Load Facebook SDK
    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse()
        } else {
            const script = document.createElement("script")
            script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v14.0"
            script.async = true
            script.defer = true
            script.crossOrigin = "anonymous"
            script.onload = () => {
                if (window.FB) {
                    window.FB.XFBML.parse()
                }
            }
            document.body.appendChild(script)
        }
    }, [activeTab])

    // Load Twitter Widgets
    useEffect(() => {
        if (activeTab === "Twitter") {
            const script = document.createElement("script")
            script.src = "https://platform.twitter.com/widgets.js"
            script.async = true
            document.body.appendChild(script)

            return () => {
                // Clean up script when component unmounts or tab changes
                document.body.removeChild(script)
            }
        }
    }, [activeTab])

    const handleTabClick = (tab: React.SetStateAction<string>) => {
        setActiveTab(tab)
    }

    return (
        <>
            <div className="breadcrumb_section" style={{ background: "url(/assets/img/press_bg.jpg)" }}>
                <div className="container">
                    <div className="page_bredcrumb_title">
                        <h1 className="text-center">FactSheet</h1>
                        <div className="page_btootm_list mt-65">
                            <div className="pres_relese_info">
                                <ul>
                                    <li>
                                        <p className="tag">Praja Shakti</p>
                                    </li>
                                    <li>
                                        <p className="t_date">19-02-2025</p>
                                    </li>
                                    <li>
                                        <a href="#" className="text-decoration-none">
                                            Read more &gt;&gt;
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <ul className="follow_grid">
                                <li>
                                    <a href="#">
                                        <img src="/assets/img/f_share.svg" alt="Share on Facebook" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <img src="/assets/img/x_share.svg" alt="Share on X" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <img src="/assets/img/s_share.svg" alt="Share on Social" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="press_section bg_light">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-8 col-lg-8">
                            {isLoading ? (
                                <div className="text-center p-5">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : error ? (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            ) : pressReleases.length === 0 ? (
                                <div className="alert alert-info" role="alert">
                                    No factSheets found.
                                </div>
                            ) : (
                                <div className="press_grid">
                                    {pressReleases.map((item) => (
                                        <div className="press_grid_items" key={item.id}>
                                            <div className="pres_grid_img">
                                                <img src={item.imageUrl || "/placeholder.svg"} alt={item.title} />
                                            </div>
                                            <ul className="photo_share">
                                                <li>
                                                    <a href="#">
                                                        <img src="/assets/img/photo_gallery/photofb.png" alt="Share on Facebook" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <img src="/assets/img/photo_gallery/photo_t.png" alt="Tweet" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <img src="/assets/img/photo_gallery/photo_share.png" alt="Share" />
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="pres_grid_des">
                                                <a href={item.link}>
                                                    <div className="press_icon">
                                                        <img src="/assets/img/press-delivery-icon.svg" alt="Press Icon" />
                                                    </div>
                                                </a>
                                                <div className="press_con">
                                                    <Link className="text-decoration-none" href={item.link}>
                                                        <h4>{item.title}</h4>
                                                    </Link>
                                                    <div className="schedule_con">
                                                        <Link className="text-decoration-none" href={item.link}>
                                                            <span>{item.date}</span>
                                                        </Link>
                                                        <Link href={item.link} className="read_more text-decoration-none">
                                                            Read more &gt;&gt;
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-4">
                            <div className="side_bar_sec">
                                <div className="side_bar_title">
                                    <h3>Social Media Updates</h3>
                                </div>
                                <div className="side_bar_tab">
                                    <ul className="sidebar_toggle-tabs">
                                        <li
                                            className={activeTab === "Facebook" ? "sidebar_active-tab" : ""}
                                            onClick={() => handleTabClick("Facebook")}
                                        >
                                            Facebook
                                        </li>
                                        <li
                                            className={activeTab === "Instagram" ? "sidebar_active-tab" : ""}
                                            onClick={() => handleTabClick("Instagram")}
                                        >
                                            Instagram
                                        </li>
                                        <li
                                            className={activeTab === "Twitter" ? "sidebar_active-tab" : ""}
                                            onClick={() => handleTabClick("Twitter")}
                                        >
                                            Twitter (X)
                                        </li>
                                    </ul>
                                    <div className="sidebar_tabbed-content-wrap">
                                        {activeTab === "Facebook" && (
                                            <div className="sidebar_content-box sidebar_active-content-box">
                                                <div id="fb-root" />
                                                <div
                                                    className="fb-page"
                                                    data-href="https://www.facebook.com/PSDPGujarat/"
                                                    data-tabs="timeline"
                                                    data-width="380"
                                                    data-height="447"
                                                    data-small-header="false"
                                                    data-adapt-container-width="true"
                                                    data-hide-cover="false"
                                                    data-show-facepile="true"
                                                >
                                                    <blockquote cite="https://www.facebook.com/PSDPGujarat/" className="fb-xfbml-parse-ignore">
                                                        <a href="https://www.facebook.com/PSDPGujarat/">Praja Shakti Democratic Party</a>
                                                    </blockquote>
                                                </div>
                                            </div>
                                        )}
                                        {activeTab === "Instagram" && (
                                            <div className="sidebar_content-box sidebar_active-content-box">
                                                <iframe
                                                    style={{ width: "100%", height: "440px" }}
                                                    src="https://www.instagram.com/psdpgujarat/embed/"
                                                    title="Instagram Embed"
                                                />
                                            </div>
                                        )}
                                        {activeTab === "Twitter" && (
                                            <div className="sidebar_content-box sidebar_active-content-box">
                                                <a
                                                    className="twitter-timeline"
                                                    href="https://twitter.com/PSDPGujarat?ref_src=twsrc%5Etfw"
                                                    data-width="380"
                                                    data-height="447"
                                                >
                                                    Tweets by PSDPGujarat
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="side_bar_sec">
                                <div className="side_bar_title">
                                    <h3>Youtube Updates</h3>
                                </div>
                                <div className="sidebar_body">YOU TUBE</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ReachUsSection />
        </>
    )
}

