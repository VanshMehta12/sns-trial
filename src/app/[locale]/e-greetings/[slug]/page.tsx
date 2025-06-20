"use client"
import { useState, type ChangeEvent, type FormEvent, useRef, useEffect } from "react"
import html2canvas from "html2canvas"
import { useParams, useSearchParams } from "next/navigation"

interface PhotoItem {
    id: number
    slug: string
    category_name: string
    image_url: string
    title: string
    date: string
}

export default function EGreetingDetailPage() {
    const [formData, setFormData] = useState({ name: "", phonenumber: "" })
    const [photo, setPhoto] = useState<File | null>(null)
    const [photoPreview, setPhotoPreview] = useState<string | null>(null)
    const [BannerPreview, setBannerPreview] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)
    const [shareError, setShareError] = useState<string | null>(null)
    const certificateRef = useRef<HTMLDivElement>(null)
    const [dynamicCSS, setDynamicCSS] = useState<string>("")

    const params = useParams()
    const searchParams = useSearchParams()
    let id: string | null = null

    if (params && typeof params === "object") {
        const keys = Object.keys(params)
        if (keys.length > 0) {
            const lastKey = keys[keys.length - 1]
            id = params[lastKey] as string
        }
    }

    if (!id) {
        id = searchParams.get("id")
    }

    const [photoItems, setPhotoItems] = useState<PhotoItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [memberData, setMemberData] = useState({ name: "", mobile: "", image_url: "" })
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const token = sessionStorage.getItem("auth_token")
                if (!token) {
                    setError("No auth token found")
                    return
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}GetProfile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

                if (!response.ok) throw new Error("Failed to fetch data")

                const dt = await response.json()
                const data = dt.data

                setMemberData({
                    name: data.name || "",
                    mobile: data.mobile || "",
                    image_url: data.image_url || "",
                })

                setFormData({
                    name: data.name || "",
                    phonenumber: data.mobile || "",
                })

                if (data.image_url) {
                    setPhotoPreview(data.image_url)
                }
            } catch (err) {
                setError("Something went wrong")
                console.error("Error fetching member data:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchMemberData()
    }, [])

    useEffect(() => {
        if (!id) {
            console.error("No ID found in URL path or search parameters")
            setIsLoading(false)
            return
        }

        const fetchTemplateData = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}greetingTemplate?greeting_id=${id}`,
                )

                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

                const dt = await response.json()
                console.log("Template API Response:", dt)

                if (dt) {
                    setPhotoItems(dt)
                    if (dt.image_url) {
                        setBannerPreview(dt.image_url)
                    }
                    setDynamicCSS(dt.css || "")
                } else {
                    console.error("Unexpected API response format:", dt)
                    setPhotoItems([])
                }
            } catch (error) {
                console.error("Error fetching template data:", error)
                setPhotoItems([])
            } finally {
                setIsLoading(false)
            }
        }

        fetchTemplateData()
    }, [id])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0]
            setPhoto(selectedFile)

            const reader = new FileReader()
            reader.onload = () => setPhotoPreview(reader.result as string)
            reader.readAsDataURL(selectedFile)
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setIsFormSubmitted(true)
        } catch (err) {
            setError("Failed to submit form")
            console.error("Form submission error:", err)
        } finally {
            setIsSubmitting(false)
        }
    }

    const generateCanvasImage = async () => {
        if (!certificateRef.current) return null
        try {
            const canvas = await html2canvas(certificateRef.current, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: "#ffffff",
            })
            const imgData = canvas.toDataURL("image/png")
            const response = await fetch(imgData)
            const blob = await response.blob()
            return { imgData, blob }
        } catch (error) {
            console.error("Error generating certificate:", error)
            return null
        }
    }

    const handleDownload = async () => {
        const result = await generateCanvasImage()
        if (!result) return alert("Error generating certificate.")
        const { imgData } = result
        const link = document.createElement("a")
        link.download = `Certificate-${formData.name}.png`
        link.href = imgData
        link.click()
    }

    const handleShare = async () => {
        setShareError(null)
        const result = await generateCanvasImage()
        if (!result) return setShareError("Could not generate certificate image.")

        const { blob } = result
        const imageFile = new File([blob], "certificate.png", { type: "image/png" })
        const shareData = {
            title: "Join Praja Shakti Democratic Party",
            text: "Join for a fearless and prosperous Gujarat.",
            url: "https://event.prajashakti.org/PrajaShaktiSurat",
        }

        try {
            if (navigator.share && navigator.canShare({ files: [imageFile] })) {
                await navigator.share({ ...shareData, files: [imageFile] })
                return
            }
            if (navigator.share) {
                await navigator.share(shareData)
                return
            }
            handleDownload()
            setShareError("Sharing is not supported. Download the certificate and share manually.")
        } catch (error) {
            setShareError("Error sharing. Try downloading instead.")
            console.error("Sharing error:", error)
            handleDownload()
        }
    }

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading your profile...</p>
            </div>
        )
    }

    return (
        <div className="container py-5">
            {dynamicCSS && <style dangerouslySetInnerHTML={{ __html: dynamicCSS }} />}
            {!isFormSubmitted ? (
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-12 card shadow-lg p-4">
                        <div className="text-center mb-4">
                            <img
                                alt="Praja Shakti Logo"
                                className="img-fluid"
                                src="https://prajashakti.org/assets/img/logo.svg"
                                style={{ width: "80px", height: "80px" }}
                            />
                            <h2 className="mt-3 fw-bold text-danger">Praja Shakti Democratic Party</h2>
                            {id ? (
                                <p className="text-success">Template ID: {id}</p>
                            ) : (
                                <p className="text-danger">No template ID found in URL</p>
                            )}
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Mobile Number</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="phonenumber"
                                    value={formData.phonenumber}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold">Upload Photo</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    required={!photoPreview}
                                />
                                {photoPreview && (
                                    <img
                                        src={photoPreview}
                                        alt="Preview"
                                        className="img-thumbnail mt-3"
                                        style={{ maxHeight: "150px" }}
                                    />
                                )}
                            </div>

                            <button type="submit" className="btn btn-danger w-100" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <h2 className="fw-bold text-danger">Thank You for Joining!</h2>

                    <div className="d-flex flex-wrap justify-content-center gap-3 my-4">
                        <button onClick={handleDownload} className="btn btn-danger">
                            Download Certificate
                        </button>
                        <button onClick={handleShare} className="btn btn-danger">
                            Share Certificate
                        </button>
                    </div>

                    {shareError && <div className="alert alert-warning">{shareError}</div>}

                    <div
                        ref={certificateRef}
                        className="mx-auto"
                        style={{
                            position: "relative",
                            backgroundImage: `url(${BannerPreview})`,
                            width: "90vw",
                            maxWidth: "600px",
                            height: "calc(90vw * (651 / 600))",
                            maxHeight: "651px",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundColor: "#ffffff",
                        }}
                    >
                        <div className="user-image position-absolute"
                            style={{
                                overflow: "hidden",
                                borderRadius: "75%",
                                backgroundColor: "#ffffff",
                            }}>
                            <img
                                src={photoPreview || ""}
                                alt="User Photo"
                                style={{
                                    height: "105%",
                                    width: "100%",
                                    borderRadius: "10px",
                                }}
                            />
                        </div>
                        <div className="user-name position-absolute">
                            <h6
                                style={{
                                    margin: "0",
                                    padding: "0",
                                    fontSize: "clamp(8px, 2vw, 14px)",
                                    color: "#414148",
                                    lineHeight: "1.5",
                                    fontWeight: "bold",
                                    textTransform: "uppercase",
                                }}
                            >
                                {formData.name}
                            </h6>
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    )
}
