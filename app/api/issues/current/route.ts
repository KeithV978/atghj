
// Usage in the GET handler
// import { fetchIssuesFromOJS } from './fetch'; 

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const OJS_BASE_URL = process.env.NEXT_PUBLIC_OJS_API_URL;
  const OJS_API_KEY = process.env.NEXT_PUBLIC_OJS_API_KEY;
  
  if (!OJS_BASE_URL || !OJS_API_KEY) {
    return NextResponse.json(
      { error: 'OJS configuration missing' },
      { status: 500 }
    );
  }
  try {
    // Construct the API URL to get issues with isCurrent=1
    const apiUrl = new URL(`${OJS_BASE_URL}/issues`);
    apiUrl.searchParams.append('isPublished', '1'); // Only published issues
    apiUrl.searchParams.append('orderBy', 'datePublished'); // Order by date
    apiUrl.searchParams.append('orderDirection', 'DESC'); // Most recent first
    apiUrl.searchParams.append('count', '1'); // Get only the first one
    apiUrl.searchParams.append('apiToken', OJS_API_KEY);
    
    // console.log({"apiUrl": apiUrl.toString() });
    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.log({"OJS API response: ": response});
      throw new Error(`OJS API error: ${response.status}`);
    }

    const data = await response.json();
    
    // The first item should be the current issue
    const currentIssue = data.items && data.items.length > 0 ? data.items[0] : null;
    
    if (!currentIssue) {
      return NextResponse.json(
        { error: 'No current issue found' },
        { status: 404 }
      );
    }

    return NextResponse.json(currentIssue);
  } catch (error) {
    console.error('Error fetching current issue from OJS:', error);
    return NextResponse.json(
      { error: `Failed to fetch current issue: ${error}` },
      { status: 500 }
    );
  }
}
