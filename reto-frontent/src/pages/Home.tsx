import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div 
        className="h-[600px] bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-6">Welcome to Gourmet Reserve</h1>
            <p className="text-xl mb-8">Experience culinary excellence in every bite</p>
            <Link
              to="/reservations"
              className="bg-orange-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-orange-700 transition-colors"
            >
              Make a Reservation
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                alt="Exquisite Cuisine"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Exquisite Cuisine</h3>
              <p className="text-gray-600">Savor our chef's carefully crafted dishes made with the finest ingredients.</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                alt="Elegant Ambiance"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Elegant Ambiance</h3>
              <p className="text-gray-600">Immerse yourself in our sophisticated and comfortable atmosphere.</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                alt="Expert Service"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Expert Service</h3>
              <p className="text-gray-600">Experience impeccable service from our dedicated staff.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;