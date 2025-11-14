import { NextRequest, NextResponse } from 'next/server';
 
export async function GET(
  request: NextRequest,
  { params }: { params: { issueId: string } }
) {
  const { issueId } = params;
   
  const OJS_BASE_URL = process.env.NEXT_PUBLIC_OJS_API_URL; 
  const OJS_API_KEY = process.env.NEXT_PUBLIC_OJS_API_KEY;
  
  if (!OJS_BASE_URL || !OJS_API_KEY) {
    return NextResponse.json(
      { error: 'OJS configuration missing' },
      { status: 500 }
    );
  }

  try {
    // Construct the API URL with issueIds parameter and apiKey
    const apiUrl = new URL(`${OJS_BASE_URL}/api/v1/submissions`);
    apiUrl.searchParams.append('issueIds', issueId);
    apiUrl.searchParams.append('apiKey', OJS_API_KEY);
    
    // Optional: Add other query parameters
    apiUrl.searchParams.append('status', '3'); // 3 = published
    apiUrl.searchParams.append('orderBy', 'seq'); // Order by sequence
    apiUrl.searchParams.append('orderDirection', 'ASC');
    apiUrl.searchParams.append('count', '100'); // Max items per page

    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Optional: Add caching
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`OJS API error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching articles from OJS:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}