import { NextRequest, NextResponse } from 'next/server';

interface Author {
  id: number;
  fullName: string;
}

interface Publication {
  id: number;
  title: string | { [locale: string]: string };
  abstract?: string | { [locale: string]: string };
  authors?: Author[];
  pages?: string;
  datePublished?: string;
  urlPublished?: string;
  doiObject?: {
    doi?: string;
  };
}

interface Submission {
  id: number;
  currentPublicationId: number;
  publications: Publication[];
  status: number;
  sectionId?: number;
  sectionTitle?: string;
}


interface IssueData {
  id: number;
  title: string | { [locale: string]: string };
  volume?: number;
  number?: string;
  year?: number;
  description?: string | { [locale: string]: string };
  coverImageUrl?: { en: string };
  datePublished?: string;
}

interface SubmissionsResponse {
  issue: IssueData | null;
  articles: Submission[];
  itemsMax: number;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const issueId = searchParams.get('issueId') || '1';

  const OJS_BASE_URL = process.env.NEXT_PUBLIC_OJS_API_URL;
  const OJS_API_KEY = process.env.NEXT_PUBLIC_OJS_API_KEY;

  if (!OJS_BASE_URL || !OJS_API_KEY) {
    return NextResponse.json(
      { error: 'OJS configuration missing' },
      { status: 500 }
    );
  }

  try {
    // Fetch articles for the specific issue
    const articlesUrl = new URL(`${OJS_BASE_URL}/submissions/`);
    articlesUrl.searchParams.append('issueIds', issueId);
    articlesUrl.searchParams.append('status', '3'); // 3 = published
    articlesUrl.searchParams.append('orderBy', 'seq');
    articlesUrl.searchParams.append('orderDirection', 'ASC');
    articlesUrl.searchParams.append('count', '100');
    articlesUrl.searchParams.append('apiToken', OJS_API_KEY);

    const articlesResponse = await fetch(articlesUrl.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 }
    });

    if (!articlesResponse.ok) {
      throw new Error(`OJS API error fetching articles: ${articlesResponse.status}`);
    }

    const articlesData = await articlesResponse.json();
    const articles = articlesData.items || [];

    // Fetch issue details
    let issue: IssueData | null = null;
    try {
      const issueUrl = new URL(`${OJS_BASE_URL}/issues/${issueId}`);
      issueUrl.searchParams.append('apiToken', OJS_API_KEY);

      const issueResponse = await fetch(issueUrl.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 3600 }
      });

      if (issueResponse.ok) {
        issue = await issueResponse.json();
      }
    } catch (issueError) {
      console.error('Error fetching issue details:', issueError);
      // Continue without issue details
    }

    const response: SubmissionsResponse = {
      issue,
      articles,
      itemsMax: articlesData.itemsMax || articles.length
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching submissions from OJS:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
