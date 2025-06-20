"use client";
import { useEffect } from "react";

export default function Loader2() {
  useEffect(() => {
    let progress = 0;
    const progressBarElement = document.getElementById("progress-bar") as HTMLElement | null;
    const pageLoaderElement = document.getElementById("page-loader") as HTMLElement | null;
    const contentElement = document.getElementById("content") as HTMLElement | null;
    const loadingElement = document.getElementById("loading") as HTMLElement | null;

    const interval = setInterval(() => {
      progress += 10;
      if (progressBarElement) progressBarElement.style.width = progress + "%";

      if (progress >= 100) {
        clearInterval(interval);
        if (loadingElement) loadingElement.style.display = "none";
        if (contentElement) contentElement.style.display = "block";
      }
    }, 100);

    // Function to show loader on navigation
    function showPageLoader() {
      if (pageLoaderElement) {
        pageLoaderElement.style.display = "block";
        setTimeout(() => {
          pageLoaderElement.style.display = "none";
        }, 500);
      }
    }

    // Listen for Next.js route changes
    const originalPushState = history.pushState;
    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      showPageLoader();
    };

    window.addEventListener("popstate", showPageLoader);

    return () => {
      window.removeEventListener("popstate", showPageLoader);
    };
  }, []);

  return (
    <>
      <div id="loading" className="progress-container">
        <div id="progress-bar" className="progress-bar"></div>
      </div>
      <div id="page-loader" className="page-loader"></div>
    </>
  );
}