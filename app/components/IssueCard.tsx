import { Issue } from '@/types';
import Link from 'next/link';
import { format } from 'date-fns';

interface IssueCardProps {
  issue: Issue;
}

export default function IssueCard({ issue }: IssueCardProps) {
  return (
    <Link 
      href={`/issues/${issue.id}/articles`}
      className="group block"
    >
      <div className="relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-100 hover:border-indigo-100">
        {/* Header Section with Volume Info */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
          <div className="flex justify-between items-center">
            <h3 className="text-white text-lg font-semibold">
              Volume {issue.volume}
            </h3>
            <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">
              No. {issue.number}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="mb-4">
            <h4 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
              {issue.title.en}
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              {issue.identification}
            </p>
          </div>

          {/* Publication Info */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <svg 
                className="w-5 h-5 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-600">
                {format(new Date(issue.datePublished), 'MMMM yyyy')}
              </span>
            </div>
            
            <div className="flex items-center">
              {issue.published ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Published
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  Upcoming
                </span>
              )}
            </div>
          </div>

          {/* Action Hint */}
          <div className="absolute bottom-4 right-4 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
            <span className="text-indigo-600 flex items-center text-sm font-medium">
              View Articles
              <svg 
                className="w-4 h-4 ml-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}