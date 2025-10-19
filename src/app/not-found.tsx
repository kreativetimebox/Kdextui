'use client';

import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            404
          </h1>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Search className="h-6 w-6 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">Page Not Found</h2>
          </div>
        </div>

        {/* Error Message */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-purple-100">
          <p className="text-lg text-gray-600 mb-6">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
          </p>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-purple-800">
              <strong>💡 Tip:</strong> Check the URL for typos, or try navigating from the homepage.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-600 transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Home className="h-5 w-5" />
            Go to Homepage
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition duration-200 border-2 border-purple-200 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t-2 border-purple-100">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Quick Links
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link href="/docs" className="text-purple-600 hover:text-purple-700 font-medium hover:underline">
              Documentation
            </Link>
            <Link href="/pricing" className="text-purple-600 hover:text-purple-700 font-medium hover:underline">
              Pricing
            </Link>
            <Link href="/contact" className="text-purple-600 hover:text-purple-700 font-medium hover:underline">
              Contact Support
            </Link>
            <Link href="/help" className="text-purple-600 hover:text-purple-700 font-medium hover:underline">
              Help Center
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
