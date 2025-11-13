import { Article } from '@/types';

export async function fetchLatestArticles(): Promise<Article[]> {
    try {
        const response = await fetch('http://atghj.africa/index.php/atghj/api/v1/submissions?status=3&orderBy=dateSubmitted&orderDirection=desc', {
            headers: {
                'Accept': 'application/json',
            },
            next: { revalidate: 3600 } // Revalidate every hour
        });

        if (!response.ok) {
            throw new Error('Failed to fetch articles');
        }

        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
}