import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

async function processApplicationInBackground(data: any) {
    try {
        const {
            jobTitle, firstName, lastName, email, phone, certificateName,
            issuingOrganization, certificateNo, certificateUrl, educationLevel,
            country, state, availability, languages, weeklyHours, filepaths
        } = data;

        const auth = await getGoogleAuth();
        const sheets = google.sheets({ version: 'v4', auth });

        const attachments = [];
        if (filepaths) {
            for (const key in filepaths) {
                const filepath = filepaths[key];
                if (fs.existsSync(filepath)) {
                    attachments.push({
                        filename: path.basename(filepath),
                        path: filepath,
                    });
                }
            }
        }

        const spreadsheetId = process.env.SPREADSHEET_ID;
        const range = 'Sheet1!A:P';
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
        credentials = JSON.parse(googleCredentials);
    } catch (error) {
        try {
            const credentialsJson = Buffer.from(googleCredentials, 'base64').toString('utf-8');
            credentials = JSON.parse(credentialsJson);
        } catch (decodeError) {
            throw new Error("Failed to parse GOOGLE_CREDENTIALS. Make sure it's a valid JSON string or a Base64 encoded JSON string.");
        }
    }

    return new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
}

export async function POST(req: NextRequest) {
    const requiredEnvVars = [
        'GOOGLE_CREDENTIALS',
        'SPREADSHEET_ID',
        'GMAIL_USER',
        'GMAIL_PASS',
        'PAYSTACK_SECRET_KEY',
    ];

    const missingEnvVars = requiredEnvVars.filter(v => !process.env[v]);

    if (missingEnvVars.length > 0) {
        console.error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
        return NextResponse.json(
            { message: `Server configuration error: Missing required environment variables. Please check server logs.` },
            { status: 500 }
        );
    }

    try {
        const allData = await req.json();
        const { jobTitle, firstName, lastName, email, privacyPolicy, paymentReference } = allData;

        if (!firstName || !lastName || !email || !jobTitle || privacyPolicy !== true || !paymentReference) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const paystackUrl = `https://api.paystack.co/transaction/verify/${paymentReference}`;
        const secretKey = process.env.PAYSTACK_SECRET_KEY!;

        const verificationResponse = await fetch(paystackUrl, {
            headers: {
                Authorization: `Bearer ${secretKey}`,
            },
        });

        const verificationData = await verificationResponse.json() as { data: { status: string } };

        if (verificationData.data.status !== 'success') {
            return NextResponse.json({ message: 'Payment verification failed' }, { status: 400 });
        }

        processApplicationInBackground(allData);

        return NextResponse.json({ message: 'Application submitted successfully!' }, { status: 200 });

    } catch (error) {
        console.error('Error in API route:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ message: 'Error submitting application', error: errorMessage }, { status: 500 });
    }
}