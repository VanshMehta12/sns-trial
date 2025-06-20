"use client"
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Card } from "@/components/IdCard";
import { useAuth } from "@/context/AuthContext";
import {  Download,Share2 } from "lucide-react";
import { downloadElementAsImage } from "@/utils/download-card";
import { Card2 } from "@/components/IdCard2";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    LinkedinShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    TelegramIcon,
    LinkedinIcon,
    EmailIcon,
} from "next-share";
import "@/styles/styles.css"
import SubHeader from "@/components/SubHeader";

export default function MemberDetail() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [showShareModal, setShowShareModal] = useState(false);
    const [utoken, setUtoken] = useState("");
    const [memberData, setMemberData] = useState({
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
        qrcode: "",
        refer_code: ""
    });
    const pathname = usePathname(); // Get current path
    const [LanguageRoute, setLanguageRoute] = useState("")

    useEffect(() => {
        // Priority: 1. localStorage, 2. pathname language, 3. default (/en/)
        const localStorageLang = localStorage.getItem("language")
        const pathLang = pathname.split('/')[1] // Extract language from path

        if (localStorageLang) {
            setLanguageRoute(`/${localStorageLang}/`)
        } else if (pathLang) {
            setLanguageRoute(`/${pathLang}/`)
        }
    }, [pathname])

    // Function to format dates
    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        const [year, month, day] = dateString.split("-"); // Assuming the input format is "yyyy-mm-dd"
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        if (!isAuthenticated) {
            // Ensure we always have a valid language route
            // let safeLanguageRoute = " "
            // if (pathname.includes("/gu")) {
            //     safeLanguageRoute = "/gu"
            // } else if (pathname.includes("/en")) {
            //     safeLanguageRoute = "/en"
            // } else {
            //     safeLanguageRoute = "/en"
            // }
            // router.push(`${safeLanguageRoute}/join`)
            router.push(`/join`)

        } else {
            fetchMemberData();
        }
    }, [isAuthenticated, LanguageRoute, router,])

    const capitalizeFirstLetter = (string: string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const fetchMemberData = async () => {
        try {
            const token = sessionStorage.getItem("auth_token");
            if (token) {
                setUtoken(token)
                const response = await fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}GetProfile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const dt = await response.json();
                    const data = dt.data;
                    setMemberData({
                        image: data.photo || "",
                        image_url: data.image_url || "",
                        title: data.title || "",
                        name: data.name || "",
                        mobile: data.mobile || "",
                        gender: capitalizeFirstLetter(data.gender) || "", // Capitalized
                        state: data.state_name || "",
                        district: data.district_name || "",
                        addressfield: data.address || "",
                        village: capitalizeFirstLetter(data.village) || "",
                        assembly: data.assembly_name || "",
                        pincode: data.pincode || "",
                        membershipId: data.membershipId || "",
                        religion: capitalizeFirstLetter(data.religion) || "", // Capitalized
                        dob: formatDate(data.dob), // Format the date here
                        caste: data.caste || "",
                        voterId: data.voterId || "",
                        email: data.email || "",
                        whatsapp: data.social?.whatsapp_number || "",
                        facebook: data.social?.facebook_url || "",
                        twitter: data.social?.twitter_url || "",
                        instagram: data.social?.instagram_url || "",
                        qrcode: data.qr_url || "",
                        refer_code: data.refer_code || ""
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching member data:", error);
        } finally {
            setLoading(false);
        }
    };

    // const handleLogout = () => {
    //     sessionStorage.removeItem('auth_token');
    //     router.push(`/${LanguageRoute}/join`)
    // };

    const downloadCard = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 100));

            const success = await downloadElementAsImage(
                "member-id-card",
                `member-card-${memberData.membershipId || "download"}.png`
            );

            if (!success) {
                alert("Failed to download card. Please try again.");
            }
        } catch (error) {
            console.error("Error downloading card:", error);
            alert("Failed to download card. Please try again.");
        }
    };

    const downloadCard2 = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 100));

            const success = await downloadElementAsImage(
                "member-id-card2",
                `member-card-${memberData.membershipId || "download"}.png`
            );

            if (!success) {
                alert("Failed to download card. Please try again.");
            }
        } catch (error) {
            console.error("Error downloading card:", error);
            alert("Failed to download card. Please try again.");
        }
    };

    // const handleBack = () => {
    //     router.back();
    // };

    const toggleShareModal = () => {
        setShowShareModal(!showShareModal);
    };

    const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/join?refer_code=${memberData.refer_code}` : "${window.location.origin}/join";
    const shareTitle = `નમસ્તે, હું પ્રજા શક્તિ ડેમોક્રેટિક પાર્ટીનો સભ્ય બન્યો છું. તમે પણ મારી રેફરલ લિંકનો ઉપયોગ કરીને પાર્ટીમાં જોડાઈ શકો છો:`

    if (loading) {
        return (
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading member details...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <SubHeader />
            <div className="container p-4">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="shadow-sm">
                            <h2 className="mb-0 font1 ps-3 text-center">MEMBER DETAILS</h2>
                            {/* <div className="card-header danger text-white d-flex justify-content-between align-items-center p-3 rounded">
                                <button className="d-flex btn btn-sm btn-outline-light align-items-center" onClick={handleBack}>
                                    <ArrowLeft size={16} className="me-1" />
                                    Back
                                </button>
                                <div className="text-end d-md-flex me-2">
                                    <button
                                        className="d-flex btn btn-sm btn-outline-light align-items-center"
                                        onClick={handleLogout}
                                    >
                                        <LogOut size={16} className="me-1" />
                                        Logout
                                    </button>
                                </div>
                            </div> */}

                            <div className="card-body p-4">
                                <div className="row justify-content-between">
                                    {/* Left column - ID Card */}
                                    <div className="col-lg-5 col-md-6 mb-4 mb-md-0">
                                        <div className="text-center">
                                            <div className="alert alert-success">
                                                <strong>Membership ID <span className="font2">(તમારું સભ્યપદ ID)</span> :</strong>
                                                <br />
                                                {memberData.membershipId}
                                            </div>
                                            <div className="me-0 d-none">
                                                <Card formData={memberData} />
                                            </div>
                                            <div className="alert alert-danger py-2 d-none">
                                                <strong>English</strong>
                                            </div>
                                            <div className="mb-3 d-none">
                                                <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                                                    <button
                                                        className="btn btn-outline-danger rounded-pill d-flex align-items-center justify-content-center p-2 px-2 px-md-3"
                                                        onClick={toggleShareModal}
                                                    >
                                                        <Share2 size={24} className="" />   Share
                                                    </button>

                                                    <button
                                                        className="btn btn-danger text-white rounded-pill d-flex align-items-center justify-content-center p-2 px-2 px-md-3 download-btn"
                                                        onClick={downloadCard}
                                                    >
                                                        <Download size={24} className="text-white" />   Download
                                                    </button>
                                                </div>
                                                <a
                                                    className="btn btn-danger text-white rounded-pill align-items-center justify-content-center p-2 px-2 px-md-3 download-btn"
                                                    href={`https://prajashakti.org/card.php?lang=eng&token=${utoken}`}
                                                    target="_blank"
                                                >
                                                    <Download size={24} className="text-white" />   Download(IOS)
                                                </a>
                                            </div>
                                            <div className="me-0">
                                                <Card2 formData={memberData} />
                                            </div>
                                            <div className="alert alert-danger py-2 d-none">
                                                <strong>Gujarati</strong>
                                            </div>

                                            <div className="mb-3 my-3">
                                                <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                                                    <button
                                                        className="btn btn-danger rounded-pill d-flex align-items-center justify-content-center p-2 px-2 px-md-3"
                                                        onClick={toggleShareModal}
                                                    >
                                                        <Share2 size={24} className="" />   Share
                                                    </button>

                                                    <button
                                                        className="btn btn-danger text-white rounded-pill d-flex align-items-center justify-content-center p-2 px-2 px-md-3 download-btn"
                                                        onClick={downloadCard2}
                                                    >
                                                        <Download size={24} className="text-white" />   Download
                                                    </button>
                                                </div>
                                                <a
                                                    className="btn btn-danger text-white rounded-pill align-items-center justify-content-center p-2 px-2 px-md-3 download-btn"
                                                    href={`https://prajashakti.org/card.php?lang=guj&token=${utoken}`}
                                                    target="_blank"
                                                >
                                                    <Download size={24} className="text-white" />   Download(IOS)
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right column - Member Details */}
                                    <div className="col-lg-7 col-md-6">
                                        <div className="row">
                                            {/* Personal Information Section */}
                                            <div className="col-12 mb-5 mt-3">
                                                <h4 className="border-bottom pb-2 text-danger">Personal Information <span className="font2">(વ્યક્તિગત માહિતી)</span></h4>
                                                <div className="row g-3">
                                                    <div className="col-md-4">
                                                        <div className="fw-bold">Title <span className="font2">(શીર્ષક)</span></div>
                                                        <div>{memberData.title || "N/A"}</div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="fw-bold">Full Name <span className="font2">(પૂરું નામ)</span></div>
                                                        <div>{memberData.name || "N/A"}</div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="fw-bold">Gender <span className="font2">(લિંગ)</span></div>
                                                        <div>{memberData.gender || "N/A"}</div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="fw-bold">Religion <span className="font2">(ધર્મ)</span></div>
                                                        <div>{memberData.religion || "N/A"}</div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="fw-bold">Date of Birth <br /><span className="font2"> (જન્મ તારીખ)</span></div>
                                                        <div>{memberData.dob || "N/A"}</div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="fw-bold">Caste <span className="font2">(જ્ઞાતિ)</span></div>
                                                        <div>{memberData.caste || "N/A"}</div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="fw-bold">Voter ID <span className="font2">(વોટર આઇડી)</span></div>
                                                        <div>{memberData.voterId || "N/A"}</div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="fw-bold">Email ID <span className="font2">(ઈમેઇલ આઇડી)</span></div>
                                                        <div>{memberData.email || "N/A"}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Address Information Section */}
                                            <div className="col-12 mb-5">
                                                <h4 className="border-bottom pb-2 text-danger">Address Information<span className="font2"> (સરનામાની માહિતી)</span></h4>
                                                <div className="row g-3">
                                                    <div className="col-12">
                                                        <div className="fw-bold">Address <span className="font2">(સરનામું)</span></div>
                                                        <div>{memberData.addressfield || "N/A"}</div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="fw-bold">
                                                            Village/City <span className="font2">(ગામ/શહેર)</span>
                                                        </div>
                                                        <div>{memberData.village || "N/A"}</div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="fw-bold">State <span className="font2">(રાજ્ય)</span></div>
                                                        <div>{memberData.state || "N/A"}</div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="fw-bold">District <span className="font2"> (જિલ્લો)</span></div>
                                                        <div>{memberData.district || "N/A"}</div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="fw-bold">
                                                            Assembly Constituency <br /><span className="font2">(વિધાનસભા મતવિસ્તાર)</span>
                                                        </div>
                                                        <div>{memberData.assembly || "N/A"}</div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="fw-bold">Pin Code <span className="font2">(પિનકોડ)</span></div>
                                                        <div>{memberData.pincode || "N/A"}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Social Media Information Section */}
                                            <div className="col-12">
                                                <h4 className="border-bottom pb-2 text-danger">
                                                    Social Media Information <span className="font2">(સોશિયલ મીડિયા માહિતી)</span>
                                                </h4>
                                                <div className="row g-3">
                                                    <div className="col-md-6">
                                                        <div className="fw-bold">WhatsApp Number <span className="font2">(વોટ્સએપ નંબર)</span></div>
                                                        <div>{memberData.whatsapp || "N/A"}</div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="fw-bold">Facebook URL <span className="font2">(ફેસબુક લિંક)</span></div>
                                                        <div>
                                                            {memberData.facebook ? (
                                                                <a href={memberData.facebook} target="_blank" rel="noopener noreferrer">
                                                                    {memberData.facebook}
                                                                </a>
                                                            ) : (
                                                                "N/A"
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="fw-bold">Twitter URL <span className="font2">(ટ્વિટર લિંક)</span></div>
                                                        <div>
                                                            {memberData.twitter ? (
                                                                <a href={memberData.twitter} target="_blank" rel="noopener noreferrer">
                                                                    {memberData.twitter}
                                                                </a>
                                                            ) : (
                                                                "N/A"
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="fw-bold"> Instagram URL <span className="font2">(ઇન્સ્ટાગ્રામ લિંક)</span></div>
                                                        <div>
                                                            {memberData.instagram ? (
                                                                <a href={memberData.instagram} target="_blank" rel="noopener noreferrer">
                                                                    {memberData.instagram}
                                                                </a>
                                                            ) : (
                                                                "N/A"
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="card-footer bg-light d-none d-md-flex justify-content-between text-center my-1 p-3 rounded">
                                <button className="btn btn-secondary mt-2 d-flex align-items-center" onClick={handleBack}>
                                    <ArrowLeft size={16} className="me-1" />
                                    Back to Form
                                </button>
                                <div className="d-flex text-center">
                                    <button
                                        className="btn btn-primary mx-2 mt-2 d-flex align-items-center edit"
                                        onClick={() => router.push(`${LanguageRoute}dashboard/user-details`)}
                                    >
                                        <Edit size={16} className="me-1" />
                                        Edit Details
                                    </button>
                                </div>
                            </div>

                            <div className="card-footer bg-light d-md-none d-flex flex-column flex-md-row justify-content-between align-items-center text-center gap-2 my-1">
                                <button className="btn btn-secondary w-100 w-md-auto d-flex align-items-center justify-content-center" onClick={handleBack}>
                                    <ArrowLeft size={16} className="me-1" />
                                    Back to Form
                                </button>
                                <button className="btn btn-primary d-md-none w-100 d-flex align-items-center justify-content-center edit" onClick={() => router.push(`${LanguageRoute}dashboard/user-details`)}>
                                    <Edit size={16} className="me-1" />
                                    Edit Details
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* Share Modal */}
                {showShareModal && (
                    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header bg-danger text-white">
                                    <h5 className="modal-title">Share Member Profile</h5>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        onClick={toggleShareModal}
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <p className="text-center mb-4">Share {memberData.name}&apos;s profile via:</p>
                                    <div className="d-flex justify-content-center flex-wrap gap-3">
                                        <FacebookShareButton url={shareUrl} quote={shareTitle}>
                                            <FacebookIcon size={48} round />
                                        </FacebookShareButton>

                                        <TwitterShareButton url={shareUrl} title={shareTitle}>
                                            <TwitterIcon size={48} round />
                                        </TwitterShareButton>

                                        <WhatsappShareButton url={shareUrl} title={shareTitle} separator=" ">
                                            <WhatsappIcon size={48} round />
                                        </WhatsappShareButton>

                                        <TelegramShareButton url={shareUrl} title={shareTitle}>
                                            <TelegramIcon size={48} round />
                                        </TelegramShareButton>

                                        <LinkedinShareButton url={shareUrl}>
                                            <LinkedinIcon size={48} round />
                                        </LinkedinShareButton>

                                        <EmailShareButton url={shareUrl} subject={shareTitle} body={shareTitle}>
                                            <EmailIcon size={48} round />
                                        </EmailShareButton>
                                    </div>

                                    <div className="mt-4">
                                        <p className="text-center mb-2">Or copy the link:</p>
                                        <div className="input-group">
                                            <input type="text" className="form-control" value={shareUrl} readOnly />
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(shareUrl);
                                                    alert("Link copied to clipboard!");
                                                }}
                                            >
                                                Copy
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={toggleShareModal}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}