"use client"

import styles from "@/app/styles/Events.module.css"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { settingsData } from "@/redux/reuducer/settingSlice"
import { getKilometerRange } from "@/redux/reuducer/locationSlice.js"
import NoData from "../NoDataFound/NoDataFound"
import AppDownloadModal from "./app-download-modal"

export default function EventsPage({ sliderData, cityData }) {
  const filteredSliderData2 = sliderData?.filter((ele) => ele.type === "slider" && ele.event_id !== null)

  const KmRange = useSelector(getKilometerRange)
  const systemSettingsData = useSelector(settingsData)
  const settings = systemSettingsData?.data
  const isDemoMode = settings?.demo_mode

  console.log("Initial props:", { cityData, sliderData, isDemoMode, KmRange })

  const [filteredSliderData, setFilteredSliderData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

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

  const handleEventClick = (event, e) => {
    e.preventDefault() // Prevent default navigation
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  return (
    <div>
      {isLoading ? (
        <div className="loader servicesSectionLoader"></div>
      ) : filteredSliderData && filteredSliderData.length > 0 ? (
        <div className={styles.body}>
          <div className={styles.container}>
            <h4 className="pop_cat_head mb-4 text-center text-xl-start ms-xl-4 ps-xl-3">Trending Events</h4>

            {filteredSliderData2?.length > 0 ? (
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={24}
                slidesPerView={3}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
              >
                {filteredSliderData2.map((event, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <a href="#" onClick={(e) => handleEventClick(event, e)}>
                        <div className={styles.eventCard}>
                          <img
                            className={styles.eventImage}
                            src={event.image || "/default-image.png"}
                            alt={event.alt || event.title || "Event"}
                          />
                          {/* <div className={styles.eventDetails}>
                              <div className={styles.eventTitle}>
                                  {event.title || 'Untitled Event'}
                              </div>
                              <div className={styles.eventLocation}>
                                  {event.location || 'Unknown Location'}
                              </div>
                          </div> */}
                        </div>
                      </a>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            ) : (
              <p className="text-center">No trending events found.</p>
            )}
          </div>
        </div>
      ) : (
        <NoData name={"Events"} />
      )}

      {/* App Download Modal */}
      <AppDownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedEvent?.title ? `Download app to view "${selectedEvent.title}"` : "Get the full experience"}
      />
    </div>
  )
}
