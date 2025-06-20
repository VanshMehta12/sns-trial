"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import "@/styles/styles.css"

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

interface ThankYouProps {
  formData: FormData
}

export default function ThankYou({ formData }: ThankYouProps) {
  const router = useRouter()
  const pathname = usePathname(); // Get current path
  const [LanguageRoute, setLanguageRoute] = useState("")

  useEffect(() => {
    const lang = localStorage.getItem("language");
    if (lang) {
      setLanguageRoute(`/${lang}/`);
    }
  }, [pathname])


  useEffect(() => {
    // Redirect to /membership-details after 5 seconds
    const timer = setTimeout(() => {
      router.push(`${LanguageRoute}membership-details`)
    }, 3000)

    return () => clearTimeout(timer) // Cleanup the timer
  }, [router])

  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="display-1 text-success mb-3">
          <i className="bi bi-check-circle-fill"></i>
        </div>
        <h2 className="mb-3">Thank You! <br />(આભાર!)</h2>
        <p className="lead mb-4">Your membership registration is complete.<br />(તમારી સભ્યપદ નોંધણી પૂર્ણ થઈ ગઈ છે.)</p>
        <div className="alert alert-success">
          <strong>Your Membership ID (તમારું સભ્યપદ ID):</strong> {formData.membershipId}
        </div>
        <div className="loader-container">
          <div className="loader-content">
            <div className="gradient-spinner p-2">
              <img src="/assets/img/logo.svg" alt="Logo" className="loader-logo" />
            </div>
            <strong className="h3">Please wait...</strong>
            <p className="fs-6">while we are generating your membership card.</p>
          </div>
        </div>
      </div>


      {/* <div className="mb-4">
        <div ref={cardRef} className="mx-auto" style={{ maxWidth: "350px" }}>
          <Card formData={formData} />
        </div>
      </div> */}

      {/* <button className="btn btn-danger btn-lg" onClick={downloadIdCard}>
        <i className="bi bi-download me-2"></i>
        Download ID Card
      </button> */}
    </div>
  )
}

