import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import RestaurantDashboard from './restaurant/RestaurantDashboard';
import CustomerDashboard from './customer/CustomerDashboard';

function Dashboard() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null; // This should be handled by ProtectedRoute
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentUser.role === 'restaurant' ? (
        <RestaurantDashboard />
      ) : (
        <CustomerDashboard />
      )}
    </div>
  );
}

export default Dashboard;