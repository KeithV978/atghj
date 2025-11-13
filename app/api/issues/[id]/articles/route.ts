import { NextRequest, NextResponse } from 'next/server';

const API_TOKEN = process.env.NEXT_PUBLIC_OJS_API_KEY!;
const BASE_URL = process.env.NEXT_PUBLIC_OJS_API_URL!;

export async function GET(request: NextRequest, { params }: { params: { issueId: string } }) {
  const { issueId } = params;

  try {
      const url = new URL(`${BASE_URL}/submissions`);   
      url.searchParams.append('status', '3'); 
      url.searchParams.append('issueIds', issueId);
      url.searchParams.append('apiToken', API_TOKEN); 
 

  const res = await fetch(url.toString());
 

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch articles' }, { status: res.status });
    }

    const data = await res.json();
    // console.log({"data": data });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Server error: ' + error }, { status: 500 });
  }
}