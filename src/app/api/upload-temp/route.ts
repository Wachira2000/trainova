import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';

export const config = {
    api: {
        bodyParser: false,
    },
};

const parseForm = async (req: NextRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    await fs.promises.mkdir(uploadDir, { recursive: true });

    return new Promise(async (resolve, reject) => {
        const form = formidable({
            uploadDir: uploadDir,
            keepExtensions: true,
        });

        const body = req.body;
        if (!body) {
            return reject(new Error("Request body is null"));
        }

        const nodeReadable = Readable.fromWeb(body as any);

        const mockReq = nodeReadable as any;
        mockReq.headers = Object.fromEntries(req.headers.entries());
        mockReq.headers['content-type'] = req.headers.get('content-type');

        form.parse(mockReq, (err, fields, files) => {
            if (err) {
                console.error('Error parsing form:', err);
                reject(err);
            } else {
                resolve({ fields, files });
            }
        });
    });
};

export async function POST(req: NextRequest) {
    try {
        const { files } = await parseForm(req);
        const filepaths: { [key: string]: string } = {};

        for (const key in files) {
            const file = files[key] as formidable.File;
            if (file) {
                filepaths[key] = file.filepath;
            }
        }

        return NextResponse.json({ message: 'Files uploaded successfully', filepaths }, { status: 200 });
    } catch (error) {
        console.error('Error uploading files:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ message: 'Error uploading files', error: errorMessage }, { status: 500 });
    }
}
