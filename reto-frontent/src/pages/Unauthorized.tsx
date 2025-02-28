import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

function Unauthorized() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <AlertTriangle className="h-16 w-16 text-orange-600 mx-auto" />
        <h1 className="mt-6 text-3xl font-bold text-gray-900">Access Denied</h1>
        <p className="mt-2 text-gray-600">
          You don't have permission to access this page.
        </p>
        <div className="mt-6">
          <Link
            to="/dashboard"
            className="inline-block bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;