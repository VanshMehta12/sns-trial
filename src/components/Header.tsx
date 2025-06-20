"use client"
import { type ChangeEvent, useEffect, useState, useCallback, useMemo } from "react"
import Link from "next/link"
import $ from "jquery"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export default function Header() {
    const [language, setLanguage] = useState("gu")
    const [isSticky, setIsSticky] = useState(false)
    const [activeTab, setActiveTab] = useState("home")
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        number: "",
    })

    const router = useRouter()
    const pathname = usePathname()
    const { isAuthenticated } = useAuth()

    // Memoize language detection logic
    const detectedLanguage = useMemo(() => {
        if (pathname.includes("/gu")) return "gu"
        if (pathname.includes("/en")) return "en"
        return "gu" // default
    }, [pathname])

    // Initialize language from various sources
    useEffect(() => {
        const savedLanguage = localStorage.getItem("language") || detectedLanguage
        setLanguage(savedLanguage)

        // Update localStorage and cookie with detected language
        localStorage.setItem("language", detectedLanguage)
        document.cookie = `language=${detectedLanguage}; path=/; max-age=3600`
    }, [detectedLanguage])

    // Load user data when authentication changes
    useEffect(() => {
        if (isAuthenticated) {
            const storedUserData = localStorage.getItem("userData")
            if (storedUserData) {
                try {
                    const parsedUserData = JSON.parse(storedUserData)
                    setUserInfo({
                        name: parsedUserData.name || "",
                        email: parsedUserData.email || "",
                        number: parsedUserData.mobile || "",
                    })
                } catch (error) {
                    console.error("Error parsing user data:", error)
                }
            }
        } else {
            // Clear user info when not authenticated
            setUserInfo({ name: "", email: "", number: "" })
        }
    }, [isAuthenticated])

    // Initialize jQuery functionality and scroll listener
    useEffect(() => {
        // jQuery for toggle sub-menus
        const initializeMenus = () => {
            $(".menu-item-has-children")
                .off("click")
                .on("click", function () {
                    // Close all other open submenus first
                    $(".sub-menu").not($(this).next(".sub-menu")).slideUp()
                    $(".dropdown").not($(this).find(".dropdown")).removeClass("rotate")

                    // Toggle the clicked submenu
                    $(this).next(".sub-menu").slideToggle()
                    $(this).find(".dropdown").toggleClass("rotate")
                })

            // Close submenu when clicking on a submenu item
            $(".sub-menu a")
                .off("click")
                .on("click", function () {
                    $(this).closest(".sub-menu").slideUp()
                    $(this).closest("li").prev(".menu-item-has-children").find(".dropdown").removeClass("rotate")
                })

            // jQuery for expand and collapse the sidebar
            $(".menu-btn")
                .off("click")
                .on("click", () => {
                    $(".side-bar").addClass("active")
                    $(".menu-btn").css("visibility", "hidden")
                })

            $(".close-btn")
                .off("click")
                .on("click", () => {
                    $(".side-bar").removeClass("active")
                    $(".menu-btn").css("visibility", "visible")
                })
        }

        // Scroll event handler
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0)
        }

        // Initialize everything
        initializeMenus()
        window.addEventListener("scroll", handleScroll)

        // Cleanup
        return () => {
            window.removeEventListener("scroll", handleScroll)
            // Clean up jQuery event listeners
            $(".menu-item-has-children").off("click")
            $(".sub-menu a").off("click")
            $(".menu-btn").off("click")
            $(".close-btn").off("click")
        }
    }, []) // Empty dependency array since this only needs to run once

    // Memoized language change handler
    const handleLanguageChange = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            const newLang = event.target.value

            // Update state and storage
            setLanguage(newLang)
            localStorage.setItem("language", newLang)
            document.cookie = `language=${newLang}; path=/; max-age=3600`

            // Navigate to appropriate route
            let newPath = pathname

            if (newLang === "en") {
                if (pathname.includes("/gu")) {
                    newPath = pathname.replace("/gu", "/en")
                } else if (!pathname.includes("/en")) {
                    newPath = `/en${pathname}`
                }
            } else if (newLang === "gu") {
                if (pathname.includes("/en")) {
                    newPath = pathname.replace("/en", "/gu")
                } else if (!pathname.includes("/gu")) {
                    newPath = `/gu${pathname}`
                }
            }

            if (newPath !== pathname) {
                router.push(newPath)
            }
        },
        [pathname, router],
    )

    // Memoized dropdown toggle
    const toggleDropdown = useCallback(() => {
        setIsDropdownOpen((prev) => !prev)
    }, [])

    // Memoized logout handler
    const handleLogout = useCallback(() => {
        sessionStorage.removeItem("auth_token")
        localStorage.removeItem("userData") // Also clear user data
        window.location.reload()
    }, [])

    // Memoized tab change handler
    const handleTabChange = useCallback((tab: string) => {
        setActiveTab(tab)
    }, [])

    // Memoized login navigation
    const handleLoginClick = useCallback(() => {
        router.push("/join")
    }, [router])

    const LanguagePicker = () => {
        let detectedLanguage = "gu"; // Default to English

        if (pathname.includes("/gu")) {
            detectedLanguage = "gu";
        } else if (pathname.includes("/en")) {
            detectedLanguage = "en";
        }

        // Update localStorage with the detected language
        localStorage.setItem('language', detectedLanguage);
        document.cookie = `language=${detectedLanguage}; path=/; max-age=3600`;

        // Set the language state
        setLanguage(detectedLanguage);
    }


    useEffect(() => {
        LanguagePicker()
    }, [pathname])
    

    return (
        <header>
            <div className="pr_top_header">
                <div className="container">
                    <div className="pr_top_menu_bar">
                        <div className="pr_top_menu_bar_left mt-3">
                            <ul>
                                <li>
                                    <Link className="text-decoration-none" href={`/${language}/events`}>
                                        Event
                                    </Link>
                                </li>
                                <li>
                                    <Link className="text-decoration-none" href={`/${language}/e-greetings`}>
                                        E-greetings
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/${language}/donation`} className="top_btn donate_btn text-decoration-none">
                                        Donation
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/join`} className="top_btn jont_party_btn text-decoration-none">
                                        Join Party
                                    </Link>
                                </li>
                                <div className="lang-menu">
                                    <select className="selected-lang" onChange={handleLanguageChange} value={language}>
                                        <option value="en">English</option>
                                        <option value="gu">Gujarati</option>
                                    </select>
                                </div>
                                {isAuthenticated && (
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-warning dropdown-toggle d-flex align-items-center border-0"
                                            type="button"
                                            id="userDropdown"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            onClick={toggleDropdown}
                                        >
                                            <div className="user-icon">
                                                <i className="bi bi-person-circle"></i>
                                            </div>
                                        </button>
                                        {isDropdownOpen && (
                                            <ul
                                                className="dropdown-menu shadow row gap-0 show "
                                                style={{ zIndex: 1001, margin: "0 -20px " }}
                                                aria-labelledby="userDropdown"
                                            >
                                                <li>
                                                    <div className="px-3 py-2 mb-2">
                                                        <h6 className="mb-0">{userInfo.name}</h6>
                                                        <small className="text-muted">{userInfo.number}</small>
                                                        <small className="text-muted">{userInfo.email}</small>
                                                    </div>
                                                </li>
                                                <Link className="dropdown-item text-center mb-2 px-4" href={`${language}/dashboard`}>
                                                    <i className="bi bi-speedometer2 me-2"></i>Dashboard
                                                </Link>
                                                <li className="text-center">
                                                    <button className="mb-2 btn btn-danger px-4" onClick={handleLogout}>
                                                        <i className="bi bi-box-arrow-right me-2"></i>Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                )}
                                {!isAuthenticated && (
                                    <button className="btn btn-warning px-4 py-1 fw-medium Coda " onClick={handleLoginClick}>
                                        <span className="Coda">Login</span>
                                    </button>
                                )}
                            </ul>
                        </div>

                        <div className="lang-menu d-lg-none">
                            <select className="selected-lang" onChange={handleLanguageChange} value={language}>
                                <option value="en">English</option>
                                <option value="gu">Gujarati</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`pr_bottom_header ${isSticky ? "sticky" : ""}`}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-3">
                            <div className="logo mt-lg-3">
                                <Link href={`/${language}`}>
                                    <img src="/assets/img/logo.svg" alt="logo" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            {/* Sidebar & Mobile Navigation */}
                            <ul className="navigation_menu mt-3 d-none d-lg-flex">
                                <li>
                                    <Link className="text-decoration-none" href={`/${language}`}>
                                        Praja Shakti
                                    </Link>
                                </li>
                                <li>
                                    <a className="text-decoration-none menu-item-has-children" href="#">
                                        About Party <i className="dropdown"></i>
                                    </a>
                                    <ul className="sub-menu">
                                        <li>
                                            <Link href={`/${language}/about/about-the-party`} className="text-decoration-none">
                                                About the Party
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={`/${language}/about/party-ideology`} className="text-decoration-none">
                                                Party Ideology
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={`/${language}/about/party-constitution`} className="text-decoration-none">
                                                Party Constitution
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link href={`/${language}/sangathan`} className="text-decoration-none menu-item-has-children">
                                        Sangathan<i className="dropdown"></i>
                                    </Link>
                                    <ul className="sub-menu">
                                        <li>
                                            <a href="#" className="text-decoration-none">
                                                Nari Shakti Sangathan
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-decoration-none">
                                                Yuva Shakti Sangathan
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-decoration-none">
                                                Kisan Shakti Sangathan
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-decoration-none">
                                                Shram Shakti Sangathan
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-decoration-none">
                                                SC Seva Shakti Sangathan
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-decoration-none">
                                                ST Seva Shakti Sangathan
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-decoration-none">
                                                Samajik ane Shaikshanik Jati Seva Shakti Sangathan
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-decoration-none">
                                                Vidya Shakti Sangathan
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-decoration-none">
                                                Nyay Shakti Sangathan
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-decoration-none">
                                                Vaanijya Shakti Sangathan
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-decoration-none">
                                                Par-Prantiya Shakti Sangathan
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-decoration-none">
                                                Laghumati Samaj Shakti Sangathan
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-decoration-none">
                                                Swasthya Seva Shakti Sangathan
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link href={`/${language}/gallery`} className="text-decoration-none menu-item-has-children">
                                        Gallery
                                    </Link>
                                </li>
                                <li>
                                    <a href="#" className="text-decoration-none menu-item-has-children">
                                        Media <i className="dropdown"></i>
                                    </a>
                                    <ul className="sub-menu">
                                        <li>
                                            <Link href={`/${language}/media/video-gallery`} className="text-decoration-none">
                                                Video Gallery
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={`/${language}/media/press-releases`} className="text-decoration-none">
                                                Press Releases
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link href={`/${language}/contestelection`} className="text-decoration-none">
                                        Contest Election
                                    </Link>
                                </li>
                            </ul>
                            <div className="main_menu">
                                <div className="menu-btn float-end">
                                    <i className="fa fa-bars" />
                                </div>
                                <div className="side-bar">
                                    <div className="close-btn">
                                        <i className="fa fa-close"></i>
                                    </div>
                                    <div className="navigation_btn">
                                        <ul className="mb-0">
                                            <li>
                                                <a href={`/${language}/donation`} className="top_btn donate_btn text-decoration-none">
                                                    Donation
                                                </a>
                                            </li>
                                            <li>
                                                <a href={`/join`} className="top_btn jont_party_btn text-decoration-none">
                                                    Join Party
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mobile-nav">
                                        {/* Tabs */}
                                        <ul className="mobile-nav-tabs">
                                            <li className={activeTab === "home" ? "active" : ""} onClick={() => handleTabChange("home")}>
                                                Main Menu
                                            </li>
                                            <li className={activeTab === "about" ? "active" : ""} onClick={() => handleTabChange("about")}>
                                                Top Menu
                                            </li>
                                        </ul>

                                        {/* Tab Content */}
                                        <div className={`mobile-home-menu mobile-menu-tab ${activeTab === "home" ? "active" : ""}`}>
                                            <ul className="navigation_menu">
                                                {isAuthenticated && (
                                                    <ul className="navigation_menu">
                                                        <li>
                                                            <a href="#" className="text-decoration-none menu-item-has-children p-2">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="user-icon me-2">
                                                                        <i className="bi bi-person-circle fs-4"></i>
                                                                    </div>
                                                                    <div className="user-info overflow-hidden">
                                                                        <h6 className="mb-0 text-truncate">{userInfo.name}</h6>
                                                                        <small className="text-muted d-block text-truncate">{userInfo.number}</small>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            <ul className="sub-menu"></ul>
                                                        </li>
                                                        <li>
                                                            <Link className="" href={`${language}/dashboard`}>
                                                                Dashboard
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                )}
                                                <li>
                                                    <Link className="text-decoration-none" href="/">
                                                        Praja Shakti
                                                    </Link>
                                                </li>
                                                <li>
                                                    <a className="text-decoration-none menu-item-has-children" href="#">
                                                        {" "}
                                                        About Party <i className="dropdown"></i>
                                                    </a>
                                                    <ul className="sub-menu">
                                                        <li>
                                                            <Link href="/about/about-the-party" className="text-decoration-none">
                                                                About the Party
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/about/party-ideology" className="text-decoration-none">
                                                                Party Ideology
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/about/party-constitution" className="text-decoration-none">
                                                                Party Constitution
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <Link href="/sangathan" className="text-decoration-none menu-item-has-children">
                                                        Sangathan<i className="dropdown"></i>
                                                    </Link>
                                                    <ul className="sub-menu">
                                                        <li>
                                                            <a href="#" className="text-decoration-none">
                                                                Nari Shakti Sangathan
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="text-decoration-none">
                                                                Yuva Shakti Sangathan
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="text-decoration-none">
                                                                Kisan Shakti Sangathan
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="text-decoration-none">
                                                                Shram Shakti Sangathan
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="text-decoration-none">
                                                                SC Seva Shakti Sangathan
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="text-decoration-none">
                                                                ST Seva Shakti Sangathan
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="text-decoration-none">
                                                                Samajik ane Shaikshanik Jati Seva Shakti Sangathan
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="text-decoration-none">
                                                                Vidya Shakti Sangathan
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="text-decoration-none">
                                                                Nyay Shakti Sangathan
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="text-decoration-none">
                                                                Vaanijya Shakti Sangathan
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="text-decoration-none">
                                                                Par-Prantiya Shakti Sangathan
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="text-decoration-none">
                                                                Laghumati Samaj Shakti Sangathan
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="text-decoration-none">
                                                                Swasthya Seva Shakti Sangathan
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <Link href="/gallery" className="text-decoration-none menu-item-has-children">
                                                        Gallery
                                                    </Link>
                                                </li>
                                                <li>
                                                    <a href="#" className="text-decoration-none menu-item-has-children">
                                                        Media <i className="dropdown"></i>
                                                    </a>
                                                    <ul className="sub-menu">
                                                        <li>
                                                            <Link href="/media/video-gallery" className="text-decoration-none">
                                                                Video Gallery
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/media/press-releases" className="text-decoration-none">
                                                                Press Releases
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a href={`/${language}/contestelection`} className="text-decoration-none">
                                                        Contest Election
                                                    </a>
                                                </li>
                                                {isAuthenticated ? (
                                                    <li className="">
                                                        <Link className="mb-2" href={``} onClick={handleLogout}>
                                                            Logout
                                                        </Link>
                                                    </li>
                                                ) : (
                                                    <li className="">
                                                        <Link className="mb-2" href={`/join`}>
                                                            Login
                                                        </Link>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                        <div className={`mobile-about-menu mobile-menu-tab ${activeTab === "about" ? "active" : ""}`}>
                                            <ul className="navigation_menu">
                                                <li>
                                                    <Link href={`/${language}/events`} className="text-decoration-none">
                                                        Event
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={`/${language}/e-greetings`} className="text-decoration-none">
                                                        E-greetings
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Sidebar */}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
