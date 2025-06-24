"use client"

import { t } from "@/utils"
import { getAreasApi, getCitiesApi, getCoutriesApi, getStatesApi } from "@/utils/api"
import { Input, List, Empty, Spin } from "antd"
import { useState } from "react"
import { IoSearchOutline } from "react-icons/io5"

const LocationSearch = ({
  setCountry,
  setState,
  setCity,
  setIsFetchSingleCatItem,
  setSelectedLocationKey,
  setArea,
  setKmRange,
  setIsShowKmRange,
}) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(null)

  // Search for locations based on query
  const searchLocations = async (query) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setLoading(true)
    try {
      // Search countries
      const countriesRes = await getCoutriesApi.getCoutries({ search: query })
      const countries = (countriesRes?.data?.data?.data || []).map(country => ({
        title: country.name,
        id: country.id,
        type: "country",
        key: `country_${country.id}`,
      }))

      // Search states
      const statesRes = await getStatesApi.getStates({ search: query })
      const states = (statesRes?.data?.data?.data || []).map(state => ({
        title: state.name,
        id: state.id,
        type: "state",
        parentId: state.country_id,
        key: `state_${state.id}`,
      }))

      // Search cities
      const citiesRes = await getCitiesApi.getCities({ search: query })
      const cities = (citiesRes?.data?.data?.data || []).map(city => ({
        title: city.name,
        id: city.id,
        type: "city",
        parentId: city.state_id,
        key: `city_${city.id}`,
      }))

      // Search areas
      const areasRes = await getAreasApi.getAreas({ search: query })
      const areas = (areasRes?.data?.data?.data || []).map(area => ({
        title: area.name,
        id: area.id,
        type: "area",
        parentId: area.city_id,
        key: `area_${area.id}`,
      }))

      // Combine and sort results by type
      const allResults = [...countries, ...states, ...cities, ...areas].sort((a, b) => {
        const typeOrder = { country: 1, state: 2, city: 3, area: 4 }
        return typeOrder[a.type] - typeOrder[b.type]
      })

      setSearchResults(allResults)
    } catch (error) {
      console.error("Error searching locations:", error)
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }

  // Handle search input change
  const handleSearchChange = async (e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (!query.trim()) {
      setIsSearching(false)
      setSearchResults([])
      return
    }

    setIsSearching(true)
    searchLocations(query)
  }

  // Handle location selection from search results
  const handleLocationSelect = (item) => {
    // Reset all location settings
    setCity("")
    setCountry("")
    setState("")
    setArea("")
    
    // Set selected location
    setSelectedLocation(item)

    // Set the appropriate location based on type
    if (item.type === "country") {
      setCountry(item.title)
      setSelectedLocationKey([item.key])
    } else if (item.type === "state") {
      setState(item.title)
      setSelectedLocationKey([item.key])
    } else if (item.type === "city") {
      setCity(item.title)
      setSelectedLocationKey([item.key])
    } else if (item.type === "area") {
      setArea({ ...item, isArea: true })
      setSelectedLocationKey([item.key])
    }

    // Trigger API call
    setIsShowKmRange(false)
    setKmRange(0)
    setIsFetchSingleCatItem((prev) => !prev)
  }

  // Function to get location type label for display
  const getLocationTypeLabel = (type) => {
    switch (type) {
      case "country":
        return t("Country")
      case "state":
        return t("State")
      case "city":
        return t("City")
      case "area":
        return t("Area")
      default:
        return ""
    }
  }

  // Render selected location info
  const renderSelectedLocation = () => {
    if (!selectedLocation) return null;
    
    return (
      <div className="selected-location-container">
        <h4>{t("Selected Location")}</h4>
        {/* <div className="selected-location-info">
          <span className="selected-location-title">{selectedLocation.title}</span>
          <span className="selected-location-type">({getLocationTypeLabel(selectedLocation.type)})</span>
        </div> */}
      </div>
    );
  };

  return (
    <>
      {/* Search Input */}
      <div className="location-search-container" style={{ marginBottom: "15px" }}>
        <Input
          placeholder={t("Search locations...")}
          value={searchQuery}
          onChange={handleSearchChange}
          prefix={<IoSearchOutline style={{ color: "#595b6c" }} />}
          className="location-search-input"
          autoComplete="on"
        />
      </div>

      {/* Selected Location */}
      {renderSelectedLocation()}

      {/* Search Results */}
      {isSearching && (
        <div className="location-search-results">
          {loading ? (
            <div className="search-loading">
              <Spin size="small" />
              <span style={{ marginLeft: "10px" }}>{t("Searching...")}</span>
            </div>
          ) : searchResults.length > 0 ? (
            <List
              className="search-results-list"
              itemLayout="horizontal"
              dataSource={searchResults}
              renderItem={(item) => (
                <List.Item 
                  className="search-result-item" 
                  onClick={() => handleLocationSelect(item)}
                >
                  <div className="search-result-content catTree">
                    <div className="search-result-title">{item.title}</div>
                    <div className="search-result-type">{getLocationTypeLabel(item.type)}</div>
                  </div>
                </List.Item>
              )}
            />
          ) : (
            <Empty description={t("No matching locations found")} className="search-no-results" />
          )}
        </div>
      )}
    </>
  )
}

export default LocationSearch