import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email } = await request.json();

  const allowedDomain = process.env.ALLOWED_EMAIL_DOMAIN;

  if (!allowedDomain) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

  if (email.endsWith(allowedDomain)) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: 'You do not have a Trainova Work email. Please complete your application.' }, { status: 400 });
  }
}
