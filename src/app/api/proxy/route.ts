import { NextResponse } from "next/server"

export async function POST() {
  try {
    console.log("Fetching from external API...")

    const response = await fetch(`${process.env.NEXT_PUBLIC_REFERRED_MEMBERS_API_URL}MakeDonation`, {
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      console.error("API Error:", response.status, response.statusText)
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    console.log("API response received successfully")

    return NextResponse.json(data)
  } catch (error) {
    console.error("Proxy error:", error)
    return NextResponse.json({ error: "Failed to fetch data from API" }, { status: 500 })
  }
}
