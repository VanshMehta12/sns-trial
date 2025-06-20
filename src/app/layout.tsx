"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader2 from "@/components/Loader2";
import Loader from "@/components/Loader";
import { AuthProvider } from "@/context/AuthContext";
import { PhoneNumberProvider } from "@/context/PhoneNumberContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [pageLoading, setPageLoading] = useState(true);
  const [navLoading, setNavLoading] = useState(false);
  const pathname = usePathname(); // Detects route changes

  // Hide page loader after first load
  useEffect(() => {
    setTimeout(() => setPageLoading(false), 1000); // Simulate loading effect
  }, []);

  // Show navigation loader on route change
  useEffect(() => {
    setNavLoading(true);
    const timer = setTimeout(() => setNavLoading(false), 800); // Simulate loading delay
    return () => clearTimeout(timer); // Cleanup
  }, [pathname]); // Runs when the URL path changes

  return (
    <html lang="en">
      <head>
        <title>Praja Shakti Democratic Party</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Page Loader (Only on Full Refresh) */}
        {pageLoading && (
          <div id="page-loader">
            <Loader />
          </div>
        )}

        <AuthProvider>

          <Header />

          {/* Navigation Loader (Only on Page Navigation) */}
          {navLoading && (
            <div id="nav-loader">
              <Loader2 />
            </div>
          )}

          <div id="content" style={{ display: pageLoading ? "none" : "block" }}>
            <PhoneNumberProvider>{children}</PhoneNumberProvider>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html >
  );
}
