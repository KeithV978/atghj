import { Issue } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

interface ArticleCardProps {
  article: Issue;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden">
        {article.coverImageUrl?.en ? (
          <Image
            src={article.coverImageUrl?.en}
            alt={article.coverImageAltText?.en || 'Issue cover'}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
            <span className="text-gray-400">No cover image</span>
          </div>
        )}
        {/* Volume Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-sm">
          Vol. {article.volume} No. {article.number}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 space-y-4">
        {/* Title & Identification */}
        <div>
          <Link 
            href={article.publishedUrl || '#'} 
            className="block group-hover:text-indigo-600 transition-colors duration-200"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">
              {article.title?.en || 'Untitled Issue'}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 font-medium">
            {article.identification}
          </p>
        </div>

        {/* Description */}
        {article.description?.en && (
          <div 
            className="text-sm text-gray-600 line-clamp-2"
            dangerouslySetInnerHTML={{ 
              __html: article.description.en 
            }}
          />
        )}

        {/* Footer */}
        <div className="pt-4 flex items-center justify-between border-t border-gray-100">
          <time 
            dateTime={article.datePublished}
            className="text-sm text-gray-500 flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {format(new Date(article.datePublished), 'MMM d, yyyy')}
          </time>
          
          {/* Publication Status */}
          {article.published && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Published
            </span>
          )}
        </div>
      </div>
    </div>
  );
}