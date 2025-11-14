import Image from 'next/image';
import { Issues } from '@/app/api/issues/current/types';
import Link from 'next/link';
import { format } from 'date-fns';

interface IssueCardProps {
  issue: Issues;
}

const IssueCard = ({ issue }: IssueCardProps) => {
  const formattedDate = format(new Date(issue.datePublished), 'MMMM d, yyyy');

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Top Gradient Bar */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-xl" />

      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden">
        {issue.coverImageUrl && Object.values(issue.coverImageUrl)[0] ? (
          <Image
            src={Object.values(issue.coverImageUrl)[0]}
            alt={Object.values(issue.coverImageAltText)[0] || 'Issue cover'}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Volume and Issue Badges */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700">
            Volume {issue.volume}
          </span>
          {issue.issue && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-50 text-purple-700">
              Issue {issue.issue}
            </span>
          )}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-50 text-pink-700">
            {issue.year}
          </span>
        </div>

        {/* Title and Identification */}
        <Link href={`/submissions/`} className="block group-hover:text-indigo-600 transition-colors">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {issue.title}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {issue.identification}
          </p>
        </Link>

        {/* Description */}
        {issue.description && Object.values(issue.description)[0] && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {Object.values(issue.description)[0]}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <svg 
              className="w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <time className="text-sm text-gray-500" dateTime={issue.datePublished}>
              {formattedDate}
            </time>
          </div>

          {/* Action Button */}
          <Link
            href={`/issues/`}
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View Articles
            <svg 
              className="ml-1.5 w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;