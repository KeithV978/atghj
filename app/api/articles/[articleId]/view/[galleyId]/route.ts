import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string; galleyId: string }> }
) {
  // ✅ Await params before destructuring
  const { articleId, galleyId } = await params;
  
  const OJS_BASE_URL = process.env.NEXT_PUBLIC_OJS_API_URL;
  
  if (!OJS_BASE_URL) {
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
    // Construct the view URL (inline display)
    const viewUrl = `${OJS_BASE_URL}/article/view/${articleId}/${galleyId}`;

    console.log('📖 Viewing article from:', viewUrl);

    const response = await fetch(viewUrl);

    if (!response.ok) {
      console.error('❌ View failed:', response.status);
      throw new Error(`Failed to fetch file: ${response.status}`);
    }

    const fileBlob = await response.blob();
    const contentType = response.headers.get('content-type') || 'application/pdf';
    const arrayBuffer = await fileBlob.arrayBuffer();

    console.log('✅ File loaded successfully');

    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'inline', // Display inline instead of download
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('❌ Error viewing article file:', error);
    return NextResponse.json(
      { error: 'Failed to view file' },
      { status: 500 }
    );
  }
}
