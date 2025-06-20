"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { usePhoneNumber } from "@/context/PhoneNumberContext";
import "@/styles/styles.css"

const JoinForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { phoneNumber, setPhoneNumber } = usePhoneNumber();
  const [referCode, setReferCode] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname(); // Get current path
  const [LanguageRoute, setLanguageRoute] = useState("")

  useEffect(() => {
    const token = sessionStorage.getItem("auth_token");
    if (token) {
      router.push(`${LanguageRoute}dashboard`);
      return;
    }
  })

  useEffect(() => {
    const lang = localStorage.getItem("language");
    if (lang) {
      setLanguageRoute(`/${lang}/`);
    }
  }, [pathname])


  useEffect(() => {
    const initialPhoneNumber = searchParams.get("phone");
    const initialReferCode = searchParams.get("refer_code");

    if (initialPhoneNumber && phoneNumber !== initialPhoneNumber) {
      setPhoneNumber(initialPhoneNumber);
    }

    if (initialReferCode && referCode !== initialReferCode) {
      setReferCode(initialReferCode);
    }
  }, [searchParams, phoneNumber, setPhoneNumber, referCode, router]);

  const isPhoneValid = phoneNumber.length === 10 && /^\d+$/.test(phoneNumber);

  const handleSubmit = async () => {
    if (!isPhoneValid || !isChecked) return;

    setLoading(true);
    try {
      const payload: Record<string, string> = { mobile: phoneNumber };
      if (referCode.trim()) {
        payload.refer_code = referCode.trim();
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}login_signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      if (data.tempId) {
        router.push(`/otp-verification?tempId=${data.tempId}`);
      } else {
        alert("Failed to get OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card shadow-sm p-4 rounded form-card">
        <div className="text-center">
          <img src="/assets/img/logo.svg" alt="Campaign Banner" className="img-fluid rounded" />
        </div>

        <h4 className="text-center mt-3 fw-bold font1">Welcome to</h4>
        <h4 className="text-center fw-bold font1">Praja Shakti Democratic Party</h4>

        <label className="mt-3">Enter your Mobile Number (તમારો મોબાઈલ નંબર દાખલ કરો)</label>
        <div className="input-group mt-2 border border-2 border-danger rounded">
          <span className="input-group-text">+91</span>
          <input
            type="tel"
            className="form-control"
            placeholder="Enter mobile number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="form-check mt-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="agreeCheck"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <label className="form-check-label" htmlFor="agreeCheck">
            I certify that the above-provided information is correct and there is no mistake.
            (હું પ્રમાણિત કરું છું કે ઉપર આપેલી માહિતી સાચી છે અને તેમાં કોઈ ભૂલ નથી.)
          </label>
        </div>

        <button
          className="btn btn-danger w-100 mt-3 fw-bold"
          disabled={!isPhoneValid || !isChecked || loading}
          onClick={handleSubmit}
        >
          {loading ? "Sending..." : "Get Verification Code ➜"}
        </button>
      </div>
    </div>
  );
};

export default JoinForm;
