"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface CardProps {
  formData: {
    name: string;
    gender: string;
    dob?: string;
    state: string;
    membershipId: string;
    mobile: string;
    image_url?: string;
    qrcode?: string;
  };
}

export function Card({ formData }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false); // state to track image loading status

  const handleImageError = () => {
    setImageError(true); // set the error state to true
  };


  const formatName = (name: string) => {
    if (name.length <= 25) return name; // No need to modify

    const words = name.split(" ");
    let formattedName = "";
    let currentLine = "";

    for (const word of words) {
      if ((currentLine + " " + word).trim().length > 25) {
        formattedName += currentLine.trim() + "\n"; // Add a line break
        currentLine = word;
      } else {
        currentLine += " " + word;
      }
    }
    formattedName += currentLine.trim(); // Add remaining text
    return formattedName;
  };


  const textStyle = {
    lineHeight: "1.5",
    color: "#4A4A4A",
  };

  return (
    <div className="text-start">
      <div
        id="member-id-card"
        ref={cardRef}
        className="border-0 shadow-lg position-relative mx-auto"
        style={{
          maxWidth: "400px",
          aspectRatio: "1.6",
          overflow: "hidden",
          backgroundColor: "transparent",
        }}
      >
        <div className="position-relative w-100 h-100">
          <img
            src="/Card.png"
            alt="ID Card Background"
            sizes="(max-width: 768px) 100vw, 400px"
            className="card-img img-fluid"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Profile Image Overlay with error handling */}
        <div
          className="position-absolute rounded border border-0"
          style={{
            top: "52.5%",
            left: "-1%",
            width: "26.3%",
            height: "41%",
            zIndex: -100,
            overflow: "hidden",
            paddingLeft: "10px",
          }}
        >
          {imageError || !formData.image_url ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#D3D3D3", // Grey background
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                paddingBottom: "15px"
              }}
            >
              <img
                src="/assets/img/user.svg" // Fallback logo here
                alt="Profile Placeholder"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#D3D3D3", // Grey background
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                }} />
            </div>
          ) : (
            <Image
              src={`https://prajashakti.org/file.php?url=${formData.image_url}`}
              alt="Profile"
              fill
              sizes="100px"
              onError={handleImageError} // Handle image loading error
              style={{ borderRadius: "10px" }}
            // crossOrigin="anonymous"
            />
          )}
        </div>

        {/* Membership Info */}
        <div
          className="position-absolute"
          style={{ bottom: "37%", left: "46%", width: "70%", zIndex: 100 }}
        >
          <h6 className={`fw-bold m-0 text-gray ${(formData.name?.length || 0) > 15 ? "large" : "small"
            }`}
            style={{
              lineHeight: (formData.name?.length || 0) > 25 ? 1.1 : 1.6, // Adjust lineHeight dynamically
              color: "#4A4A4A",
              whiteSpace: "pre-line", // Preserves `\n` line breaks

            }}
          >
            {formatName(formData.name || "Member Name")}
          </h6>
        </div>

        <div
          className="position-absolute"
          style={{ bottom: "30.2%", left: "46%", width: "70%", zIndex: 100 }}
        >
          <p className="mb-0 fw-bold small text-gray" style={textStyle}>
            {formData.dob || "Not Available"}
          </p>
        </div>

        <div
          className="position-absolute"
          style={{ bottom: "23.5%", left: "46%", width: "70%", zIndex: 100 }}
        >
          <p className="mb-0 fw-bold small text-gray" style={textStyle}>
            {formData.mobile || "Not Available"}
          </p>
        </div>

        <div
          className="position-absolute"
          style={{ bottom: "16.9%", left: "46%", width: "70%", zIndex: 100 }}
        >
          <p className="mb-0 fw-bold small text-gray" style={textStyle}>
            {formData.membershipId || "Not Assigned"}
          </p>
        </div>

        {/* QR Code */}
        {formData.qrcode && (
          <div
            className="position-absolute border border-0"
            style={{
              top: "56.5%",
              right: "4.45%",
              width: "15%",
              height: "24%",
              zIndex: 100,
              overflow: "hidden",
              paddingLeft: "10px",
            }}
          >
            <Image
              src={`https://prajashakti.org/file.php?url=${formData.qrcode}`}
              alt="QR Code"
              fill
              sizes="80px"
            />
          </div>
        )}
      </div>
    </div>
  );
}