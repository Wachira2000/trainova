import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, amount } = await req.json();

    if (!email || !amount) {
      return NextResponse.json({ message: 'Email and amount are required' }, { status: 400 });
    }

    const paystackUrl = 'https://api.paystack.co/transaction/initialize';
    const secretKey = process.env.PAYSTACK_SECRET_KEY!;

    const response = await fetch(paystackUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Paystack expects amount in kobo
        callback_url: `${req.nextUrl.origin}/opportunities`, // Redirect back to the opportunities page
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Paystack API Error:', data);
      return NextResponse.json({ message: 'Error initializing payment', error: data.message }, { status: response.status });
    }

    return NextResponse.json(data.data);

  } catch (error) {
    console.error('Error initializing Paystack payment:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Error initializing payment', error: errorMessage }, { status: 500 });
  }
}