"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import { cashfree } from "@/utils/cashfree"
import { useSearchParams } from "next/navigation"

export interface Cashfree {
  checkout: (options: CheckoutOptions) => Promise<CheckoutResult>
}

export interface CheckoutOptions {
  paymentSessionId: string
  returnUrl: string
}

export interface CheckoutResult {
  error?: {
    message: string
  }
  redirect?: boolean
  paymentDetails?: {
    paymentMessage: string
  }
}

export default function DonationPage() {
  const [memberData, setMemberData] = useState({
    name: "",
    mobile: "",
    userID: "",
    email: ""
  });
  const [donationAmount, setDonationAmount] = useState<string>("")
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("");
  const [number, setNumber] = useState("")
  const [sessionID, setsessionID] = useState("")
  const [orderID, setorderID] = useState("")
  const [PaymentStatus, setPaymentStatus] = useState("")
  const searchParams = useSearchParams()

  const [PaymentResponse, setPaymentResponse] = useState("")
  const [PaymentResponseArray, setPaymentResponseArray] = useState("");
  const userId = `${memberData.userID}`;

  const handleAmountSelect = (amount: number) => {
    setDonationAmount(amount.toString())
    setSelectedAmount(amount)
  }

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const token = sessionStorage.getItem("auth_token");
        const storedUserData = localStorage.getItem("userData");

        if (storedUserData) {
          // If user data exists in localStorage, use it
          const parsedUserData = JSON.parse(storedUserData);
          setMemberData(parsedUserData);

          // Also populate other form fields
          setName(parsedUserData.name || "")
          setEmail(parsedUserData.email || "")
          setNumber(parsedUserData.mobile || "")
        }

        if (token) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}GetProfile`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const dt = await response.json();
            const data = dt.data;
            const userData = {
              name: data.name || "",
              mobile: data.mobile || "",
              userID: data.id || "",
              email: data.email || "",
            };

            // Update state
            setMemberData(userData);

            // Populate form fields
            setName(userData.name)
            setEmail(userData.email)
            setNumber(userData.mobile)

            // Save to localStorage
            localStorage.setItem("userData", JSON.stringify(userData));
          }
        }
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };
    fetchMemberData();
  }, [])

  useEffect(() => {
    // Check session storage for existing donation data
    const storedData = sessionStorage.getItem("donationDetails")
    if (storedData) {
      const { name, email, number, amount, selectedAmount, PaymentResponse } = JSON.parse(storedData)
      setName(name)
      setEmail(email)
      setNumber(number)
      setDonationAmount(amount)
      setSelectedAmount(selectedAmount)
      setPaymentResponse(PaymentResponse)
    }
  }, [])

  function storeDonationDetails() {
    const donationDetails = {
      name,
      email,
      number,
      amount: donationAmount,
      selectedAmount,
      PaymentResponse,
    }
    sessionStorage.setItem("donationDetails", JSON.stringify(donationDetails))
  }

  useEffect(() => {
    storeDonationDetails()
  }, [name, email, number, donationAmount, selectedAmount])

  useEffect(() => {
    const initialorderid = searchParams.get("order")
    if (initialorderid && initialorderid !== "" && orderID !== initialorderid) {
      setorderID(initialorderid)
      VerificationPayment(initialorderid)
    }
  }, [searchParams, orderID])


  useEffect(() => {
    if (PaymentStatus === "SUCCESS") {
      setPaymentResponse("200")
    }
    else if (PaymentResponse === "FAILED") {
      setPaymentResponse("400")
    }
    else {
      setPaymentResponse("404")
    }
  }, [PaymentStatus])

  useEffect(() => {
    if (PaymentResponse === "200" || PaymentResponse === "400") {
      Donation2()
    }
  }, [PaymentResponse])

  function Donation2() {
    console.log("====================================")
    console.log(name, number, email, donationAmount, PaymentResponse, PaymentStatus, orderID, userId)
    console.log("====================================")
    console.log('====================================');
    console.log(PaymentResponseArray);
    console.log('====================================');
    console.log("Donation2 function called with PaymentResponse:", PaymentResponse)
    const formdata = new FormData()
    formdata.append("user_id", userId);
    formdata.append("name", name || "")
    formdata.append("mobile", number || "")
    formdata.append("email", email || "")
    formdata.append("amount", donationAmount || "")
    formdata.append("status_code", PaymentResponse || "400")
    formdata.append("status", PaymentStatus || "")
    formdata.append("order_id", orderID || "")

    if (PaymentResponseArray !== "") {
      formdata.append("payment_response", PaymentResponseArray || "")
    }

    fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}MakeDonation`, {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => console.log("Donation Done successfully", data))
      .catch((error) => console.error("Error Donation data:", error))
  }

  const Donation = async () => {
    try {
      const response = await fetch("/api/create-donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          order_amount: donationAmount,
          customer_id: userId,
          customer_name: name,
          customer_email: email,
          customer_phone: number
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Donation created successfully", responseData);

      if (responseData?.payment_session_id && responseData?.order_id) {
        const s_id = responseData.payment_session_id;
        const o_id = responseData.order_id;
        setsessionID(s_id);
        setorderID(o_id);
      } else {
        console.error("Error: Payment Session ID not found");
      }
    } catch (error) {
      console.error("Error creating donation:", error);
    }
  };

  async function VerificationPayment(orderID: string) {
    try {
      const response = await fetch(`/api/verify-payment?orderId=${orderID}`);

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        setPaymentResponse("404");
        return false;
      }

      const responseData = await response.json();
      console.log("Payment verification response:", JSON.stringify(responseData));

      if (responseData) {
        const paymentInfo = responseData[0]; // Access the first payment object
        if (paymentInfo && paymentInfo.payment_status) {
          setPaymentResponseArray(JSON.stringify(responseData));
          const paymentstatus = paymentInfo.payment_status;
          setPaymentStatus(paymentstatus);

          if (paymentstatus === "SUCCESS") {
            console.log("Payment is successful");
            setPaymentResponse("200");
          } else {
            console.log(`Payment status: ${paymentstatus}`);
            setPaymentResponse("400");
          }
        } else {
          console.error("Unexpected response structure", responseData);
          setPaymentResponse("404");
          return false;
        }
      } else {
        console.error("No payment data received");
        setPaymentResponse("404");
        return false;
      }
    } catch (error) {
      console.error("Error in payment verification request:", error);
      setPaymentResponse("404");
      return false;
    }
  }

  useEffect(() => {
    if (sessionID !== "" && orderID !== "") {
      console.log("Payment Session ID:", sessionID)
      console.log("Payment Order ID:", orderID)
      handlePayment()
    }
  }, [sessionID])

  const handlePayment = (): void => {
    const checkoutOptions: {
      paymentSessionId: string
      returnUrl: string
    } = {
      paymentSessionId: sessionID,
      returnUrl: `${window.location.origin}/en/donation/?order=${orderID}`
    }
    cashfree.checkout(checkoutOptions).then((result: CheckoutResult) => {
      if (result.error) {
        alert(result.error.message)
      }
      if (result.redirect) {
        console.log("Redirection")
      }
      if (result.paymentDetails) {
        debugger
        console.log("Payment successful:", result.paymentDetails.paymentMessage)
      }
    })
  }

  return (
    <>
      {PaymentResponse === "200" && (
        <>
          <div className="d-flex text-center justify-content-center" style={{ margin: "100px" }}>
            <div className="alert alert-success w-50">
              <h1 className="display-1 fw-bold">ThankYou</h1>
              <p className="fs-3 text-success">Payment Successful</p>
            </div>
          </div>
        </>
      )}
      {PaymentResponse === "" || PaymentResponse === "404" && (
        <>
          <div className="donation-container d-none d-md-flex">
            <div className="background-image-container">
              <Image
                src="/assets/img/donation.jpg"
                alt="Political rally background"
                fill
                className="background-image"
                priority
              />
            </div>

            <div className="donation-form-container">
              <div className="donation-form">
                <h3 className="text-center mb-2 font1 primary_color">Make A Donation</h3>
                <p className="small text-center mb-4">Amount to be paid from your card will be in Indian Rupees</p>

                <div className="mb-3 d-flex justify-content-around align-content-center">
                  <label htmlFor="donationAmount" className="form-label fs-3">
                    Donate
                  </label>
                  <div className="mb-3 d-flex">
                    <span className="me-3 fs-2">₹</span>
                    <input
                      type="text"
                      className="form-control me-5 border border-2 text-center"
                      style={{ borderRadius: "15px" }}
                      id="donationAmount"
                      value={donationAmount}
                      onChange={(e) => {
                        setDonationAmount(e.target.value)
                        setSelectedAmount(null)
                      }}
                    />
                  </div>
                </div>

                <div className="amount-buttons mb-5 mx-3">
                  <button
                    type="button"
                    className={`amount-button ${selectedAmount === 100 ? "selected" : ""}`}
                    style={{ borderRadius: "15px" }}
                    onClick={() => handleAmountSelect(100)}
                  >
                    ₹ 100
                  </button>
                  <button
                    type="button"
                    className={`amount-button ${selectedAmount === 500 ? "selected" : ""}`}
                    style={{ borderRadius: "15px" }}
                    onClick={() => handleAmountSelect(500)}
                  >
                    ₹ 500
                  </button>
                  <button
                    type="button"
                    className={`amount-button ${selectedAmount === 1000 ? "selected" : ""}`}
                    style={{ borderRadius: "15px" }}
                    onClick={() => handleAmountSelect(1000)}
                  >
                    ₹ 1,000
                  </button>
                  <button
                    type="button"
                    className={`amount-button ${selectedAmount === 5000 ? "selected" : ""}`}
                    style={{ borderRadius: "15px" }}
                    onClick={() => handleAmountSelect(5000)}
                  >
                    ₹ 5,000
                  </button>
                  <button
                    type="button"
                    className={`amount-button ${selectedAmount === 10000 ? "selected" : ""}`}
                    style={{ borderRadius: "15px" }}
                    onClick={() => handleAmountSelect(10000)}
                  >
                    ₹ 10,000
                  </button>
                </div>

                <h5 className="mb-3">Personal Details</h5>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label text-secondary">
                    Name
                  </label>
                  {name === "" && <span className="text-danger ms-1">*</span>}
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    style={{ borderRadius: "15px" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label text-secondary">
                    Mobile No.
                  </label>
                  {number === "" && <span className="text-danger ms-1">*</span>}
                  <div className="input-group" style={{ position: "relative" }}>
                    <span
                      className="input-group-text country-code bg-white border-0"
                      style={{ position: "absolute", zIndex: 1000, top: "2%", borderRadius: "15px" }}
                    >
                      <Image className="" src="/assets/img/india.svg" alt="India flag" width={30} height={24} />
                      +91
                    </span>
                    <input
                      type="tel"
                      className="form-control"
                      style={{ paddingLeft: "95px", borderRadius: "15px" }}
                      id="mobile"
                      value={number}
                      onChange={(e) => {
                        setNumber(e.target.value)
                      }}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-secondary">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    style={{ borderRadius: "15px" }}
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <div className="form-check">
                    <input className="form-check-input border border-2" type="checkbox" id="termsCheck" defaultChecked />
                    <label className="form-check-label small" htmlFor="termsCheck">
                      I certify that donor-provided information is correct and these funds are not from prohibited
                      sources. Usage of false communication will be dealt as serious criminal offense.
                    </label>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="button" className="donate-button px-5 rounded-5" onClick={Donation}>
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Version (Similar to Desktop but with slight modifications) */}
          <div className="donation-container d-flex d-md-none">
            <div className="background-image-container">
              <Image
                src="/assets/img/donation.jpg"
                alt="Political rally background"
                fill
                className="background-image"
                priority
              />
            </div>

            <div className="donation-form-container">
              <div className="donation-form">
                <h3 className="text-center mb-2 font1 primary_color">Make A Donation</h3>
                <p className="small text-center mb-4">Amount to be paid from your card will be in Indian Rupees</p>

                <div className="mb-3 d-flex justify-content-around align-content-center">
                  <label htmlFor="donationAmount" className="form-label fs-3">
                    Donate
                  </label>
                  <div className="mb-3 d-flex">
                    <span className="me-3 fs-2 ms-5">₹</span>
                    <input
                      type="text"
                      className="form-control me-5 border border-2 text-center"
                      style={{ borderRadius: "15px" }}
                      id="donationAmount"
                      value={donationAmount}
                      onChange={(e) => {
                        setDonationAmount(e.target.value)
                        setSelectedAmount(null)
                      }}
                    />
                  </div>
                </div>

                <div className="amount-buttons mb-5">
                  <button
                    type="button"
                    className={`amount-button ${selectedAmount === 100 ? "selected" : ""}`}
                    style={{ borderRadius: "15px" }}
                    onClick={() => handleAmountSelect(100)}
                  >
                    ₹ 100
                  </button>
                  <button
                    type="button"
                    className={`amount-button ${selectedAmount === 500 ? "selected" : ""}`}
                    style={{ borderRadius: "15px" }}
                    onClick={() => handleAmountSelect(500)}
                  >
                    ₹ 500
                  </button>
                  <button
                    type="button"
                    className={`amount-button ${selectedAmount === 1000 ? "selected" : ""}`}
                    style={{ borderRadius: "15px" }}
                    onClick={() => handleAmountSelect(1000)}
                  >
                    ₹ 1,000
                  </button>
                  <button
                    type="button"
                    className={`amount-button ${selectedAmount === 5000 ? "selected" : ""}`}
                    style={{ borderRadius: "15px" }}
                    onClick={() => handleAmountSelect(5000)}
                  >
                    ₹ 5,000
                  </button>
                  <button
                    type="button"
                    className={`amount-button ${selectedAmount === 10000 ? "selected" : ""}`}
                    style={{ borderRadius: "15px" }}
                    onClick={() => handleAmountSelect(10000)}
                  >
                    ₹ 10,000
                  </button>
                </div>
                {/* <div className='amount-buttons d-block mb-3 text-center'>
                      <button
                          type="button"
                          className={`amount-button ${selectedAmount === 2000 ? 'selected' : ''} rounded-5 border border-2 px-5 other-button`}
                      >
                          Other
                      </button>
                  </div> */}
                <h5 className="mb-3">Personal Details</h5>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label text-secondary">
                    Name
                  </label>
                  {name === "" && <span className="text-danger ms-1">*</span>}
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    style={{ borderRadius: "15px" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label text-secondary">
                    Mobile No.
                  </label>
                  {number === "" && <span className="text-danger ms-1">*</span>}
                  <div className="input-group" style={{ position: "relative" }}>
                    <span
                      className="input-group-text country-code bg-white border-0"
                      style={{ position: "absolute", zIndex: 1000, top: "2%", borderRadius: "15px" }}
                    >
                      <Image className="" src="/assets/img/india.svg" alt="India flag" width={30} height={24} />
                      +91
                    </span>
                    <input
                      type="tel"
                      className="form-control"
                      style={{ paddingLeft: "95px", borderRadius: "15px" }}
                      id="mobile"
                      value={number}
                      onChange={(e) => {
                        setNumber(e.target.value)
                      }}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-secondary">
                    Email
                  </label>
                  {/* {email === "" && <span className="text-danger ms-1">*</span>} */}
                  <input
                    type="email"
                    className="form-control"
                    style={{ borderRadius: "15px" }}
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <div className="form-check">
                    <input className="form-check-input border border-2" type="checkbox" id="termsCheck" defaultChecked />
                    <label className="form-check-label small is-checked" htmlFor="termsCheck">
                      I certify that donor-provided information is correct and these funds are not from prohibited
                      sources. Usage of false communication will be dealt as serious criminal offense.
                    </label>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="donate-button px-5 rounded-5" onClick={Donation}>
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {PaymentResponse === "400" && (
        <>
          <div className="d-flex text-center justify-content-center" style={{ margin: "100px" }}>
            <div className="alert alert-danger w-50">
              <h1 className="display-1 fw-bold">Error</h1>
              <p className="fs-3 text-danger">Payment Declined</p>
            </div>
          </div>
        </>
      )}
    </>
  )
}