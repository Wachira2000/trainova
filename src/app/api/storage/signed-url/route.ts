import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Create a Supabase client with the service role key for admin privileges
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(req: NextRequest) {
  try {
    const { fileName, fileType } = await req.json();

    if (!fileName || !fileType) {
      return NextResponse.json({ message: 'File name and file type are required' }, { status: 400 });
    }

    // Generate a unique path for the file to avoid name collisions
    const filePath = `${Date.now()}-${fileName}`;

    const { data, error } = await supabaseAdmin.storage
      .from('applications')
      .createSignedUploadUrl(filePath, {
        contentType: fileType,
      });

    if (error) {
      console.error('Error creating signed URL:', error);
      return NextResponse.json({ message: 'Error creating signed URL', error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Error in signed URL route:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Error in signed URL route', error: errorMessage }, { status: 500 });
  }
}
