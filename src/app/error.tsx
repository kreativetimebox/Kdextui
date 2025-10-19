'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl mb-6">
            <AlertTriangle className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h1>
          <p className="text-lg text-gray-600">
            We encountered an unexpected error
          </p>
        </div>

        {/* Error Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-red-100">
          <div className="bg-red-50 rounded-lg p-4 border border-red-200 mb-6">
            <p className="text-sm text-red-800 font-mono break-all">
              {error.message || 'An unexpected error occurred'}
            </p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>

          <p className="text-gray-600">
            Don't worry, our team has been notified. You can try refreshing the page or go back to the homepage.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-600 transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition duration-200 border-2 border-purple-200 shadow-md hover:shadow-lg"
          >
            <Home className="h-5 w-5" />
            Go to Homepage
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-12 pt-8 border-t-2 border-purple-100">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Need Help?
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link href="/help" className="text-purple-600 hover:text-purple-700 font-medium hover:underline">
              Help Center
            </Link>
            <Link href="/contact" className="text-purple-600 hover:text-purple-700 font-medium hover:underline">
              Contact Support
            </Link>
            <Link href="/status" className="text-purple-600 hover:text-purple-700 font-medium hover:underline">
              System Status
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
