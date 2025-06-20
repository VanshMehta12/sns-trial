/**
 * Utility function to convert a DOM element to an image and download it
 * with all CSS styling preserved
 */
export const downloadElementAsImage = async (elementId: string, fileName: string) => {
  try {
    // Dynamically import html2canvas only on client side
    const html2canvas = (await import("html2canvas")).default

    // Find the element to capture
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`)
    }

    // Create a canvas from the element with high quality settings
    const canvas = await html2canvas(element, {
      scale: 3, // Higher scale for better quality (increased from 2 to 3)
      useCORS: true, // Enable CORS for images
      allowTaint: true, // Allow tainted canvas
      backgroundColor: null, // Transparent background
      logging: false,
      onclone: (documentClone: Document) => {
        // This function runs on the cloned document before rendering
        // We can use it to ensure all styles are applied
        const clonedElement = documentClone.getElementById(elementId)
        if (clonedElement) {
          // Ensure all computed styles are applied to the clone
          const originalStyles = window.getComputedStyle(element)
          Array.from(originalStyles).forEach((key) => {
            clonedElement.style.setProperty(key, originalStyles.getPropertyValue(key), "important")
          })
        }
      },
    })

    // Convert canvas to blob with high quality
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob as Blob)
        },
        "application/octet-stream",
        1.0,
      ) // Maximum quality
    })

    // Create download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = fileName

    // Trigger download
    document.body.appendChild(link)
    link.click()

    // Clean up
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    return true
  } catch (error) {
    console.error("Error downloading image:", error)
    return false
  }
}

