"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Screen1 from "@/components/Screen1"
import Screen2 from "@/components/Screen2"
import Screen3 from "@/components/Screen3"
import ThankYou from "@/components/ThankYou"
import ProgressBar from "@/components/ProgressBar"
import { useAuth } from "@/context/AuthContext"
import "@/styles/styles.css"
import SubHeader from "@/components/SubHeader"

interface FormData {
  image: string | File;
  image_url: string | null;
  title: string;
  name: string;
  mobile: string;
  gender: string;
  state: string;
  district: string;
  addressfield: string;
  village: string;
  assembly: string;
  pincode: string;
  membershipId: string;
  religion: string;
  dob: string;
  caste: string;
  voterId: string;
  email: string;
  whatsapp: string;
  facebook: string;
  twitter: string;
  instagram: string;
}

export default function MembershipForm() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname(); // Get current path

  // const [LanguageRoute, setLanguageRoute] = useState("")

  // useEffect(() => {
  //   const lang = localStorage.getItem("language");
  //   if (lang) {
  //     setLanguageRoute(lang);
  //   }
  // }, [isAuthenticated, pathname, router])

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<FormData>({
    image: "",
    image_url: "",
    title: "",
    name: "",
    mobile: "",
    gender: "",
    state: "",
    district: "",
    addressfield: "",
    village: "",
    assembly: "",
    pincode: "",
    membershipId: "",
    religion: "",
    dob: "",
    caste: "",
    voterId: "",
    email: "",
    whatsapp: "",
    facebook: "",
    twitter: "",
    instagram: "",
  })

  const [fetchError, setFetchError] = useState<string | null>(null)

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const generateMembershipId = () => {
    const prefix = "PSDPINGJ"
    const randomNum = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(8, "0")
    return `${prefix}${randomNum}`
  }

  const handleNext = async () => {
    if (step === 1 && !formData.membershipId) {
      updateFormData({ membershipId: generateMembershipId() })
    }
    setStep((prev) => prev + 1)
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep((prev) => prev - 1)
    }
  }


  const fetchMemberData = async () => {
    try {
      const token = sessionStorage.getItem("auth_token");
      if (token) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}GetProfile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch member data");
        }

        const dt = await response.json()
        const data = dt.data

        setFormData({
          image: data.photo || "",
          image_url: data.image_url || "",
          title: data.title || "",
          name: data.name || "",
          mobile: data.mobile || "",
          gender: data.gender || "",
          state: data.state_id || "",
          district: data.district_id || "",
          addressfield: data.address || "",
          village: data.village || "",
          assembly: data.assembly_constituency_id || "",
          pincode: data.pincode || "",
          membershipId: data.membershipId || "",
          religion: data.religion || "",
          dob: data.dob || "",
          caste: data.caste || "",
          voterId: data.voterId || "",
          email: data.email || "",
          whatsapp: data.social?.whatsapp_number || "",
          facebook: data.social?.facebook_url || "",
          twitter: data.social?.twitter_url || "",
          instagram: data.social?.instagram_url || "",
        })
      }
    } catch (error) {
      console.error("Error fetching member data:", error)
      setFetchError("There was a problem fetching your data. Please try again.");
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      // let safeLanguageRoute = " "
      // if (pathname.includes("/gu")) {
      //   safeLanguageRoute = "/gu"
      // } else if (pathname.includes("/en")) {
      //   safeLanguageRoute = "/en"
      // } else {
      //   safeLanguageRoute = "/en"
      // }
      // router.push(`${safeLanguageRoute}/join`)
      router.push(`/join`)

    } else {
      fetchMemberData()
    }
  }, [isAuthenticated, pathname, router])

  if (!isAuthenticated || loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Verifying your access...</p>
        </div>
      </div>
    )
  }

  if (fetchError) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <h4 className="text-danger">{fetchError}</h4>
          <button onClick={fetchMemberData} className="btn btn-primary mt-3">Retry</button>
        </div>
      </div>
    )
  }

  return (
    <>
      <SubHeader />
      {/* <div className="d-flex justify-content-center align-items-center"> */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="py-4">
            <h3 className="mb-0 ps-3 font1 h2 fw-bold">MEMBERSHIP REGISTRATION</h3>
            <div className="card-header p-2 rounded h2">
            </div>
            <div className="card-body p-4">
              <ProgressBar currentStep={step} totalSteps={4} /> {/* Updated steps to include Thank You page */}

              {step === 1 && <Screen1 formData={formData} updateFormData={updateFormData} onNext={handleNext} />}

              {step === 2 && (
                <Screen2
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                />
              )}

              {step === 3 && (
                <Screen3
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                />
              )}

              {step === 4 && <ThankYou formData={formData} />}
            </div>
          </div>
        </div>
      </div>
      {/* </div > */}
    </>

  )
}