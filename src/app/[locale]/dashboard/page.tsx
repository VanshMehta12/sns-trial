'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faShare } from '@fortawesome/free-solid-svg-icons';
import { Card2 } from '@/components/IdCard2';
import "@/styles/styles.css"
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import SubHeader from '@/components/SubHeader';

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
    EmailIcon
} from 'next-share';
import { downloadElementAsImage } from '@/utils/download-card';


const DashboardPage: React.FC = () => {
    // const [utoken, setUtoken] = useState("");
    // const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [LanguageRoute, setLanguageRoute] = useState("")

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
        refer_code: "",
        referCount: "",
        donation: ""
    });


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
            fetchMemberData()
        }
    }, [isAuthenticated, LanguageRoute, router, pathname])

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


    const capitalizeFirstLetter = (string: string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        const [year, month, day] = dateString.split("-"); // Assuming the input format is "yyyy-mm-dd"
        return `${day}-${month}-${year}`;
    };

    const fetchMemberData = async () => {
        try {
            const token = sessionStorage.getItem("auth_token");
            if (token) {
                // setUtoken(token)
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
                        refer_code: data.refer_code || "",
                        referCount: data.refer_count,
                        donation: data.total_donation
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching member data:", error);
        } finally {
            // setLoading(false);
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

    const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/join?refer_code=${memberData.refer_code}` : "${window.location.origin}/join";
    const shareTitle = `નમસ્તે, હું પ્રજા શક્તિ ડેમોક્રેટિક પાર્ટીનો સભ્ય બન્યો છું. તમે પણ મારી રેફરલ લિંકનો ઉપયોગ કરીને પાર્ટીમાં જોડાઈ શકો છો:`

    return (
        <>
            <SubHeader />
            <div className="container-fluid p-4 bg-white container" style={{ minHeight: '100vh' }}>
                <div className="row mb-3">
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <h2 className="text-dark font1">DASHBOARD</h2>
                        <div className="d-flex align-items-center">
                            <div className="me-3 text-end">
                                <small className="d-block text-muted">{memberData.name}</small>
                                <small className="d-block text-muted">{memberData.mobile}</small>
                                {/* <small className="d-block text-muted">Complete Your Profile 20%</small> */}
                            </div>
                            <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                                style={{ width: '50px', height: '50px' }}>
                                <i className="fas fa-user"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                        <div className="card h-100 shadow-sm rounded-4 py-2" style={{
                            // background: 'linear-gradient(to right,rgba(255, 0, 0,0.3),rgb(255, 94, 0,0.3))',
                            // color: 'white',
                            // border: "1px solid rgb(211, 211, 211)"
                        }}>
                            <div className="card-body d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <h5 className="card-title">Make Contribution</h5>
                                    <p className="card-text">By Giving Donation</p>
                                </div>
                                <button className="btn btn-danger">CLICK HERE</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="card h-100 shadow-sm rounded-4 py-2" style={{
                            // background: 'linear-gradient(to right,rgb(255, 0, 0),rgb(255, 94, 0))',
                            // background: 'linear-gradient(90deg,rgb(49, 255, 8) 0%,rgb(255, 102, 63) 40.5%,rgb(255, 238, 0) 78.4%,rgb(255, 255, 255) 100%)'

                            // color: 'white'
                        }}>
                            <div className="card-body d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <h5 className="card-title">Download Payment</h5>
                                    <p className="card-text">Receipt</p>
                                </div>
                                <button className="btn btn-danger">CLICK HERE</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="card h-100 shadow-sm" style={{ zIndex: 100 }}>
                            <div className="card-body">
                                <h5 className="card-title mb-3">Membership Card</h5>
                                <Card2 formData={memberData} />
                                <div className="d-flex justify-content-between mt-3">
                                    <button className="btn btn-outline-secondary me-2">
                                        <FontAwesomeIcon icon={faShare} className="me-2" />
                                        Share
                                    </button>
                                    <button className="btn btn-danger" onClick={downloadCard2}>
                                        <FontAwesomeIcon icon={faDownload} className="me-2" />
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <div className="card shadow-lg h-100">
                            <div className="card-body">
                                <h5 className="card-title mb-3">Share Member Profile</h5>
                                <div className='mt-5 pt-2'>
                                    <p className="text-center mb-4">Share {memberData.name}&apos;s profile via:</p>
                                    <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
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
                                </div>
                                <div className='mt-5 pt-2'>
                                    <p className="text-center">Or copy the link:</p>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control border"
                                            value={shareUrl}
                                            readOnly
                                        />
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
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-4 mb-3">
                        <div className="card h-100 text-white" style={{ background: 'linear-gradient(to right, #00bcd4, #03a9f4)' }}>
                            <div className="card-body text-center">
                                <h3 className="card-title">{memberData.referCount}</h3>
                                <p className="card-text">People Joined via Your Referral Code</p>
                                <a href="#" className="text-white"><small>List of people joined via your referral code</small></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card h-100 text-white" style={{ background: 'linear-gradient(to right, #e91e63, #f06292)' }}>
                            <div className="card-body text-center">
                                <h3 className="card-title">₹{memberData.donation}</h3>
                                <p className="card-text">Total Donation</p>
                                <a href={`membership-donation`} className="text-white "><small>List of donations done by you</small></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card h-100 text-white" style={{ background: 'linear-gradient(to right, #9c27b0, #ba68c8)' }}>
                            <div className="card-body text-center">
                                <h3 className="card-title">5</h3>
                                <p className="card-text">Days Remaining</p>
                                <a href="#" className="text-white "><small>Upcoming Events</small></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default DashboardPage;