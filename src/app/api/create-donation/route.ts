// app/api/create-donation/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      order_amount, 
      customer_id, 
      customer_name, 
      customer_email,
      customer_phone 
    } = body;

    if (!order_amount) {
      return NextResponse.json({ error: 'Order amount is required' }, { status: 400 });
    }
    
    // Generate a unique order ID that we'll use for the redirect URL
    const temporaryOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("X-Client-Id", process.env.NEXT_PUBLIC_CLIENT_ID || "");
    myHeaders.append("X-Client-Secret", process.env.NEXT_PUBLIC_CLIENT_SECRET || "");
    myHeaders.append("x-api-version", "2023-08-01");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      order_amount: order_amount,
      order_currency: "INR",
      customer_details: {
        customer_id: customer_id || "guest_user",
        customer_name: customer_name || "",
        customer_email: customer_email || "",
        customer_phone: customer_phone || "",
      },
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/en/donation?order=${temporaryOrderId}`,
      order_meta: {
        notify_url: "https://webhook.site/58b2f225-173c-42da-ae59-fcc3b17858ce",
      },
    });

    const response = await fetch("https://sandbox.cashfree.com/pg/orders", {
      method: "POST",
      headers: myHeaders,
      body: raw,
    });

    const responseData = await response.json();
    
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error creating donation:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}