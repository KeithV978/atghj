"use client";

import { useState, useEffect } from 'react';
import ArticleCard from '@/app/components/ArticleCard';
import Loading from '@/app/components/Loading';
import { Article } from '@/types';
import { ArticlesResponse } from '@/app/api/issues/[issueId]/articles/types';
import { useParams } from 'next/navigation';
import IssueCard from '@/app/components/issues/IssueCard';

interface IssueArticlesPageProps {
  params: {
    id: string;
  };
}

export default function IssueArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [metadata, setMetadata] = useState<ArticlesResponse['metadata'] | null>(null);
  const params = useParams(); // Get params synchronously via hook 
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/issues/${params.id}/articles`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }

        const data: ArticlesResponse = await response.json();
        console.log({"fetched data": data});

        setArticles(data.items);
        setMetadata(data.metadata);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [params.id, page]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-red-600">
              {error}
            </h2>
            <button
              onClick={() => setPage(1)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Articles in This Issue
          </h1>
          {metadata && (
            <p className="text-gray-600">
              Showing {metadata.currentPage} of {metadata.totalPages} pages
              ({metadata.totalItems} articles total)
            </p>
          )}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {articles.map((article, i) => (
            // <ArticleCard key={article.id} article={article} />
            <IssueCard key={i} issue={article}/>
          ))}
        </div>

        {/* Pagination */}
        {metadata && (
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {metadata.currentPage} of {metadata.totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= metadata.totalPages}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}