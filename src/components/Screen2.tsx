import type React from "react"
import { useState } from "react"
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

interface Screen2Props {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onPrevious: () => void
}

export default function Screen2({ formData, updateFormData, onNext, onPrevious }: Screen2Props) {
  const [isFormValid, setIsFormValid] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // useEffect(() => {
  //   // Check i fields are filled in to validate the form
  //   const { dob } = formData
  //   setIsFormValid(!!(dob));
  // }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormValid(true)

    if (isFormValid) {
      const success = await updateStep2Data();
      if (success) {
        onNext(); // Proceed to the next step only if data updated successfully
      }
    }
  };

  const updateStep2Data = async () => {
    const formdata = new FormData();
    formdata.append("step2", "1");
    formdata.append("religion", formData.religion || "");
    formdata.append("dob", formData.dob || "");
    formdata.append("gender", formData.gender || "");
    formdata.append("caste", formData.caste || "");
    formdata.append("voterId", formData.voterId || "");
    formdata.append("email", formData.email || "");

    const token = sessionStorage.getItem("auth_token");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}updateprofile`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formdata,
      });

      if (!response.ok) {
        throw new Error('Failed to update data. Please try again.');
      }

      const data = await response.json();
      console.log("Step 2 data updated successfully", data);
      setError(null); // Clear any previous error
      return true; // Indicate success
    } catch (error) {
      console.error("Error updating Step 2 data:", error);
      // setError(error.message || 'An error occurred'); // Set error message
      return false; // Indicate failure
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Additional Details</h4>
        {/* <button
          type="button"
          className="btn btn-danger py-2"
          onClick={() => {
            updateStep2Data(); // Update data but don't navigate to the next step
            onSkipToThankYou();
          }}
        >
          Skip
        </button> */}
      </div>

      {/* Display error message if any */}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label htmlFor="dob" className="form-label">
          Date of Birth <span className="font2"> (જન્મ તારીખ)</span> 
          {/* {formData.dob === "" && <span className="text-danger ms-1">*</span>} */}
          </label>
        <input
          type="date"
          className="form-control"
          id="dob"
          value={formData.dob}
          onChange={(e) => updateFormData({ dob: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="religion" className="form-label">Religion <span className="font2">(ધર્મ)</span></label>
        <select
          id="religion"
          className="form-select"
          value={formData.religion}
          onChange={(e) => updateFormData({ religion: e.target.value })}
        >
          <option value="">Select Religion</option>
          <option value="hindu">Hindu</option>
          <option value="muslim">Muslim</option>
          <option value="christian">Christian</option>
          <option value="sikh">Sikh</option>
          <option value="buddhist">Buddhist</option>
          <option value="jain">Jain</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="caste" className="form-label">Caste <span className="font2">(જ્ઞાતિ)</span></label>
        <input
          type="text"
          className="form-control"
          id="caste"
          value={formData.caste}
          onChange={(e) => updateFormData({ caste: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="voterId" className="form-label">Voter ID <span className="font2">(વોટર આઇડી)</span></label>
        <input
          type="text"
          className="form-control"
          id="voterId"
          value={formData.voterId}
          onChange={(e) => updateFormData({ voterId: e.target.value })}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="email" className="form-label">Email ID <span className="font2">(ઈમેઇલ આઇડી)</span></label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
        />
      </div>

      <div className="d-md-flex justify-content-between text-center">
        <button type="button" className="btn btn-secondary mt-2 px-5 px-md-3" onClick={onPrevious}>
          Previous<span className="font2"> (પાછા જાઓ)</span>
        </button>
        <button type="submit" className="btn btn-danger mt-2 px-5 px-md-3" disabled={!isFormValid}>
          Next <span className="font2">(આગળ જાઓ)</span>
        </button>
      </div>
    </form>
  )
}