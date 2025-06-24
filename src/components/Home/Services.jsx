"use client"
import Image from "next/image"
import Link from "next/link"
import styles from "@/app/styles/Services.module.css"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { settingsData } from "@/redux/reuducer/settingSlice"
import { getKilometerRange } from "@/redux/reuducer/locationSlice.js"
import NoData from "../NoDataFound/NoDataFound"

const Services = ({ cityData, sliderData }) => {
    console.log("Services component rendering") // Check if component renders

    const KmRange = useSelector(getKilometerRange)
    const systemSettingsData = useSelector(settingsData)
    const settings = systemSettingsData?.data
    const isDemoMode = settings?.demo_mode

    console.log("Initial props:", { cityData, sliderData, isDemoMode, KmRange })

    const [filteredSliderData, setFilteredSliderData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // Filter based on location data
    useEffect(() => {
        console.log("useEffect triggered") // Check if useEffect runs

        // Set initial loading state
        setIsLoading(true)
        console.log("Set loading to true")

        // Simplify filtering logic to ensure it runs
        let filtered = sliderData || []
        console.log("Initial data count:", filtered.length)

        // Only apply filtering if not in demo mode and we have data
        if (!isDemoMode && sliderData && sliderData.length > 0 && cityData) {
            console.log("Starting filtering process")

            try {
                // Very simple filtering to start with
                if (cityData.city || cityData.state || cityData.country) {
                    console.log("Filtering by location:", cityData)

                    filtered = sliderData.filter((item) => {
                        // Check for city match
                        if (cityData.city && item.city && item.city === cityData.city) {
                            console.log("City match found for item:", item.id || "unknown")
                            return true
                        }

                        // Check for state match (including state_id)
                        if (
                            cityData.state &&
                            ((item.state && item.state === cityData.state) ||
                                (item.state_id && item.state_id.toString() === cityData.state))
                        ) {
                            console.log("State match found for item:", item.id || "unknown")
                            return true
                        }

                        // Check for country match
                        if (cityData.country && item.country && item.country === cityData.country) {
                            console.log("Country match found for item:", item.id || "unknown")
                            return true
                        }

                        return false
                    })

                    console.log("Filtered data count:", filtered.length)
                } else {
                    console.log("No location data to filter by")
                }
            } catch (error) {
                console.error("Error during filtering:", error)
                // On error, use all data
                filtered = sliderData
            }
        } else {
            console.log("Skipping filtering: isDemoMode or no data")
        }

        // Always update state, even if filtering didn't happen
        console.log("Setting filteredSliderData with", filtered.length, "items")
        setFilteredSliderData(filtered)
        setIsLoading(false)
        console.log("Set loading to false")
    }, [cityData, KmRange, sliderData, isDemoMode])

    // Log whenever filteredSliderData changes
    useEffect(() => {
        console.log("filteredSliderData updated:", filteredSliderData.length)
    }, [filteredSliderData])
    

    // Filter all banner items
    const bannerItems = filteredSliderData?.filter((item) => item.type === "banner") || []
    console.log("Banner items count:", bannerItems.length)

    // First banner is used for job search panel
    const jobSearchPanel = bannerItems[0] || {
        image: "/assets/job-search-image.png",
        alt: "Looking for a Job - Find an Employer matches your Skills",
        href: "/job-search", // Default URL if none provided
    }

    // Remaining banners used for service cards
    const servicesData = bannerItems.slice(1)
    console.log("Service cards count:", servicesData.length)

    return (
        <div className={styles.serviceSection}>
            {isLoading ? (
                <div className="loader servicesSectionLoader"></div>
            ) : filteredSliderData && filteredSliderData.length > 0 ? (
                <section className={styles.servicesContainer}>
                    {/* Job Search Panel */}
                    <Link href={jobSearchPanel.third_party_link || "#"} className={styles.jobSearchPanel}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={jobSearchPanel.image || jobSearchPanel.src || "/placeholder.svg"}
                                alt={jobSearchPanel.alt || "Job search banner"}
                                fill
                                className={styles.jobSearchImg}
                            />
                        </div>
                    </Link>

                    {/* Service Cards */}
                    <div className={styles.serviceCards}>
                        {servicesData.map((service, index) => (
                            <Link key={index} href={service.third_party_link || "#"} className={styles.serviceCard}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={service.image || "/placeholder.svg"}
                                        alt={service.alt || `Service image ${index + 1}`}
                                        fill
                                        className={styles.serviceImg}
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            ) : (
                <NoData name={"Services"} />
            )}
        </div>
    )
}

export default Services
