"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { usePhoneNumber } from "@/context/PhoneNumberContext";
import { useAuth } from "@/context/AuthContext";
import "@/styles/styles.css"

const OTPVerification = () => {
    const { phoneNumber } = usePhoneNumber();
    const { login } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const tempId = searchParams.get("tempId");

    // const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [otp, setOtp] = useState<string[]>(["1", "2", "3", "4", "5", "6"]);
    const [timer, setTimer] = useState<number>(90);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const pathname = usePathname(); // Get current path
    const [LanguageRoute, setLanguageRoute] = useState("")


    // useEffect(() => {
    //     const token = sessionStorage.getItem("auth_token");
    //     if (token) {
    //         router.push(`${LanguageRoute}dashboard/user-details`);
    //         return;
    //     }
    // })

    useEffect(() => {
        const lang = localStorage.getItem("language");
        if (lang) {
            setLanguageRoute(`/${lang}/`);
        }
    }, [pathname])

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputsRef.current[index + 1]?.focus();
        }

        setIsDisabled(newOtp.includes(""));
    };

    // const handleResend = async () => {
    //     if (!phoneNumber) {
    //         alert("Phone number is missing.");
    //         return;
    //     }

    //     setLoading(true);
    //     setTimer(90);
    //     setOtp(Array(6).fill(""));
    //     setIsDisabled(true);
    //     inputsRef.current[0]?.focus();

    //     try {
    //         const response = await fetch("https://admin.prajashakti.org/api/login_signup", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ mobile: phoneNumber, type: "resend-otp" }),
    //         });

    //         const data = await response.json();

    //         if (response.ok && data.tempId) {
    //             router.replace(`/otp-verification?tempId=${data.tempId}`);
    //         } else {
    //             alert(data.message || "Failed to get OTP. Please try again.");
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //         alert("Network error. Please check your connection.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleEditNumber = () => {
        router.push(`/join`);
    };

    const handleSubmit = async () => {
        if (isDisabled || !tempId) return;

        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}otp_validate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tempId: tempId, otp: otp.join("") }),
            });

            const data = await response.json();
            // console.log("API Response:", data); // Debugging

            if (data.token && data.user?.membershipId) {
                login(data.token);
                router.push(`${LanguageRoute}dashboard`);
            } else if (data.token) {
                login(data.token);
                router.push(`${LanguageRoute}dashboard/user-details`);
            } else {
                handleResponseMessage(data.message, data.token);
            }



        } catch (error) {
            console.error("Error:", error);
            alert("Network error. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    const handleResponseMessage = (message: string, token: string) => {
        switch (message) {
            case "user already exist.":
                // alert("User already exists. Please log in instead.");
                login(token);
                router.push(`${LanguageRoute}dashboard`);
                break;
            case "The verification otp has been expired.":
                alert("Your OTP has expired. Please request a new OTP.");
                break;
            default:
                alert("Invalid OTP. Please try again.");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-sm p-4 rounded form-card">
                <div className="text-center">
                    <img src="/assets/img/logo.svg" alt="Campaign Logo" className="img-fluid logo-img" />
                </div>

                <h4 className="text-center mt-3 fw-bold font1">Welcome to</h4>
                <h4 className="text-center fw-bold font1">Praja Shakti Democratic Party</h4>

                <label className="mt-3">Enter Verification Code (ચકાસણી કોડ દાખલ કરો)</label>
                <div className="input-group mt-2">
                    <span className="input-group-text">+91</span>
                    <input type="text" className="form-control" value={phoneNumber} disabled />
                    <button className="input-group-text btn btn-light" onClick={handleEditNumber}>
                        <i className="bi bi-pencil-fill"></i>
                    </button>
                </div>

                <div className="d-flex justify-content-between mt-3 otp-inputs">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="tel"
                            disabled
                            className="form-control text-center otp-box"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e)}
                            ref={(el) => {
                                inputsRef.current[index] = el;
                            }} />
                    ))}
                </div>

                {/* <div className="text-center mt-3">
                    {timer > 0 ? (
                        <span className="resend-text">
                            Resend Verification Code <span className="text-danger">0:{timer < 10 ? `0${timer}` : timer}</span>
                        </span>
                    ) : (
                        <button className="btn btn-link p-0" onClick={handleResend}>Resend Verification Code</button>
                    )}
                </div> */}

                <button className="btn btn-danger w-100 mt-3 fw-bold continue-btn"
                    disabled={isDisabled || loading}
                    onClick={handleSubmit}>
                    {loading ? "Verifying..." : "Continue ➜"}
                </button>
            </div>
        </div>
    );
};

export default OTPVerification;
