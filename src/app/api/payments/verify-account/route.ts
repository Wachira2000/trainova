import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const accountNumber = searchParams.get('account_number');
  const bankCode = searchParams.get('bank_code');

  if (!accountNumber || !bankCode) {
    return NextResponse.json({ status: false, message: 'Account number and bank code are required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = await response.json();

    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ status: false, message: 'An error occurred while verifying the account.' }, { status: 500 });
  }
}
