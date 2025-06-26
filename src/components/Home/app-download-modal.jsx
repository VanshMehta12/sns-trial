"use client"

import { useState, useEffect } from "react"
import "@/app/styles/Events.module.css"

export default function AppDownloadModal({ isOpen, onClose, title = "Get the full experience" }) {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isCloseHovered, setIsCloseHovered] = useState(false)
  const [isAndroidHovered, setIsAndroidHovered] = useState(false)
  const [isIosHovered, setIsIosHovered] = useState(false)
  const [isContinueHovered, setIsContinueHovered] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    }
  }, [isOpen])

  if (!isMounted) return null

  if (!isOpen) return null

  // Inline styles
  const styles = {
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      backdropFilter: "blur(8px)",
      padding: "1rem",
      opacity: isVisible ? 1 : 0,
      transition: "opacity 0.3s ease-out",
    },
    modalContainer: {
      position: "relative",
      width: "500px",
      maxWidth: "500px",
      background: "linear-gradient(145deg, #ffffff, #f5f7fa)",
      borderRadius: "16px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 10px 20px -5px rgba(0, 0, 0, 0.2)",
      overflow: "hidden",
      transform: isVisible ? "translateY(0)" : "translateY(50px)",
      transition: "transform 0.4s ease-out, opacity 0.4s ease-out",
      border: "1px solid rgba(255, 255, 255, 0.8)",
      opacity: isVisible ? 1 : 0,
    },
    modalClose: {
      position: "absolute",
      top: "16px",
      right: "16px",
      background: "rgba(255, 255, 255, 0.2)",
      border: "none",
      borderRadius: "50%",
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "#444",
      transition: "all 0.2s ease",
      zIndex: 10,
      fontSize: "18px",
      fontWeight: "bold",
    },
    modalContent: {
      padding: "2.5rem 2rem",
      fontFamily: "'Poppins', sans-serif",
    },
    modalHeader: {
      textAlign: "center",
      marginBottom: "1.5rem",
      position: "relative",
    },
    modalTitle: {
      fontSize: "1.75rem",
      fontWeight: 700,
      color: "#1a1a1a",
      marginBottom: "0.75rem",
      letterSpacing: "-0.5px",
    },
    titleUnderline: {
      height: "4px",
      width: "60px",
      background: "linear-gradient(90deg, #ff6b6b, #ff8e53)",
      margin: "0 auto",
      borderRadius: "2px",
    },
    modalMessage: {
      textAlign: "center",
      marginBottom: "2rem",
      color: "#555",
      fontSize: "1.1rem",
      lineHeight: 1.6,
      padding: "0 0.5rem",
    },
    appButtons: {
      display: "flex",
      flexDirection: window.innerWidth < 480 ? "column" : "row",
      gap: "1rem",
      justifyContent: "center",
      marginBottom: "1.5rem",
      marginTop: "1.5rem",
    },
    appButtonAndroid: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.75rem 1.25rem",
      borderRadius: "12px",
      textDecoration: "none",
      fontWeight: 500,
      transition: "all 0.3s ease",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      background: "white", // Changed to white background
      color: "black", // Changed to black text
      border: "1px solid #ddd", // Added border for better definition
    },
    appButtonIos: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.75rem 1.25rem",
      borderRadius: "12px",
      textDecoration: "none",
      fontWeight: 500,
      transition: "all 0.3s ease",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      background: "black", // Kept black background
      color: "white", // Kept white text
    },
    appButtonContent: {
      display: "flex",
      alignItems: "center",
    },
    appIcon: {
      width: "2rem",
      height: "2rem",
      marginRight: "0.75rem",
      filter: "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2))",
    },
    buttonText: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      lineHeight: 1.2,
    },
    getText: {
      fontSize: "0.7rem",
      opacity: 0.9,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    storeText: {
      fontSize: "1.1rem",
      fontWeight: 600,
    },
    modalFooter: {
      textAlign: "center",
      marginTop: "1rem",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      margin: "1rem 0",
    },
    dividerSpan: {
      padding: "0 1rem",
      color: "#888",
      fontSize: "0.9rem",
    },
    dividerBefore: {
      content: '""',
      flex: 1,
      borderBottom: "1px solid #ddd",
    },
    continueButton: {
      background: "none",
      border: "1px solid #ddd",
      color: "#555",
      cursor: "pointer",
      fontSize: "0.95rem",
      padding: "0.5rem 1.5rem",
      borderRadius: "20px",
      transition: "all 0.2s ease",
      fontWeight: 500,
      marginTop: "0.5rem",
    },
  }

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContainer}>
        {/* <button
          onClick={onClose}
          style={{
            ...styles.modalClose,
            ...(isCloseHovered
              ? {
                  background: "rgba(255, 255, 255, 0.9)",
                  color: "#000",
                  transform: "rotate(90deg)",
                }
              : {}),
          }}
          onMouseEnter={() => setIsCloseHovered(true)}
          onMouseLeave={() => setIsCloseHovered(false)}
        >
          x
        </button> */}

        <div style={styles.modalContent}>
          <div style={styles.modalHeader}>
            <h3 style={styles.modalTitle}>{title}</h3>
            <div style={styles.titleUnderline}></div>
          </div>

          <p style={styles.modalMessage}>Download our app to view this event and discover more events near you!</p>

          <div style={styles.appButtons}>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...styles.appButtonAndroid,
                ...(isAndroidHovered
                  ? {
                      transform: "translateY(-3px)",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
                    }
                  : {}),
              }}
              onMouseEnter={() => setIsAndroidHovered(true)}
              onMouseLeave={() => setIsAndroidHovered(false)}
            >
              <div style={styles.appButtonContent}>
                <svg viewBox="0 0 24 24" style={{ ...styles.appIcon, color: "black" }} fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.535-3.882l-3.068 1.781-2.674-2.675 2.673-2.674 3.069 1.781a.999.999 0 0 1 0 1.787zM5.904 2.735L16.891 9.07l-2.302 2.301-8.685-8.636z" />
                </svg>
                <div style={styles.buttonText}>
                  <span style={{ ...styles.getText, color: "black" }}>GET IT ON</span>
                  <span style={{ ...styles.storeText, color: "black" }}>Google Play</span>
                </div>
              </div>
            </a>

            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...styles.appButtonIos,
                ...(isIosHovered
                  ? {
                      transform: "translateY(-3px)",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
                    }
                  : {}),
              }}
              onMouseEnter={() => setIsIosHovered(true)}
              onMouseLeave={() => setIsIosHovered(false)}
            >
              <div style={styles.appButtonContent}>
                <svg viewBox="0 0 24 24" style={{ ...styles.appIcon, color: "white" }} fill="currentColor">
                  <path d="M16.462 8.293a4.068 4.068 0 0 0-3.073-1.596c-1.307 0-2.342.794-3.038.794-.72 0-1.822-.768-3.003-.768-1.552 0-3.177 1.283-3.177 3.712 0 2.199 1.023 4.543 2.291 6.032 1.203 1.412 2.211 2.384 3.52 2.384.9 0 1.59-.519 2.698-.519 1.107 0 1.699.519 2.869.519 1.193 0 2.177-.937 3.304-2.283 1.027-1.231 1.438-2.429 1.465-2.494-.035-.012-2.811-1.177-2.811-4.27 0-2.731 2.064-3.996 2.159-4.06-.473-1.053-2.11-2.399-3.203-2.399l-.001-.052zm-3.113-2.428c.781-.887 1.3-2.114 1.3-3.348 0-.173-.013-.345-.039-.517-1.242.052-2.738.887-3.631 1.973-.7.8-1.346 2.039-1.346 3.287 0 .19.026.38.039.444.065.013.169.026.273.026 1.126 0 2.539-.834 3.404-1.865z" />
                </svg>
                <div style={styles.buttonText}>
                  <span style={{ ...styles.getText, color: "white" }}>Download on the</span>
                  <span style={{ ...styles.storeText, color: "white" }}>App Store</span>
                </div>
              </div>
            </a>
          </div>

          <div style={styles.modalFooter}>
            <div style={styles.divider}>
              <div style={styles.dividerBefore}></div>
              <span style={styles.dividerSpan}>or</span>
              <div style={styles.dividerBefore}></div>
            </div>
            <button
              onClick={onClose}
              style={{
                ...styles.continueButton,
                ...(isContinueHovered
                  ? {
                      backgroundColor: "#f5f5f5",
                      color: "#333",
                      borderColor: "#ccc",
                    }
                  : {}),
              }}
              onMouseEnter={() => setIsContinueHovered(true)}
              onMouseLeave={() => setIsContinueHovered(false)}
            >
              Continue browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
