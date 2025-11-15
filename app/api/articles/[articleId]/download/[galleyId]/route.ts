import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string; galleyId: string }> }
) {
  // ✅ MUST await params before destructuring
  const { articleId, galleyId } = await params;
  
  const OJS_BASE_URL = process.env.NEXT_PUBLIC_OJS_API_URL;
  const OJS_API_KEY = process.env.NEXT_PUBLIC_OJS_API_KEY;
  
  if (!OJS_BASE_URL || !OJS_API_KEY) {
    return NextResponse.json(
      { error: 'OJS configuration missing' },
      { status: 500 }
    );
  }

  if (!articleId || !galleyId) {
    return NextResponse.json(
      { error: 'Missing articleId or galleyId' },
      { status: 400 }
    );
  }

  try {
    // Construct the download URL
    const downloadUrl = new URL(`${OJS_BASE_URL}/submissions/${articleId}/galleys/${galleyId}`);
    downloadUrl.searchParams.append('apiToken', OJS_API_KEY);

    console.log('📥 Downloading galley from:', downloadUrl.toString());

    const response = await fetch(downloadUrl.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('❌ Galley download failed:', response.status);
      throw new Error(`Failed to fetch galley: ${response.status}`);
    }

    const galleyData = await response.json();
    
    // If there's a file URL, redirect to it
    if (galleyData.file?.url) {
      return NextResponse.redirect(galleyData.file.url);
    }

    return NextResponse.json(galleyData);
  } catch (error) {
    console.error('❌ Error downloading galley:', error);
    return NextResponse.json(
      { error: 'Failed to download galley' },
      { status: 500 }
    );
  }
}
