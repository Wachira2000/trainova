
import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: false,
  },
};

// This function will run in the background and not block the API response.
async function processApplicationInBackground(fields: { [key: string]: string }, files: { [key: string]: File }) {
    try {
        const {
            jobTitle, firstName, lastName, email, phone, certificateName,
            issuingOrganization, certificateNo, certificateUrl, educationLevel,
            country, state, availability, languages, weeklyHours,
        } = fields;

        const auth = await getGoogleAuth();
        const sheets = google.sheets({ version: 'v4', auth });

        // --- Prepare File Attachments for Nodemailer ---
        const attachments = [];
        for (const key in files) {
            const file = files[key];
            if (file) {
                attachments.push({
                    filename: file.name,
                    content: Buffer.from(await file.arrayBuffer()),
                    contentType: file.type,
                });
            }
        }

        // --- Append to Google Sheets ---
        const spreadsheetId = process.env.SPREADSHEET_ID;
        const range = 'Sheet1!A:P'; // Reduced columns as we removed drive links
        const valueInputOption = 'USER_ENTERED';
        const timestamp = new Date().toISOString();

        const values = [[
            timestamp, jobTitle, firstName, lastName, email,
            phone || '', certificateName, issuingOrganization,
            certificateNo, certificateUrl, educationLevel,
            country, state || '', availability,
            languages, weeklyHours,
        ]];

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption,
            requestBody: { values },
        });

        // --- Send Email Notification with Attachments ---
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER,
            subject: `New Application for ${jobTitle}`,
            html: `
                <h1>New Application Received for ${jobTitle}</h1>
                <p>All submitted documents are attached to this email.</p>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                <hr>
                <h2>Education & Qualifications</h2>
                <p><strong>Certificate Name:</strong> ${certificateName}</p>
                <p><strong>Issuing Organization:</strong> ${issuingOrganization}</p>
                <p><strong>Certificate No:</strong> ${certificateNo}</p>
                <p><strong>Certificate URL:</strong> <a href="${certificateUrl || ''}">${certificateUrl || 'N/A'}</a></p>
                <p><strong>Highest Education:</strong> ${educationLevel}</p>
                <p><strong>Country:</strong> ${country}</p>
                <p><strong>State:</strong> ${state || 'N/A'}</p>
                <hr>
                <h2>Availability & Technical Specs</h2>
                <p><strong>Availability (40hrs/week):</strong> ${availability}</p>
                <p><strong>Weekly Hours:</strong> ${weeklyHours}</p>
                <p><strong>Languages:</strong> ${languages}</p>
            `,
            attachments: attachments,
        };

        await transporter.sendMail(mailOptions);
        console.log('Successfully processed application in background for:', email);

    } catch (error) {
        console.error('Error processing application in background:', error);
    }
}

async function getGoogleAuth() {
    const googleCredentials = process.env.GOOGLE_CREDENTIALS;
    if (!googleCredentials) {
        throw new Error("GOOGLE_CREDENTIALS environment variable not set.");
    }

    let credentials;
    try {
        // First, try to parse it as a raw JSON string
        credentials = JSON.parse(googleCredentials);
    } catch (error) {
        // If that fails, assume it's Base64 encoded and try to decode it
        try {
            const credentialsJson = Buffer.from(googleCredentials, 'base64').toString('utf-8');
            credentials = JSON.parse(credentialsJson);
        } catch (decodeError) {
            throw new Error("Failed to parse GOOGLE_CREDENTIALS. Make sure it's a valid JSON string or a Base64 encoded JSON string.");
        }
    }

    return new google.auth.GoogleAuth({
        credentials,
        // Reduced scopes as we no longer need Google Drive
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
}

export async function POST(req: NextRequest) {
  // --- Environment Variable Check ---
  const requiredEnvVars = [
    'GOOGLE_CREDENTIALS',
    'SPREADSHEET_ID',
    'GMAIL_USER',
    'GMAIL_PASS',
  ];

  const missingEnvVars = requiredEnvVars.filter(v => !process.env[v]);

  if (missingEnvVars.length > 0) {
    console.error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
    return NextResponse.json(
      { message: `Server configuration error: Missing required environment variables. Please check server logs.` },
      { status: 500 }
    );
  }
  // --- End Check ---

  try {
    const formData = await req.formData();
    const fields: { [key: string]: string } = {};
    const files: { [key: string]: File } = {};

    for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
            files[key] = value;
        } else {
            fields[key] = value;
        }
    }

    const { firstName, lastName, email, jobTitle, privacyPolicy } = fields;

    if (!firstName || !lastName || !email || !jobTitle || privacyPolicy !== 'true') {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Don't await this. This lets the function run in the background.
    processApplicationInBackground(fields, files);

    // Return an immediate response to the user.
    return NextResponse.json({ message: 'Application submitted successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error in API route:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Error submitting application', error: errorMessage }, { status: 500 });
  }
}
