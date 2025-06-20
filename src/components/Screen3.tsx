import type React from "react";
import { usePhoneNumber } from "@/context/PhoneNumberContext";
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

interface Screen3Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function Screen3({ formData, updateFormData, onNext, onPrevious }: Screen3Props) {
  const { phoneNumber } = usePhoneNumber(); // Get phone number from context

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  function updateStep3Data() {
    const formdata = new FormData();
    formdata.append("step3", "1");
    formdata.append("facebook_url", formData.facebook || "");
    formdata.append("twitter_url", formData.twitter || "");
    formdata.append("instagram_url", formData.instagram || "");
    formdata.append("whatsapp_number", formData.whatsapp || phoneNumber || "");

    const token = sessionStorage.getItem("auth_token");

    fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}updateprofile`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` },
      body: formdata,
    })
      .then(res => res.json())
      .then(data => console.log("Step 3 data updated successfully", data))
      .catch(error => console.error("Error updating Step 2 data:", error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="mb-4">Social Media Information</h4>

      <div className="mb-3">
        <label htmlFor="whatsapp" className="form-label">
          WhatsApp Number <span className="font2">(વોટ્સએપ નંબર)</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="whatsapp"
          value={formData.whatsapp || phoneNumber} // Prefill with phone number
          onChange={(e) => updateFormData({ whatsapp: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="facebook" className="form-label">
          Facebook URL <span className="font2">(ફેસબુક લિંક)</span>
        </label>
        <input
          type="url"
          className="form-control"
          id="facebook"
          value={formData.facebook}
          onChange={(e) => updateFormData({ facebook: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="twitter" className="form-label">
          Twitter URL <span className="font2">(ટ્વિટર લિંક)</span>
        </label>
        <input
          type="url"
          className="form-control"
          id="twitter"
          value={formData.twitter}
          onChange={(e) => updateFormData({ twitter: e.target.value })}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="instagram" className="form-label">
          Instagram URL <span className="font2">(ઇન્સ્ટાગ્રામ લિંક)</span>
        </label>
        <input
          type="url"
          className="form-control"
          id="instagram"
          value={formData.instagram}
          onChange={(e) => updateFormData({ instagram: e.target.value })}
        />
      </div>

      <div className="d-md-flex justify-content-between text-center">
        <button type="button" className="btn btn-secondary mt-2 px-5 px-md-3" onClick={onPrevious}>
          Previous<span className="font2"> (પાછા જાઓ)</span>
        </button>
        <button type="submit" className="btn btn-danger mt-2 px-5 px-md-3" onClick={updateStep3Data}>
          Submit <span className="font2">(સબમિટ કરો)</span>
        </button>
      </div>
    </form>
  );
}
