"use client"

import { Upload } from "lucide-react"
import type React from "react"
import { useEffect, useRef, useState } from "react"
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

interface StateData {
  name: string;
  id: string;
}

interface DistrictData {
  name: string;
  id: string;
}

interface AssemblyData {
  name: string;
  id: string;
}

interface Screen1Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
}

export default function Screen1({ formData, updateFormData, onNext }: Screen1Props) {
  const [isFormValid, setIsFormValid] = useState(false)
  const [states, setStates] = useState<{ name: string; id: number }[]>([])
  const [districts, setDistricts] = useState<{ name: string; id: number }[]>([])
  const [assemblies, setAssemblies] = useState<{ name: string; id: number }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [preview, setPreview] = useState<string | null>(formData.image_url || null)
  const [imageError, setImageError] = useState(false) // State to track image loading status

  useEffect(() => {
    const {name} = formData
    setIsFormValid(!!( name))
  }, [formData])

  useEffect(() => {
    if (formData.image_url && !preview) {
      setPreview(formData.image_url)
    }

    return () => {
      if (preview && preview !== formData.image_url) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview, formData.image_url])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isFormValid) {
      updateStep1Data();
      onNext();
    }
  }

  async function getState() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}state`, { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to fetch data")

      const dt = await res.json()

      if (Array.isArray(dt.data)) {
        setStates(
          dt.data.map((state: StateData) => ({
            name: state.name,
            id: state.id,
          })),
        )
      } else {
        setStates([])
      }
    } catch (err) {
      console.error(err)
      setStates([])
    }
  }

  async function getDistrict(state_id: number) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}district?state_id=${state_id}`, { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to fetch districts")

      const dt = await res.json()

      if (Array.isArray(dt.data)) {
        setDistricts(
          dt.data.map((district: DistrictData) => ({
            name: district.name,
            id: district.id,
          })),
        )
      } else {
        setDistricts([])
      }
    } catch (err) {
      console.error(err)
      setDistricts([])
    }
  }

  async function getAssembly(district_id: number) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}assemblyConstituencey?district_id=${district_id}`, { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to fetch districts")

      const dt = await res.json()

      if (Array.isArray(dt.data)) {
        setAssemblies(
          dt.data.map((assembly: AssemblyData) => ({
            name: assembly.name,
            id: assembly.id,
          })),
        )
      } else {
        setAssemblies([])
      }
    } catch (err) {
      console.error(err)
      setAssemblies([])
    }
  }

  function updateStep1Data() {
    const formdata = new FormData()
    formdata.append("step1", "1")
    formdata.append("title", formData.title || "")
    formdata.append("name", formData.name || "")
    formdata.append("gender", formData.gender || "")
    formdata.append("address", formData.addressfield || "")
    formdata.append("state_id", formData.state || "")
    formdata.append("district_id", formData.district || "")
    formdata.append("assembly_constituency_id", formData.assembly || "")
    formdata.append("village", formData.village || "")
    formdata.append("pincode", formData.pincode || "")

    // Append image only if it exists and is a File object
    if (formData.image && typeof formData.image !== "string") {
      formdata.append("image", formData.image)
    }

    // If we have an image_url but no new image, pass the image_url
    if (formData.image_url && !formData.image) {
      formdata.append("image_url", formData.image_url)
    }

    const token = sessionStorage.getItem("auth_token");

    fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}updateprofile`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => console.log("Step 1 data updated successfully", data))
      .catch((error) => console.error("Error updating Step 1 data:", error))
  }

  useEffect(() => {
    async function fetchData() {
      await getState()

      if (formData.state) { getDistrict(Number(formData.state)); } // Convert string to number

      if (formData.district) {
        await getAssembly(Number(formData.district))
      }
    }

    fetchData()
  }, [])

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (file) {
      // Ensure formData.image is an object before comparing
      const isFileObject =
        formData.image && typeof formData.image === 'object' && 'name' in formData.image && 'size' in formData.image;

      const isSameFile =
        isFileObject &&
        (formData.image as unknown as File).name === file.name &&
        (formData.image as unknown as File).size === file.size;

      if (!isSameFile) {
        updateFormData({ image: file, image_url: null }); // Clear image_url when uploading new image
        setPreview(URL.createObjectURL(file));
        setImageError(false); // Reset the image error state
      }
    }

  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="mb-4">Personal Information <span className="font2">(વ્યક્તિગત માહિતી)</span></h4>
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="imageUpload" className="form-label">
              Upload Image <span className="font2">(છબી અપલોડ કરો)</span> - Optional
            </label>

            <input
              type="file"
              className="d-none"
              id="imageUpload"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
            />

            <div
              onClick={triggerFileInput}
              className="border border-2 border-dashed rounded p-3 text-center cursor-pointer"
              style={{
                transition: "all 0.3s ease",
                minHeight: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#f8f9fa"
                e.currentTarget.style.borderColor = "#0d6efd"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = ""
                e.currentTarget.style.borderColor = ""
              }}
            >
              <Upload className="mb-2" size={32} style={{ color: "#6c757d" }} />
              <p className="mb-1">Click to upload an image</p>
              <p className="text-muted small">or drag and drop</p>
            </div>
          </div>
        </div>

        {/* Right side - Preview section */}
        <div className="col-md-3 ms-auto">
          <div
            className="border rounded d-flex justify-content-center align-items-center bg-light"
            style={{ minHeight: "220px" }}
          >
            {preview && !imageError ? (
              <img
                src={preview}
                alt="Uploaded Preview"
                className="img-fluid p-3"
                style={{ maxHeight: "250px", objectFit: "contain" }}
                onError={() => setImageError(true)} // Handle image loading error
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#D3D3D3", // Grey background
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "5px",
                }}
              >
                <img
                  src="/assets/img/user.svg" // Fallback logo or placeholder image
                  alt="Placeholder"
                  style={{ width: "100%", height: "100%" }} // Adjust size as desired
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="row g-2">
        {/* Title Field */}
        <div className="col-md-4 mb-3">
          <label htmlFor="title" className="form-label">
            Title <span className="font2">(શીર્ષક)</span>
            {/* {formData.title === "" && <span className="text-danger ms-1">*</span>} */}
          </label>
          <select
            id="title"
            className="form-select"
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
          >
            <option value="">Select Title</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
            <option value="Dr">Dr</option>
          </select>
        </div>

        {/* Name Field */}
        <div className="col-md-4 mb-3">
          <label htmlFor="name" className="form-label">
            Full Name <span className="font2">(પૂરું નામ)</span>
            {formData.name === "" && <span className="text-danger ms-1">*</span>}
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            required
          />
        </div>

        {/* Gender Field */}
        <div className="col-md-4 mb-3">
          <label htmlFor="gender" className="form-label">
            Gender <span className="font2">(લિંગ)</span>
            {/* {formData.gender === "" && <span className="text-danger ms-1">*</span>} */}
          </label>
          <select
            id="gender"
            className="form-select"
            value={formData.gender}
            onChange={(e) => updateFormData({ gender: e.target.value })}
            // required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Address Section */}
      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Address <span className="font2">(સરનામું)</span>
          {/* {formData.addressfield === "" && <span className="text-danger ms-1">*</span>} */}
        </label>
        <input
          type="text"
          className="form-control"
          id="address"
          placeholder="Address"
          value={formData.addressfield}
          onChange={(e) => updateFormData({ addressfield: e.target.value })}
          // required
        />
      </div>

      <div className="row g-2">
        {/* State Dropdown with Dynamic Data */}
        <div className="col-md-4 mb-3">
          <label htmlFor="state" className="form-label">
            State <span className="font2">(રાજ્ય)</span>
            {/* {formData.state === "" && <span className="text-danger ms-1">*</span>} */}
          </label>
          <select
            id="state"
            className="form-select"
            value={formData.state}
            onChange={(e) => {
              const selectedState = states.find((state) => state.id === Number(e.target.value))
              updateFormData({ state: e.target.value })
              if (selectedState) getDistrict(selectedState.id)
            }}
            // required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* District Dropdown */}
        <div className="col-md-4 mb-3">
          <label htmlFor="district" className="form-label">
            District <span className="font2"> (જિલ્લો)</span>
            {/* {formData.district === "" && <span className="text-danger ms-1">*</span>} */}
          </label>
          <select
            id="district"
            className="form-select"
            value={formData.district}
            onChange={(e) => {
              const selectedDistrict = districts.find((district) => district.id === Number(e.target.value))
              updateFormData({ district: e.target.value })
              if (selectedDistrict) getAssembly(selectedDistrict.id)
            }}
            // required
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        {/* Assembly Constituency */}
        <div className="col-md-4 mb-3">
          <label htmlFor="assembly" className="form-label">
            Assembly <span className="font2">(વિધાનસભા મતવિસ્તાર)</span>
            {/* {formData.assembly === "" && <span className="text-danger ms-1">*</span>} */}
          </label>
          <select
            id="assembly"
            className="form-select"
            value={formData.assembly}
            onChange={(e) => updateFormData({ assembly: e.target.value })}
            // required
          >
            <option value="">Select Assembly</option>
            {assemblies.map((assembly) => (
              <option key={assembly.id} value={assembly.id}>
                {assembly.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Village & Pin Code */}
      <div className="row g-2 mb-2">
        <div className="col-md-6 mb-2">
          <label htmlFor="assembly" className="form-label">
            Village/City <span className="font2">(ગામ/શહેર)</span>
            {/* {formData.village === "" && <span className="text-danger ms-1">*</span>} */}
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Village / City Name"
            value={formData.village}
            onChange={(e) => updateFormData({ village: e.target.value })}
            // required
          />
        </div>
        <div className="col-md-6 mb-2">
          <label htmlFor="assembly" className="form-label">
            Pin Code <span className="font2">(પિનકોડ)</span>
            {/* {formData.pincode === "" && <span className="text-danger ms-1">*</span>} */}
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Pin Code"
            value={formData.pincode}
            onChange={(e) => updateFormData({ pincode: e.target.value })}
            // required
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="d-md-flex justify-content-end text-center">
        <button type="submit" className="btn btn-danger px-5 px-md-3" disabled={!isFormValid}>
          Next <span className="font2">(આગળ જાઓ)</span>
        </button>
      </div>
    </form>
  )
}