// app/api/verify-payment/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("X-Client-Id", process.env.NEXT_PUBLIC_CLIENT_ID || "");
    myHeaders.append("X-Client-Secret", process.env.NEXT_PUBLIC_CLIENT_SECRET || "");
    myHeaders.append("x-api-version", "2023-08-01");
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch(`https://sandbox.cashfree.com/pg/orders/${orderId}/payments`, {
      method: "GET",
      headers: myHeaders,
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Error from Cashfree API: ${response.statusText}` },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error in payment verification:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}